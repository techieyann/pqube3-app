Template.pqubeStatus.helpers({
  connected: function () {
    return this.status == 'connected';
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
  }
});

Template.pqubeStatus.events({
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
