observePQubes = function () {
  PQubes.find().observeChanges({
    added: function (id, fields) {
      sAlert.success('Connected to PQube at '+fields.name);
    },
    removed: function (id) {
      if (PQubes.find().count()) {
	var defaultPQube = PQubes.findOne({defaultPQube: true});
	var switchToId = (defaultPQube ? defaultPQube._id : PQubes.findOne()._id);

	var scope = Session.get('scopesSource');
	var gauge1 = Session.get('gauge1');
	var gauge2 = Session.get('gauge2');
	var gauge3 = Session.get('gauge3');
	var displayChangeFlag = false;

	if (id == scope) {
	  Session.set('scopesSource', switchToId);
	  displayChangeFlag = true;
	}
	if (id == gauge1.pqubeId) {
	  gauge1.pqubeId = switchToId;
	  Session.set('gauge1', gauge1);
	  displayChangeFlag = true;
	}
	if (id == gauge2.pqubeId) {
	  gauge2.pqubeId = switchToId;
	  Session.set('gauge2', gauge2);
	  displayChangeFlag = true;
	}
	if (id == gauge3.pqubeId) {
	  gauge3.pqubeId = switchToId;
	  Session.set('gauge3', gauge3);
	  displayChangeFlag = true;
	}
	if (displayChangeFlag)
	  sAlert.warning('PQube has become unnavailable, view changed where appropriate.');
      }
    }
  });
};