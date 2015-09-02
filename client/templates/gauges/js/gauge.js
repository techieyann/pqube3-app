Template.gauge.onCreated(function () {
  var self = this;
  self.smoothieWidth = 130;
  self.smoothieHeight = 210;
  self.smoothieRecorder = {
    min: 31,
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
        self.sevenSeg = null;
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
      self.sevenSeg = new SegmentDisplay(data.prefix+'-display');
      self.sevenSeg.pattern         = data.sevenSegment.pattern;
      self.sevenSeg.displayAngle    = 12;
      self.sevenSeg.digitHeight     = 20;
      self.sevenSeg.digitWidth      = 15;
      self.sevenSeg.digitDistance   = 4;
      self.sevenSeg.segmentWidth    = 2.5;
      self.sevenSeg.segmentDistance = 0.5;
      self.sevenSeg.segmentCount    = 7;
      self.sevenSeg.cornerType      = 0;
      self.sevenSeg.colorOn         = data.sevenSegment.colorOn;
      self.sevenSeg.colorOff        = data.sevenSegment.colorOff;
      self.sevenSeg.draw();
      var tgOpts = data.tunguskaGauge;
      tgOpts.digital.callback =  function (pV) {
	return TAPi18n.__(data.gaugeName+'Units');
      };
      tgOpts.tick.major.legend.callback = function (n) {
	return  n.toFixed(data.legendSigFigs);
      };
      var color;
      switch (data.prefix) {
        case 1:
        color = "purple";
        break;
        case 2:
        color = "#D66A00";
        break;
        case 3:
        color = "green";
        break;
      }

        data.tunguskaGauge.pointer = {
            fillColor: color
        };
      self.gauge = new TunguskaGauge(data.tunguskaGauge);
      self.gauge.theme.pointer.dynamics = {
	easing: 'easeOutQuint',
	duration: 500
      };
      self.gauge.set(data.tunguskaGauge.range.lowStop);
      var unitStr = TAPi18n.__(data.gaugeName+'Units');
      self.smoothie = new SmoothieChart({
	rotate: true,
	scrollBackwards: true,
	maxValue: tgOpts.range.max,
	minValue: tgOpts.range.min,
	interpolation: 'step',
	millisPerPixel: 500,
	xOffset: 30,
	labels: {
	  disabled: false,
	  fillStyle: '#747474',
	  unit: unitStr,
	  precision: data.legendSigFigs,
	  fontSize:7
	},
	grid: {
	  fillStyle: '#e4e4e4',
	  strokeStyle: '#747474',
	  sharpLines: true,
	  millisPerLine:30000,
	  verticalSections: 2
	},
	timestampFormatter:SmoothieChart.timeFormatter,
	pqubeId: data.pqubeId

      });
      self.smoothie.streamTo(self.canvas);
      self.smoothieLine = new TimeSeries();
      self.smoothie.addTimeSeries(self.smoothieLine, {lineWidth:2, strokeStyle:color});
      $('#'+self.prefix+'-smoothie-recorder').css('left', null);
    }
  });
});

Template.gauge.helpers({
  updateData: function () {
    var self = Template.instance();
    var data = Template.currentData();
    var presentVal = Session.get('gauge'+this.prefix+'Value');
    if (presentVal) {
      var val = presentVal.val.toFixed(this.sigFigs);
      if (self.sevenSeg) {
        self.sevenSeg.setValue(alignToPattern(val, self.sevenSeg.pattern));
      }
      if (self.gauge)
	self.gauge.set(val);
      if (self.smoothieLine) {
        if (self.lastVal != presentVal.val) {
	  self.smoothieLine.append(presentVal.time, val);
	  var percent = (val - this.tunguskaGauge.range.min) / (this.tunguskaGauge.range.max-this.tunguskaGauge.range.min);
          if (percent < 0) percent = 0;
          if (percent > 1) percent = 1;
	  var scaled = percent * (self.smoothieRecorder.max-self.smoothieRecorder.min);
	  var pos = Math.round(scaled + self.smoothieRecorder.min);
	  var selector = $('#'+this.prefix+'-smoothie-recorder');
	  self.recorderTimeout = Meteor.setTimeout(function () {
	    selector.css('left', pos);
	  },1500);
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
