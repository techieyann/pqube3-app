Template.currentChart.onRendered(function () {
  var self = this;
  var scale = Session.get('currentScopeScale');
  self.initialized = false;
  self.width = 243;
  self.height = 86;

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
      if (self.lineChart) self.lineChart.destroy();
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
      var ctx = $('#current-chart').get(0).getContext('2d');
      ctx.canvas.width = self.width;
      ctx.canvas.height = self.height;
      self.lineChart = new Chart(ctx).Line(self.data, self.options);      
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
