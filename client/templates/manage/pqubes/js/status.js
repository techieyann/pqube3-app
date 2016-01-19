Template.pqubeStatus.helpers({
  connected: function () {
    return this.status == 'connected';
  },
  unknown: function () {
    return this.status == 'unknown';
  },
  unverified: function () {
    return this.status == 'unverified';
  },
  verified: function () {
    return (this.status != 'unverified' && this.status != 'unknown');
  },
  org: function () {
    if(!isAdmin()) {
      return '/org';
    }
  },
  pqube3: function () {
    var pathName = FlowRouter.getRouteName();
    if (pathName != 'managePQube') 
      return '/pqube3';
  }
});

Template.pqubeStatus.events({
  'click .make-pqube-default': function (e) {
    e.preventDefault();
    $(e.target).addClass('disabled');
    Meteor.call('defaultizePQube', this._id);
  },
  'click .disconnect-pqube': function (e) {
    e.preventDefault();
    $(e.target).addClass('disabled');
    Meteor.call('disconnectPQube', this._id);
  },
  'click .connect-pqube': function (e) {
    e.preventDefault();
    $(e.target).addClass('disabled');
    Meteor.call('reconnectPQube', this._id);
  }
});
