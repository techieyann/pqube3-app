var thdGauge;  
Template.THDGauge.rendered = function () {
  $('#thd-display').sevenSeg({
    digits: 4,
    colorOff: "#004200", 
    colorOn: "#00aa00",
    colorBackground: "#013500",
    slant: 3
  });


  var self = this;
	var gaugeOptions = {
    id: 'thd-tunguska-gauge',
    range: {
			min: 0,
			lowStop: -1,
			max: 5,
			highStop: 6,
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
        return '%';
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
				interval: 2.5,
				legend: {
					color: '#555',
					callback: function (n) {
						return  n.toFixed(1);
					},
					font: '14px sans serif',
					radius: .60

				},
				first: 0,
				last: 5
			}
    }
  };

  self.gauge = new TunguskaGauge(gaugeOptions);
  self.gauge.theme.pointer.dynamics = {
    easing: 'easeOutQuint',
    duration: 500
  };
  self.gauge.set(-0.5);
  thdGauge = self.gauge;
};

Template.THDGauge.helpers({
  thd: function () {
    var data = PQubeData.findOne();
    if (data) {
			var thd = data.THDL1.toFixed(2);
			$('#thd-display').sevenSeg({value: thd});
			thdGauge.set(thd);
    }
  }
});
