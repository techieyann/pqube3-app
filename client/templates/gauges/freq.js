var freqGauge;  
Template.freqGauge.rendered = function () {
  $('#freq-display').sevenSeg({
    digits: 6,
    colorOff: "#004200", 
    colorOn: "#00aa00",
    colorBackground: "#013500",
    slant: 3
  });


  var self = this;
	var gaugeOptions = {
    id: 'freq-tunguska-gauge',
    range: {
			min: 59.9,
			lowStop: 59.89,
			max: 60.1,
			highStop: 60.11,
			sweep: 240,
			startAngle: -120
    },
    foreground: {
			image: 'meter_front.png',
			left: -99,
			top: -96
    },
    digital: {
			font: '18px sans serif',
			color: '#333',
      top:57,
      left:0,
      callback: function (pV) {
        return 'Hz';
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
				interval: .1,
				legend: {
					color: '#555',
					callback: function (n) {
						return  n.toFixed(2);
					},
					font: '14px sans serif',
					radius: .60

				},
				first: 59.9,
				last: 60.101
			}
    }
  };

  self.gauge = new TunguskaGauge(gaugeOptions);
  self.gauge.theme.pointer.dynamics = {
    easing: 'easeOutQuint',
    duration: 500
  };
  self.gauge.set(59.89);
  freqGauge = self.gauge;
};

Template.freqGauge.helpers({
  frequency: function () {
    var data = PQubeData.findOne();
    if (data) {
			var freq = data.freq.toFixed(4);
			$('#freq-display').sevenSeg({value: freq});
			freqGauge.set(freq);
      Session.set('light_on', true);
      Meteor.setTimeout(function () {
        Session.set('light_on', false);
      }, 200);
    }
  }
});
