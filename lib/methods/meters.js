Meteor.methods({
  uploadNewMetersMaster: function (meters, groups) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInUpload'));
    }
    if (!isAdmin()) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    return Meters.upsert('masterList', {
      meters: meters,
      groups: groups
    });
  }
});
