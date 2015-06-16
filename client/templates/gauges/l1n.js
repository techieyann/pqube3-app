var l1nGauge;  
Template.L1NGauge.rendered = function () {
  $('#l1n-display').sevenSeg({
    digits: 6,
    colorOff: "#004200", 
    colorOn: "#00aa00",
    colorBackground: "#013500",
    slant: 3
  });


  var self = this;
  var gaugeOptions = {
    id: 'l1n-tunguska-gauge',
    range: {
      min: 250,
      lowStop: 230,
      max: 300,
      highStop: 320,
      sweep: 240,
      startAngle: -120
    },
    foreground: {
      image: 'meter_front.png',
      left: -99,
      top: -96
    },
    digital: {
      font: '18px sans-serif',
      color: '#333',
      top:57,
      left:0,
      callback: function (pV) {
        return 'Vrms';
      }
    },
    tick: {
      minor: {
	alpha: 0
      },
      major: {
	lineWidth: 0,
	startAt: 1,
	endAt: 1,
	interval: 25,
	legend: {
	  color: '#555',
	  callback: function (n) {
	    return  n.toFixed(1);
	  },
	  font: '14px sans-serif',
	  radius: .60

	},
	first: 250,
	last: 300
      }
    }
  };

  self.gauge = new TunguskaGauge(gaugeOptions);
  self.gauge.theme.pointer.dynamics = {
    easing: 'easeOutQuint',
    duration: 500
  };
  self.gauge.set(230);
  l1nGauge = self.gauge;
};

Template.L1NGauge.helpers({
  l1n: function () {
    var data = PQubeData.findOne();
    if (data) {
      var l1n = data.vMagL1N.toFixed(3);
      $('#l1n-display').sevenSeg({value: l1n});
      l1nGauge.set(l1n);
    }
  }
});
