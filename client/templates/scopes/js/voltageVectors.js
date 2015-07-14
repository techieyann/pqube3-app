Template.voltageVectors.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var vectors = Session.get('vVectors');
    if (vectors)
      Session.set('vectorNormalize', vectors.l1.angle);
      drawVectors('voltage', vectors);
  });
});
