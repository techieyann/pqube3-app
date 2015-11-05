Template.confirmDeletePQube.helpers({
  name: function () {
    return Session.get('deletePQube').name;
  },
  ip: function () {
    var pqube = Session.get('deletePQube');
    if (pqube) {
      return pqube.ip+':'+pqube.port;
    }
  }
});

Template.confirmDeletePQube.events({
  'click #delete-pqube': function (e) {
    e.preventDefault();
    var id = Session.get('deletePQube')._id;
    if (id) {
      Meteor.call('removePQube', id, function (err, result) {
	if (err) console.log(err);
	else {
	  $('#modal').modal('hide');
	}
      });
    }
  }
});
