Template.odometers.onRendered(function () {
  var self = this;
  self.initialized = false;
  self.autorun(function () {
    if (!self.initialized) {
      if(Session.get('odometer3')) {
	var opts = {
	  format: '(,ddd).dd',
	  duration: 500,
	  theme: 'car',
	  numDigits: 11,
	  sigFigs: 2
	};
	opts.value = Session.get('odometer1');
	Odometeor.create('odometer1', 'last-reset', opts);
	opts.value = Session.get('odometer2');
	Odometeor.create('odometer2', 'last-reset', opts);
	opts.value = Session.get('odometer3');
	Odometeor.create('odometer3', 'last-reset', opts);
	self.initialized = true;
      }
    }

});
});

Template.odometers.helpers({
  updateData: function () {
    $('#odometer1').html(Session.get('odometer1'));
    $('#odometer2').html(Session.get('odometer2'));
    $('#odometer3').html(Session.get('odometer3'));
  },
  date: function () {
    return Session.get('resetDate');
  }
});
