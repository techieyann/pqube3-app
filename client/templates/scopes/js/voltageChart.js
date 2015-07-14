Template.voltageChart.onRendered(function () {
  var self = this;

  self.initialized = false;
  self.ctx = $('#voltage-chart').get(0).getContext('2d');
  self.options = {
    datasetFill: false,
    pointDot: false,
    scaleShowGridLines: false,
    showScale: false,
    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: 100,
    scaleStartValue: -500,
    showTooltips: false,
    animation: false,
    bezierCurveTension: .5
  };


  self.autorun(function () {
    if (!self.initialized) {
      var pqubeData = PQubeData.findOne('pqube1');
      if (pqubeData) {
	self.data = {
	  labels: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
	  datasets:[
	    {label: 'L1-N Voltage',
	     strokeColor: "red",
	     data:pqubeData.vL1NGraph},
	    {label: 'L2-N Voltage',
	     strokeColor: "yellow",
	     data:pqubeData.vL2NGraph},
	    {label: 'L3-N Voltage',
	     strokeColor: "blue",
	     data:pqubeData.vL3NGraph}
	  ]
	};
	self.lineChart = new Chart(self.ctx).Line(self.data, self.options);      
	self.initialized = true;
      }
    }
    else {
      var data = {
	l1Data: Session.get('vL1NGraph'),
	l2Data:  Session.get('vL2NGraph'),
	l3Data: Session.get('vL3NGraph')
      };
      updateChartData(self.lineChart, data, 32);
      self.lineChart.update();
    }
  });
});


var updateChartData = function (chart, data, length) {
  if (chart.datasets.length) {
    for (var i=0; i<length; i++) {
      var j=0;
      for (var key in data) {
	if (data[key]) {
	  chart.datasets[j].points[i].value = data[key][i];
	  j++;
	}
      }
    }
  }
};
