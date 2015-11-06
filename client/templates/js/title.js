Template.title.helpers({
  title: function () {
    var pqube = PQubes.findOne(Session.get('scopesSource'));
    if (pqube)
      return pqube.name;
    return 'Loading...';
  }
});

Template.title.onRendered(function () {
  this.autorun(function () {
    var pqube = PQubes.findOne(Session.get('scopesSource'));
    var title = TAPi18n.__('Loading...');
    if (pqube) 
      title = TAPi18n.__(pqube.name);
    
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
