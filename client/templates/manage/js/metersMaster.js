Template.metersMaster.onCreated(function () {
  var instance = this;
  instance.file = new ReactiveVar();
  instance.meters = new ReactiveVar();
  instance.groups = new ReactiveVar();
  instance.verified = new ReactiveVar(false);
});
var csvHeaders = [
  'Name',
  'Group',
  'Register',
  'AnchorLocation',
  'AnchorValue',
  'SigFigs',
  'Multiplier',
  'Units'
];
Template.metersMaster.onRendered(function () {
  var instance = this;

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
            for (var i=0; i<csvHeaders.length; i++) {
              if (columns.indexOf(csvHeaders[i]) == -1) {
                Session.set('formError', 'csvMalformedHeaders');
                return;
              }
            }
            for (var i = 1; i < results.data.length; i++) {
              var row = results.data[i];
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
  'click #download-meter-master': function () {
    var master = Meters.findOne('masterList');
    if (master) {
      var meterList = [];
      meterList.push(csvHeaders);
      for (var key in master.meters) {
        var meterJson = master.meters[key];
        var meter = [];
        for (var i = 0; i<csvHeaders.length; i++) {
          meter.push(meterJson[csvHeaders[i]]);
        }
        if (meter.length) meterList.push(meter);
      }
      unparseAndDownloadCSV(meterList, 'meterMasterList.csv');
    }
  }
});
