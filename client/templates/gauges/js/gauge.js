Template.gauge.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var data = Template.currentData();
    if (data) {
      try {
	$('#'+data.prefix+'-display').sevenSeg('destroy');
      }
      catch(err) {}
      $('#'+data.prefix+'-display').sevenSeg(data.sevenSegment);
      var tgOpts = data.tunguskaGauge;
      tgOpts.digital.callback =  function (pV) {
	return TAPi18n.__(data.tgDigitalUnits);
      };
      tgOpts.tick.major.legend.callback = function (n) {
	return  n.toFixed(data.tgMajorLegendSigFigs);
      };
      self.gauge = new TunguskaGauge(tgOpts);
      self.gauge.theme.pointer.dynamics = {
	easing: 'easeOutQuint',
	duration: 500
      };
      self.gauge.set(data.startVal);
    }
  });
});

Template.gauge.helpers({
  updateData: function () {
    var self = Template.instance();
    var data = PQubeData.findOne();
    if (data) {
      var freq = data[self.data.dataSource].toFixed(self.data.sigFigs);
      $('#'+this.prefix+'-display').sevenSeg({value: freq});
      self.gauge.set(freq);
      Session.set('light_on', true);
      Meteor.setTimeout(function () {
        Session.set('light_on', false);
      }, 200);
    }
  }
});
