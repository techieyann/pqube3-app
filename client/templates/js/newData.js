Template.newData.helpers({
	lightStatus: function () {
    return (Session.equals('light_on', true) ? 'on':'off');
	}
});
