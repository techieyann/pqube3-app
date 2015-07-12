Template.gauge.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var data = Template.currentData();
    if (data) {
      try {
	$('#'+data.prefix+'-display').sevenSeg('destroy');
	self.gauge.set(data.tunguskaGauge.range.lowStop);
        $('#'+data.prefix+'-tunguska-gauge-lock').remove();
      }
      catch(err) {}
      $('#'+data.prefix+'-display').sevenSeg(data.sevenSegment);
      var tgOpts = data.tunguskaGauge;
          tgOpts.digital.callback =  function (pV) {
      return TAPi18n.__(data.units);
    };
    tgOpts.tick.major.legend.callback = function (n) {
      return  n.toFixed(data.legendSigFigs);
    };
      self.gauge = new TunguskaGauge(data.tunguskaGauge);
      self.gauge.theme.pointer.dynamics = {
	easing: 'easeOutQuint',
	duration: 500
      };
      self.gauge.set(data.tunguskaGauge.range.lowStop);
    }
  });
});

Template.gauge.helpers({
  updateData: function () {
    var self = Template.instance();
    var presentVal = Session.get('gauge'+this.prefix+'Value');
    $('#'+this.prefix+'-display').sevenSeg({value: presentVal});
    if (self.gauge)
      self.gauge.set(presentVal);
  }
});
