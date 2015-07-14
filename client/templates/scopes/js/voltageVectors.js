Template.voltageVectors.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var vectors = Session.get('vVectors');
    if (vectors)      
      drawVectors('voltage', vectors);
  });
});
