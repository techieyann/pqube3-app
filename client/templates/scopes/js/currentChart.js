Template.currentChart.onRendered(function () {
  var self = this;

  self.initialized = false;
  self.rescale = false;
  self.ctx = $('#current-chart').get(0).getContext('2d');
  var scale = Session.get('currentScopeScale');
  self.options = {
    datasetFill: false,
    pointDot: false,
    scaleShowGridLines: false,
    showScale: false,
    scaleOverride: true,
    scaleSteps: 10,
    scaleStepWidth: scale,
    scaleStartValue: -5*scale,
    showTooltips: false,
    animation: false,
    bezierCurveTension: .1
  };


  self.autorun(function () {
    var l1Graph = Session.get('iL1NGraph');
    var l2Graph = Session.get('iL2NGraph');
    var l3Graph = Session.get('iL3NGraph');
    var stepWidth = Session.get('currentScopeScale');
    var initGraph = false;
    
    if(!self.initialized)
    {
      l1Graph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      l2Graph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      l3Graph = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      initGraph = true;
    }
    if (stepWidth != self.options.scaleStepWidth) {
      self.options.scaleStepWidth = stepWidth;
      self.options.scaleStartValue = -5*stepWidth;
      initGraph = true;
    }
    if (initGraph) {
      self.data = {
	      labels: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
	      datasets:[
	        {label: 'L1-N Current',
	         strokeColor: "red",
	         data:l1Graph},
	        {label: 'L2-N Current',
	         strokeColor: "yellow",
	         data:l2Graph},
          {label: 'L3-N Current',
           strokeColor: '#0066FF',
	         data:l3Graph}
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
      var i = 0;
      for (var key in data) { 
        updateChartData(self.lineChart, data[key], 'points', i);
        i++;
      }
      self.lineChart.update();
    }
  });
});
