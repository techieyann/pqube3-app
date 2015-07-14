Template.currentChart.onRendered(function () {
  var self = this;

  self.initialized = false;
  self.ctx = $('#current-chart').get(0).getContext('2d');
  self.options = {
    datasetFill: false,
    pointDot: false,
    scaleShowGridLines: false,
    showScale: false,
    scaleOverride: true,
    scaleSteps: 12,
    scaleStepWidth: 10,
    scaleStartValue: -60,
    showTooltips: false,
    animation: false,
    bezierCurveTension: .1
  };


  self.autorun(function () {
    if (!self.initialized) {
      var pqubeData = PQubeData.findOne('pqube1');
      if (pqubeData) {
	self.data = {
	  labels: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
	  datasets:[
	    {label: 'L1-N Current',
	     strokeColor: "red",
	     data:pqubeData.iL1NGraph},
	    {label: 'L2-N Current',
	     strokeColor: "yellow",
	     data:pqubeData.iL2NGraph},
	    {label: 'L3-N Current',
	     strokeColor: "blue",
	     data:pqubeData.iL3NGraph}
	  ]
	};
	self.lineChart = new Chart(self.ctx).Line(self.data, self.options);      
	self.initialized = true;
      }
    }
    else {
      var data = {
	l1Data: Session.get('iL1NGraph'),
	l2Data:  Session.get('iL2NGraph'),
	l3Data: Session.get('iL3NGraph')
      };
      updateChartData(self.lineChart, data, 32);
      self.lineChart.update();
    }
  });
});


var updateChartData = function (chart, data, length) {
  for (var i=0; i<length; i++) {
    var j=0;
    for (var key in data) {
      if (data[key]) {
	chart.datasets[j].points[i].value = data[key][i];
	j++;
      }
    }
  }
};
