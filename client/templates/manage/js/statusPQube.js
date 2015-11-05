Template.pqubeStatus.helpers({
  defaultLanguage: function () {
    var language = this.language;
    var fullName = Languages.filter(function (lang) {
      return lang.acronym == language;
    })[0].fullName;
    return fullName;
  }
});

Template.pqubeStatus.events({
  'click .edit-pqube': function (e) {
    e.preventDefault();
    Session.set('editPQube', this);
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'editPQube'
    });
    $('#modal').modal('show');    
  },
  'click .delete-pqube': function (e) {
    e.preventDefault();
    Session.set('deletePQube', this);
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'confirmDeletePQube'
    });
    $('#modal').modal('show');
  }
});
