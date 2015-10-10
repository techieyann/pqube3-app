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
  },
  language: function () {
    return languages;
  }
});

var languages = [
  {
    acronym: 'en',
    fullName: 'english'
  },
  {
    acronym: 'cn',
    fullName: 'chinese'
  },
  {
    acronym: 'fr',
    fullName: 'french'
  },
  {
    acronym: 'jp',
    fullName: 'japanese'
  },
  {
    acronym: 'pl',
    fullName: 'polish'
  }
];
