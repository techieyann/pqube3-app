Template.metersMaster.onCreated(function () {
  var instance = this;
  instance.file = new ReactiveVar();
  instance.meters = new ReactiveVar();
  instance.groups = new ReactiveVar();
  instance.verified = new ReactiveVar(false);
});

Template.metersMaster.onRendered(function () {
  var instance = this;
  instance.csvHeaders = [
    'Name',
    'Group',
    'Register',
    'AnchorLocation',
    'AnchorValue',
    'SigFigs',
    'Multiplier',
    'Units'
  ];
  instance.autorun(function () {
    var file = instance.file.get();
    instance.verified.set(false);
    instance.meters.set({});
    instance.groups.set([]);
    if (file) {
      Session.set('formError', null);
      Papa.parse(file, {
        complete: function (results) {
          if (results.errors.length) {
            Session.set('formError', 'csvParseErr');
          }

          else {
            var groups = [];
            var meters = {};
            var columns = results.data[0];
            for (var i=0; i<instance.csvHeaders.length; i++) {
              if (columns.indexOf(instance.csvHeaders[i]) == -1) {
                Session.set('formError', 'csvMalformedHeaders');
                return;
              }
            }
            for (i = 1; i < results.data.length; i++) {
              var row = results.data[i];
              if (row.length == instance.csvHeaders.length) {
                var meter = {};
                for (var j = 0; j < row.length; j++) {
                  meter[columns[j]] = row[j];
                }
                if (groups.indexOf(meter.Group) == -1) groups.push(meter.Group);
                meters[meter.Name] = {
                  group: meter.Group,
                  scale: {
                    anchor: meter.AnchorLocation,
                    val: parseInt(meter.AnchorValue, 10),
                    init: 1
                  },
                  sigFigs: parseInt(meter.SigFigs, 10),
                  multiplier: parseFloat(meter.Multiplier),
                  units: meter.Units,
                  register: parseInt(meter.Register, 10)
                };
                meters[meter.Name].legendSigFigs = (meters[meter.Name].sigFigs > 3 ? 2:1);
              }
            }
            if (meters) {
              Meteor.call('uploadNewMetersMaster', meters, groups, function (err) {
                if (err) {
                  Session.set('formError', err.reason);
                  return;
                }
                Meteor.setTimeout(function () {
                  sAlert.success(TAPi18n.__('succEditMeters'));
                }, 400);
                $('#modal').modal('hide');
              });

            }
            else {
              Session.set('formError', 'noMetersFoundInCSV');
            }
          }
        }
      });
    }
  });
});

Template.metersMaster.events({
  'change #meter-master': function (e) {
    var instance = Template.instance();
    instance.file.set(e.target.files[0]);
  },
  'click #download-master': function (e) {
    var instance = Template.instance();
    var masterList = Meters.findOne('masterList');
    if (masterList) {
      var meters = [];
      for (var name in masterList.meters) {
        var meter = masterList.meters[name];
        meters.push({
          Name: name,
          Group: meter.group,
          Register: meter.register,
          AnchorLocation: meter.scale.anchor,
          AnchorValue: meter.scale.val,
          SigFigs: meter.sigFigs,
          Multiplier: meter.multiplier,
          Units: meter.units
        });
      }
      var jsonMasterList = JSON.stringify(meters);

      var csv = Papa.unparse(jsonMasterList);

      var exportFilename = 'meterMasterList.csv';

      //https://github.com/mholt/PapaParse/issues/175
      var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      //IE11 & Edge
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, exportFilename);
      } else {
        //In FF link must be added to DOM to be clicked
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute('download', exportFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
});
