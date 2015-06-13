Template.language.events({
  'change #language-select': function (e) {
    var lang = $(e.target).val();
    TAPi18n.setLanguage(lang)
      .done(function () {
      })
      .fail(function (err) {
        console.log(err);
      });
  }
});
Template.language.helpers({
  currentLanguage: function (lang) {
    return (lang == TAPi18n.getLanguage() ? 'selected' : '');
  }
});
