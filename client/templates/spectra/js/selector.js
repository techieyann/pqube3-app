Template.spectraSelector.helpers({
  spectraSource: function () {
    var array = [];
    for (var key in spectraList) {
      array.push($.extend({spectraName: key},spectraList[key]));
    }
    return array;
  },
  spectraSelected: function (name) {
    return (Session.equals('spectraSource', name) ? 'selected':'');
  }
});

Template.spectraSelector.events({
  'change #spectra-source': function (e) {
    console.log(e.target.value);
    Session.set('spectraSource', e.target.value);
  }
});
