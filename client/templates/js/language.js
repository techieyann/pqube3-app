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
  currentLanguage: function () {
    return (this.acronym == TAPi18n.getLanguage() ? 'selected' : '');
  }
});


