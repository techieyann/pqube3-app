Template.metersPQube.onCreated(function () {
  var instance = this;
  instance.group = new ReactiveVar();
  instance.filter = new ReactiveVar();
  instance.pqube = FlowRouter.getParam('pqubeId');
  instance.selected = new ReactiveVar();
  instance.selectedMeter = new ReactiveVar(false);
  instance.anyChanges = new ReactiveVar(false);
  instance.numSelected = new ReactiveVar(0);
  instance.selectedClass = new ReactiveVar('default');
  instance.editing = new ReactiveVar();
  instance.editingDefaults = new ReactiveVar();
  instance.defaults = new ReactiveVar([]);
  instance.minSelectable = 3;
  instance.maxSelectable = 15;  
});

Template.metersPQube.onRendered(function () {
  var instance = this;
  $('#edit-default-list').hide();
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
      instance.defaults.set(meters.defaults);
    }
  });
  $('#meter-default-order').sortable();
  instance.autorun(function () {
    var editingDefaults = instance.editingDefaults.get();
    var notEditing = $('#selected-meter-list, #default-list');
    var editing = $('#edit-default-list');
    if (editingDefaults) {
      notEditing.slideUp();
      editing.slideDown();
    }
    else {
      notEditing.slideDown();
      editing.slideUp();      
    }
  });
  instance.autorun(function () {
    var selected = instance.selectedMeter.get();
    var numSelected = instance.numSelected.get();

    if ( selected && numSelected == instance.maxSelectable) 
      instance.selectedClass.set('danger');
    else if (numSelected < instance.minSelectable)
      instance.selectedClass.set('warning');
    else
      instance.selectedClass.set('default');
  });
});

Template.metersPQube.helpers({
  name: function () {
    var instance = Template.instance();
    var id = instance.pqube;
    var pqube = PQubes.findOne(id);
    if (pqube)
      return pqube.name;
  },
  groups: function () {
    var master = Meters.findOne('masterList');    
    if (master && master.groups) {
      return master.groups.sort();
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
  selectedClass: function () {
    var instance = Template.instance();
    return instance.selectedClass.get();
  },
  meterList: function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var array = [];
    for (var key in selected) {
      var meter = selected[key];
      if (meter.selected) array.push({
        name: key,
        multiplier: meter.multiplier,
        sigFigs: meter.sigFigs,
        units: meter.units
      });
    }
    return array;
  },
  meterDefaultColor: function (meter) {
    var colors = [
      'purple',
      'orange',
      'green'
    ];
    var instance = Template.instance();
    var defaults = instance.defaults.get();
    var index = defaults.indexOf(meter);
    if (index != -1) return colors[index];
  },
  meterDefault: function (meter) {
    var instance = Template.instance();
    var defaults = instance.defaults.get();
    var index = defaults.indexOf(meter);
    return (index != -1 ? '('+ ++index +')':''); 
  },
  editingMeter: function (meter) {
    var instance = Template.instance();
    return (instance.editing.get() == meter);
  },
  anchorVal: function () {
    var instance = Template.instance();
    var selected = instance.editing.get();
    var meters = instance.selected.get();
    if (meters[selected]) {
      return meters[selected].scale.val;
    }
  },
  units: function () {
    var instance = Template.instance();
    var selected = instance.editing.get();
    return selected+'Units';
  },
  anchorLocation: function (location) {
    var instance = Template.instance();
    var selected = instance.editing.get();
    var meters = instance.selected.get();
    if (meters[selected]) {
      return (location == meters[selected].scale.anchor ? 'checked':'');      
    }    
  },
  editingDefaults: function () {
    var instance = Template.instance();
    return instance.editingDefaults.get();
  },
  defaultItem: function () {
    var instance = Template.instance();
    return instance.defaults.get();
  },
  defaultMeterList: function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var defaults = instance.defaults.get(); 
    var array = [];
    if (defaults && selected) {
      for (var i = 0; i<defaults.length; i++ ) {
        array.push(defaults[i]);
      }
      for (var key in selected) {
        if (selected[key].selected && defaults.indexOf(key) == -1) array.push(key);
      }
    }
    return array;
  },
  saveable: function () {
    var instance = Template.instance();
    return instance.anyChanges.get() && (instance.numSelected.get() >= instance.minSelectable) && !instance.editingDefaults.get();
  }
});

Template.metersPQube.events({
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
    var defaults = instance.defaults.get();
    if (!defaults) defaults = [];
    var numAdded = 0;
    $('#meter-list option:selected').each(function () {
      if (count + numAdded < instance.maxSelectable) {
        selected[$(this).val()].selected = true;
        numAdded++;
        if (defaults.length < 3) defaults.push($(this).val());
      }
    });
    instance.numSelected.set(count + numAdded);
    instance.selectedMeter.set(false);
    $('#meter-list').find('option:selected').attr('selected', false);
    instance.selected.set(selected);
    instance.anyChanges.set(true);
    instance.defaults.set(defaults);
  },
  'click #clear-select': function () {
    var instance = Template.instance();
    instance.selectedMeter.set(false);
    $('#meter-list').find('option:selected').attr('selected', false);    
  },
  'click #default-all-selected': function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var master = Meters.findOne('masterList');
    if (master) {
      for (var key in selected) {
        if (selected[key].selected && master.meters[key]) {
          selected[key] = master.meters[key];
          selected[key].selected = true;
        }
      }
      instance.selected.set(selected);
    }
  },  
  'click #clear-all-selected': function () {
    var instance = Template.instance();
    var selected = instance.selected.get();
    for (var key in selected) {
      if (selected[key].selected) selected[key].selected = false;
    }
    instance.selected.set(selected);
    instance.numSelected.set(0);
    instance.defaults.set([]);
  },
  'click .unselect': function (e) {
    var instance = Template.instance();
    var selected = instance.selected.get();
    var meter = e.currentTarget.dataset.meter;
    var count = instance.numSelected.get();
    var defaults = instance.defaults.get();
    count--;
    selected[meter].selected = false;
    instance.selected.set(selected);
    instance.numSelected.set(count);
    instance.anyChanges.set(true);
    var defaultIndex = defaults.indexOf(meter);
    if (defaultIndex != -1) {
      defaults.splice(defaultIndex, 1);
      if (count > defaults.length) {
        for (var key in selected) {
          if (selected[key].selected) {
            if (defaults.indexOf(key) == -1) {
              defaults.push(key);
              break;
            }
          }
        }
      }
      instance.defaults.set(defaults);
    }
  },
  'click .edit': function (e) {
    var instance = Template.instance();
    var meter = e.currentTarget.dataset.meter;
    instance.editing.set(meter);
  },
  'click #cancel-meter-settings': function () {
    var instance = Template.instance();
    instance.editing.set(null);    
  },
  'click #default-meter-settings': function () {
    var instance = Template.instance();
    var master = Meters.findOne('masterList');
    var selected = instance.selected.get();
    var meter = instance.editing.get();
    if (master && master.meters[meter] && selected[meter]) {
      selected[meter] = master.meters[meter];
      selected[meter].selected = true;
      instance.selected.set(selected);
      instance.anyChanges.set(true);
    }
  },
  'submit #meter-gauge-form, click #save-meter-settings': function (e) {
    e.preventDefault();    
    var instance = Template.instance();
    var meters = instance.selected.get();
    var meter = instance.editing.get();
    if (meters[meter]) {
      var units = $('#meter-units').val();
      if (units) meters[meter].units = units;
      var multiplier = parseFloat($('#meter-mult').val());
      if (multiplier) meters[meter].multiplier = multiplier;
      var sigFigs = parseInt($('#meter-sig-figs').val(), 10);
      if (sigFigs) {
        sigFigs = Math.min(0, sigFigs);
        sigFigs = Math.max(4, sigFigs);
        meters[meter].sigFigs = sigFigs;
      }
      var location = $('input[name="anchorLocation"]:checked').val();
      meters[meter].scale.anchor = location;
      
      var val = parseInt($('#anchor-val').val(), 10);
      if (val) meters[meter].scale.val = val;
      
      instance.selected.set(meters);
      instance.editing.set(null);
      instance.anyChanges.set(true);
    }
  },
  'click #edit-defaults': function () {
    var instance = Template.instance();
    instance.editingDefaults.set(true);
  },
  'click #cancel-defaults': function () {
    var instance = Template.instance();
    instance.editingDefaults.set(false);
  },
  'click #confirm-defaults': function () {
    var instance = Template.instance();
    var array = [];
    for (var i=0; i<3; i++) {
      var li = $('#meter-default-order>li')[i];
      if (li) array.push(li.dataset.meter);
    }
    instance.defaults.set(array);
    instance.anyChanges.set(true);

    instance.editingDefaults.set(false);
  },
  'click .save-selected-meters': function () {
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
      selected: selectedMeters,
      defaults: instance.defaults.get()
    };
    Meteor.call('editMetersPQube', id, meterOpts, function (err, result) {
      if (err) {
	Session.set('formError', err.reason);
	return;
      }
      Meteor.setTimeout(function () {
        sAlert.success(TAPi18n.__('succEditMetersPQube'));
      }, 400);
      $('#modal').modal('hide');

    });
  }
});                         
