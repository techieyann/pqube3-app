Template.title.helpers({
  title: function () {
    return Session.get('scopesSource');
  }
});

Template.title.onRendered(function () {
  this.autorun(function () {
    var title = TAPi18n.__(Session.get('scopesSource'));
    var titleDiv = $('#title-font-sizing');
    var fontSize = 25;
    titleDiv.css('font-size', fontSize+'px');
    while (titleDiv.width() > 290) {
      fontSize--;
      titleDiv.css('font-size', fontSize+'px');
    }
    $('#title').css('font-size', fontSize);
  });
});
