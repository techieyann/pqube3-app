Template.currentVectors.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var vectors = Session.get('iVectors');
    if (vectors)      
      drawVectors('current', vectors);
  });
});
