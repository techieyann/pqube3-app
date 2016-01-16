Template.language.events({
  'change #language-select': function (e) {
    var lang = $(e.target).val();
    LocalStore.set('language', lang);
    var name = Languages.filter(function (language) {
      return language.acronym == lang;
    })[0].fullName;
    sAlert.info(TAPi18n.__('alertLangPrefSet')+' '+TAPi18n.__(name));
  }
});
Template.language.helpers({
  currentLanguage: function () {
    return (this.acronym == TAPi18n.getLanguage() ? 'selected' : '');
  }
});


