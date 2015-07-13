Template.gauge.onCreated(function () {
  var self = this;
  self.smoothieWidth = 120;
  self.smoothieHeight = 200;
  self.smoothieRecorder = {
    min: 29,
    max: 149
  };
});

Template.gauge.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var data = Template.currentData();
    if (data) {
      self.canvas = document.getElementById(data.prefix+'-smoothie-canvas');
      try {
	$('#'+data.prefix+'-display').sevenSeg('destroy');
	self.gauge.set(data.tunguskaGauge.range.lowStop);
        $('#'+data.prefix+'-tunguska-gauge-lock').remove();
	if(self.smoothie) {
	  self.canvas.width = self.smoothieWidth;
	  self.canvas.height = self.smoothieHeight;
	  self.smoothie.stop();
	  self.smoothie = null;
	  self.smoothieLine = null;
	  Meteor.clearTimeout(self.recorderTimeout);
	}

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
      self.smoothie = new SmoothieChart({
	rotate: true,
	scrollBackwards: true,
	maxValue: tgOpts.range.max,
	minValue: tgOpts.range.min,
	interpolation: 'step',
	millisPerPixel: 100,
	dataFreq: 1500,
	xOffset: 18,
	labels: {
	  disabled: true
//	  precision: data.legendSigFigs
	},
	grid: {
	  fillStyle: '#e4e4e4',
	  sharpLines: true,
	  millisPerLine:10000,
	  verticalSections: 2
	}
      });

      self.smoothie.streamTo(self.canvas);
      self.smoothieLine = new TimeSeries();
      self.smoothie.addTimeSeries(self.smoothieLine, {lineWidth:2, strokeStyle:'red'});
      $('#'+self.prefix+'-smoothie-recorder').css('left', null);
    }
  });
});

Template.gauge.helpers({
  updateData: function () {
    var self = Template.instance();
    var presentVal = Session.get('gauge'+this.prefix+'Value');
    if (presentVal) {
      var val = presentVal.val.toFixed(this.sigFigs);
      $('#'+this.prefix+'-display').sevenSeg({value: val});
      if (self.gauge)
	self.gauge.set(val);
      if (self.smoothieLine) {
        if (self.lastVal != presentVal.val) {
	  self.smoothieLine.append(presentVal.time, val);
	  var percent = (val - this.tunguskaGauge.range.min) / (this.tunguskaGauge.range.max-this.tunguskaGauge.range.min);
	  var scaled = percent * (self.smoothieRecorder.max-self.smoothieRecorder.min);
	  var pos = Math.round(scaled + self.smoothieRecorder.min);
	  var selector = $('#'+this.prefix+'-smoothie-recorder');
	  self.recorderTimeout = Meteor.setTimeout(function () {
	    selector.css('left', pos);
	  }, 1500);
        }
        else self.smoothieLine.append(presentVal.time, null);
      }
      self.lastVal = presentVal.val;
    }
  },
  smoothieWidth: function () {
    var self = Template.instance();
    return self.smoothieWidth;
  },
  smoothieHeight: function () {
    var self = Template.instance();
    return self.smoothieHeight;
  }
});
