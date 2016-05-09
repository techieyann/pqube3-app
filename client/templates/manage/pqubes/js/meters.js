Template.metersPQube.onCreated(function () {
  var instance = this;
  instance.tab = new ReactiveVar('select');
});

Template.metersPQube.helpers({
  activeTab: function (tab) {
    var instance = Template.instance();
    var activeTab = instance.tab.get();
    return (tab == activeTab ? 'active':'');
  },
  name: function () {
    var id = FlowRouter.current().params.pqubeId;
    var pqube = PQubes.findOne(id);
    if (pqube)
      return pqube.name;
  }  
});

Template.metersPQube.events({
  'click .meter-tab': function (e) {
    const instance = Template.instance();
    var tab = e.currentTarget.id;
    instance.tab.set(tab);
  }
});

Template.selectMetersPQube.onCreated(function () {
  var instance = this;
  instance.group = new ReactiveVar();
  instance.filter = new ReactiveVar();
  instance.pqube = FlowRouter.getParam('pqubeId');
  instance.selected = new ReactiveVar();
  instance.selectedMeter = new ReactiveVar(false);
  instance.anyChanges = new ReactiveVar(false);
  instance.numSelected = new ReactiveVar();
  instance.maxSelectable = 15;
});

Template.selectMetersPQube.onRendered(function () {
  var instance = this;
  instance.autorun(function () {
    var pqube = instance.pqube;
    var meters = Meters.findOne(pqube);
    var master = Meters.findOne('masterList');        
    if (meters && master) {
      var selected = meters.selected;
      var count = 0;
      for (var key in selected) {
        master.meters[key] = selected[key];
        master.meters[key].selected = true;
        count ++;
      }
      instance.numSelected.set(count);
      instance.selected.set(master.meters);
    }
  });
});

Template.selectMetersPQube.helpers({
  groups: function () {
    var master = Meters.findOne('masterList');    
    if (master) {
      var groups = master.groups;
      var array = [];
      for (var key in groups) {
        array.push({key: key, val: groups[key]});
      }
      return array;
    }
  },
  filteredMeters: function () {
    var instance = Template.instance();
    var group = instance.group.get();
    var filter = instance.filter.get();
    
    var master = Meters.findOne('masterList');
    if (master) {
      var meters = master.meters;
      var array = [];
      for (var key in meters) {
        array.push({
          name: key,
          group: meters[key].group
        });
      }
      if (group) {
        array = array.filter(function (meter) {
          return group == meter.group;
        });
      }
      if (filter) {
        var re = new RegExp(filter, "i");
        array = array.filter(function (meter) {
          var name = TAPi18n.__(meter.name);
          return re.test(name);
        });
      }
      return array;
    }    
  },
  meterSelected: function () {
    var instance = Template.instance();
    
    return instance.selectedMeter.get();
  },
  selected: function (meter) {
    var instance = Template.instance();
    var meters = instance.selected.get();
    if (meters && meters[meter].selected) return 'disabled';
    return '';
  },
  notMaxSelected: function () {
    var instance = Template.instance();
    return instance.numSelected.get() < instance.maxSelectable;
  },
  numSelected: function () {
    var instance = Template.instance();
    return instance.numSelected.get();
  },
  maxSelectable: function () {
    var instance = Template.instance();
    return instance.maxSelectable;
  },
  meterList: function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var array = [];
    for (var key in selected) {
      if (selected[key].selected) array.push(key);
    }
    return array;
  },
  saveable: function () {
    var instance = Template.instance();
    return instance.anyChanges.get() && instance.numSelected.get();
  }
});
Template.selectMetersPQube.events({
  'change #meter-group': function (e) {
    var instance = Template.instance();
    instance.group.set(e.target.value);
  },
  'keyup #meter-filter': function (e) {
    var instance = Template.instance();
    var filter = e.target.value.replace(/\W/g, '');
    $(e.target).val(filter);
    instance.filter.set(filter);
  },
  'change #meter-list': function (e) {
    var instance = Template.instance();
    instance.selectedMeter.set(true);
    
  },
  'click #select-meter': function (e) {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var count = instance.numSelected.get();
    var numAdded = 0;
    $('#meter-list option:selected').each(function () {
      if (count + numAdded < instance.maxSelectable) {
        selected[$(this).val()].selected = true;
        numAdded++;
      }
    });
    instance.numSelected.set(count + numAdded);
    instance.selectedMeter.set(false);
    $('#meter-list').find('option:selected').attr('selected', false);
    instance.selected.set(selected);
    instance.anyChanges.set(true);
  },
  'click #clear-select': function () {
    var instance = Template.instance();
    instance.selectedMeter.set(false);
    $('#meter-list').find('option:selected').attr('selected', false);    
  },
  'click .unselect': function (e) {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var meter = e.target.dataset.meter;
    var count = instance.numSelected.get();
    count--;
    selected[meter].selected = false;
    instance.selected.set(selected);
    instance.numSelected.set(count);
    instance.anyChanges.set(true);    
  },
  'click #save-selected-meters': function () {
    var instance = Template.instance();
    Session.set('formError', null);
    var id = instance.pqube;
    var selectedMeters = {};
    var selected = instance.selected.get();
    for (var key in selected) {
      if (selected[key].selected) {
        selectedMeters[key] = selected[key];
        delete selected[key].selected;
      }
    }
    var meterOpts = {
      selected: selectedMeters
    };
    Meteor.call('editMetersPQube', id, meterOpts, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	return;
      }
      $('#modify').click();
      sAlert.success(TAPi18n.__('succEditMetersPQube'));
    });
  }
});

Template.modifyMetersPQube.onCreated(function () {
  var instance = this;
  instance.pqube = FlowRouter.getParam('pqubeId');
  instance.meters = new ReactiveVar();
  instance.selected = new ReactiveVar();
  instance.selectedMeter = new ReactiveVar();
  instance.autorun(function () {
    var meters = Meters.findOne(instance.pqube);
    instance.meters.set(meters);
  });
  instance.autorun(function () {
    var meter = instance.selected.get();
    var meters = instance.meters.get();
    if (meter && meters) {
      instance.selectedMeter.set(meters.selected[meter]);
    }
  });
});
Template.modifyMetersPQube.helpers({
  selectedMeters: function () {
    var instance = Template.instance();
    var meters = instance.meters.get();
    var array = [];    
    if (meters) {
      for (var key in meters.selected) {
        array.push({name: key});
      }
    }
    return array;
  },
  selected: function () {
    var instance = Template.instance();
    return instance.selected.get();
  },
  sigFigs: function () {
    var instance = Template.instance();
    var meter = instance.selectedMeter.get();
    if (meter) {
      return meter.sigFigs;
    }
  },
  anchorVal: function () {
    var instance = Template.instance();
    var meter = instance.selectedMeter.get();
    if (meter) {
      return meter.scale.val;
    }
  },
  units: function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    return selected+'Units';
  },
  anchorLocation: function (location) {
    var instance = Template.instance();
    var meter = instance.selectedMeter.get();
    if (meter) {
      return (location == meter.scale.anchor ? 'checked':'');
    }
  }
});

Template.modifyMetersPQube.events({
  'change #meter-list': function (e) {
    var instance = Template.instance();
    var meter = $('#meter-list option:selected').val();
    instance.selected.set(meter);
  },
  'submit #meter-gauge-form, click #save-meter-settings': function (e) {
    var instance = Template.instance();
    e.preventDefault();
    Session.set('formError', null);
    var id = instance.pqube;
    var meter = instance.selected.get();
    var location = $('input[name="anchorLocation"]:checked').val();
    var val = parseInt($('#anchor-val').val(), 10);

    var meterOpts = {};
    var dbLocation = 'selected.'+meter+'.scale.anchor';
    meterOpts[dbLocation] = location;
    if (val) {
      var dbVal = 'selected.'+meter+'.scale.val';
      meterOpts[dbVal] = val;
    }
    Meteor.call('editMetersPQube', id, meterOpts, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	return;
      }
      sAlert.success(TAPi18n.__('succEditMetersPQube'));

    });
  }
});

                         
