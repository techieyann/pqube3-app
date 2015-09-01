Template.meta.events({
  'change #scope-site-source': function (e) {
    Session.set('scopesSource', e.target.value);
    var emptyGraph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var emptyVectors = {
      l1: {
				magnitude: 0,
				angle: 0
      },
      l2: {
				magnitude: 0,
				angle: 0
      },
      l3: {
				magnitude: 0,
				angle: 0
      }
    };
    Session.set('vL1NGraph', emptyGraph);
    Session.set('vL2NGraph', emptyGraph);
    Session.set('vL3NGraph', emptyGraph);
    Session.set('iL1NGraph', emptyGraph);
    Session.set('iL2NGraph', emptyGraph);
    Session.set('iL3NGraph', emptyGraph);
    Session.set('vVectors', emptyVectors);
    Session.set('iVectors', emptyVectors);
    Session.set('odoReset', true);
    Meteor.setTimeout(function () {
      Session.set('odometer1', 0);
      Session.set('odometer2', 0);
      Session.set('odometer3', 0);
      Session.set('resetDate', null);
      Session.set('odoReset', false);
    },0);


  }
});
Template.meta.helpers({
  siteSelected: function (id) {
    return (Session.equals('scopesSource', id) ? 'selected':'');
  },
  pqubeTime: function () {
    return Session.get(Session.get('scopesSource')+'Time');
  }
});
