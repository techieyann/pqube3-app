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
  defaultLanguage: function () {
    var language = this.language;
    var fullName = Languages.filter(function (lang) {
      return lang.acronym == language;
    })[0].fullName;
    return fullName;
  },
  statusIcon: function () {
    if (this.status == 'connected')
      return 'ok-sign text-success';
    if (this.status == 'disconnected')
      return 'remove-sign text-danger';
    if (this.status == 'unknown')
      return 'question-sign text-warning';
    if (this.status == 'unverified')
      return 'ban-circle text-danger';
    return '';
  },
  defaultable: function () {
    return !this.defaultPQube && this.status == 'connected';
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
