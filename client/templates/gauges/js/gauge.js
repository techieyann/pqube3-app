Template.gauge.onCreated(function () {
  var self = this;
  self.smoothieWidth = 130;
  self.smoothieHeight = 210;
  self.smoothieRecorder = {
    min: 31,
    max: 150
  };
});

Template.gauge.onRendered(function () {
  var self = this;
  self.autorun(function () {
    var data;
    Tracker.nonreactive(function () {
      data = Template.currentData();
    });
    var tgOpts = data.tunguskaGauge;
    var scale = Session.get(data.prefix+'-gaugeScale');
    if (self.gauge) {
      var value = self.gauge.get();
      var gaugeMax, gaugeMin;
      if (scale.anchor == 'min') {
	gaugeMax = scale.val+scale.init;
	gaugeMin = scale.val;
      }
      else if (scale.anchor == 'center') {
	gaugeMax = scale.val+scale.init;
	gaugeMin = scale.val-scale.init;
      }
      var range = gaugeMax-gaugeMin;
      tgOpts.range.min = gaugeMin;
      tgOpts.range.lowStop = gaugeMin-(range/20);
      tgOpts.range.max = gaugeMax;
      tgOpts.range.highStop = gaugeMax+(range/20);
      tgOpts.tick.major.first = gaugeMin;
      tgOpts.tick.major.last = gaugeMax;
      tgOpts.tick.major.interval = range/2;
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

      tgOpts.pointer = {
        fillColor: color
      };
      $('#'+data.prefix+'-tunguska-gauge-lock').remove();
      self.gauge = new TunguskaGauge(tgOpts);
      self.gauge.theme.pointer.dynamics = {
        easing: 'easeOutQuint',
        duration: 500
      };
      self.gauge.set(value);
    }

    if (self.smoothie) {
      self.smoothie.options.minValue = gaugeMin;
      self.smoothie.options.maxValue = gaugeMax;
    }

  });

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
	    self.smoothie.removeTimeseries(self.smoothieLine);
	    self.smoothieLine.clear();
	    self.smoothieLine.resetBounds();
	    delete self.smoothie;
	    delete self.smoothieLine;
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
	var gaugeMax, gaugeMin;
	var scale = gaugeList[data.gaugeName].scale;
      Session.set(data.prefix+'-gaugeScale', scale);
	if (scale.anchor == 'min') {
	  gaugeMax = scale.val+scale.init;
	  gaugeMin = scale.val;
	}
	else if (scale.anchor == 'center') {
	  gaugeMax = scale.val+scale.init;
	  gaugeMin = scale.val-scale.init;
	}
	var range = gaugeMax-gaugeMin;
	tgOpts.range.min = gaugeMin;
	tgOpts.range.lowStop = gaugeMin-(range/20);
	tgOpts.range.max = gaugeMax;
	tgOpts.range.highStop = gaugeMax+(range/20);
	tgOpts.tick.major.first = gaugeMin;
	tgOpts.tick.major.last = gaugeMax;
	tgOpts.tick.major.interval = range/2;
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

        tgOpts.pointer = {
          fillColor: color
        };
	self.gauge = new TunguskaGauge(tgOpts);
	self.gauge.theme.pointer.dynamics = {
          easing: 'easeOutQuint',
          duration: 500
	};
	self.gauge.set(tgOpts.range.lowStop);
	var unitStr = TAPi18n.__(data.gaugeName+'Units');
	self.smoothie = new SmoothieChart({
	  rotate: true,
	  scrollBackwards: true,
	  maxValue: tgOpts.range.max,
	  minValue: tgOpts.range.min,
	  interpolation: 'line',
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
	  pqubeId: data.pqubeId,
	  meter: data.prefix

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
      var val = '';
      if (presentVal.val != '') {
	val = presentVal.val.toFixed(this.sigFigs);
      }
      
      if (self.sevenSeg) {
        self.sevenSeg.setValue(alignToPattern(val, self.sevenSeg.pattern));
      }
      if (self.gauge) {
        if (self.lastVal == '' && val != '') $('#'+this.prefix+'-tunguska-gauge-3, #circle-'+this.prefix).show();
        if (val == '') $('#'+this.prefix+'-tunguska-gauge-3, #circle-'+this.prefix).hide();
        else {
	  self.gauge.set(val);
	}
      }
      if (self.smoothieLine && !presentVal.strike) {
	var selector = $('#'+this.prefix+'-smoothie-recorder');
        if (val == '') {
          self.smoothieLine.append(presentVal.time, null);
	}
	else {
	  self.smoothieLine.append(presentVal.time, val);
	  updateScale(this.prefix, self.smoothieLine.getMin(), self.smoothieLine.getMax(), data.legendSigFigs);
	  var percent = (val - this.tunguskaGauge.range.min) / (this.tunguskaGauge.range.max-this.tunguskaGauge.range.min);
          if (percent < 0) percent = 0;
          if (percent > 1) percent = 1;
	  var scaled = percent * (self.smoothieRecorder.max-self.smoothieRecorder.min);
	  var pos = Math.round(scaled + self.smoothieRecorder.min);
	  //          	  self.recorderTimeout = Meteor.setTimeout(function () {
	  selector.css('left', pos);
	  //          	  },1000);
        }
	self.smoothie.updateValueRange();
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

var updateScale = function (meterPrefix, min, max, labelSigFigs) {
  var data = {m:meterPrefix, min: min, max: max};
  console.log(data);
  if (!isNaN(min) && !isNaN(max)) {
    var scale;
    Tracker.nonreactive(function () {
      scale = Session.get(meterPrefix+'-gaugeScale');
    });
    var diff;
    if (scale.anchor == 'min') {
      diff = Math.abs(max-scale.val);
    }
    if (scale.anchor == 'center') {
      var center = scale.val;
	diff = Math.max(Math.abs(max-center),Math.abs(center-min));
      
    }
    console.log({diff: diff, scale: scale.init});
    if (diff > scale.init) {
      var upInit = up125(scale.init);
      while (diff > upInit) {
	upInit = up125(upInit);
      }
      scale.init = upInit;
      Session.set(meterPrefix+'-gaugeScale', scale);	      
      return;
    }
    var newInit = scale.init;
    var downInit = down125(scale.init);
    while (diff < downInit && downInit.toFixed(labelSigFigs) != 0) {
      newInit = downInit;
      downInit = down125(downInit);
    }
    if (scale.init != newInit) {
      scale.init = newInit;
      Session.set(meterPrefix+'-gaugeScale', scale);	      
    }
    return;
  }
};
