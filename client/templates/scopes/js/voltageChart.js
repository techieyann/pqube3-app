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
    var l1Graph = Session.get('vL1NGraph');
    var l2Graph = Session.get('vL2NGraph');
    var l3Graph = Session.get('vL3NGraph');
    if (!self.initialized) {
      var emptyGraph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      self.data = {
	labels: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
	datasets:[
	  {label: 'L1-N Current',
	   strokeColor: "red",
	   data:emptyGraph},
	  {label: 'L2-N Current',
	   strokeColor: "yellow",
	   data:emptyGraph},
	  {label: 'L3-N Current',
	   strokeColor: "#0066FF",
	   data:emptyGraph}
	]
      };
      self.lineChart = new Chart(self.ctx).Line(self.data, self.options);      
      self.initialized = true;
    }
    else {
      var data = {
	l1Data: l1Graph,
	l2Data: l2Graph,
	l3Data: l3Graph
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
