Template.spectra.onRendered(function () {
  var self = this;
  self.initialized = false;
  self.ctx = $('#spectra-chart').get(0).getContext('2d');
  self.width = 530;
  self.height = 430;
  self.source = Session.get('spectraSource');
  self.scale = 10;
  self.autorun(function () {
    var rescaling = false;
    var spectraData = Session.get('spectraData');
    if (spectraData) {
      if (!Session.equals('spectraSource', self.source)) {
        self.initialized = false;
        self.source = Session.get('spectraSource');
      }
      if (spectraData.scale) {
	if (self.scale != spectraData.scale) {
	  rescaling = true;
	  self.initialized = false;
	  self.scale = spectraData.scale;
	}
      }
      if (!self.initialized) {
	if (self.barChart) self.barChart.destroy();
	      var emptyData = [];
        var labelsArray = [];
	      var dataLength = spectraList[self.source].length;
	      for (var i=0; i<dataLength; i++) {
	        emptyData.push(0);
	      }
        
        var data = {
          labels: spectraList[self.source].labels,
          datasets: []
        };
	var spectraSelectors = spectraList[self.source].dataSources;
	for (var i=0; i<spectraSelectors.length; i++) {
	  var dataset = {
            //            label: "My First dataset",
            fillColor: spectraList[self.source].colors[i],
            //            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(0,163,0,0.75)"
	  };
	  if (rescaling) 
	    dataset.data = spectraData.dataSet[i];
	  else 
	    dataset.data = emptyData;
	  data.datasets.push(dataset);
	}
        var options = {
          barValueSpacing: 1,
          barShowStroke: false,
          animation: false,
          omitXLabels: false,
          scaleShowGridLines: false,
          scaleShowVerticalLines: false,
	  scaleOverride: true,
	  scaleSteps: 8,
	  scaleStepWidth: self.scale/8,
	  scaleStartValue: 0,
          scaleFontColor: 'rgba(0,163,0,.75)',
          scaleGridLineColor : 'rgba(0,163,0,1)',
          scaleLineColor: 'rgba(0,163,0,1)'
        };
	self.ctx.canvas.width = self.width;
	self.ctx.canvas.height = self.height;
        self.barChart = new Chart(self.ctx).Bar(data, options);
        if (spectraData.type == 'harmonic') {
          Session.set('spectraFund1',0);
          Session.set('spectraFund2',0);
          Session.set('spectraFund3',0);
        }
        self.initialized = true;
      }
      else {
        if (spectraData.type == 'harmonic') {
          Session.set('spectraFund1',spectraData.fund1);
          Session.set('spectraFund2',spectraData.fund2);
          Session.set('spectraFund3',spectraData.fund3);
        }
	var spectraSelectors = spectraList[self.source].dataSources;
	for (var i=0; i<spectraSelectors.length; i++) {
          updateChartData(self.barChart, spectraData.dataSet[i], 'bars', i);
	}
        self.barChart.update();
      }
    }
  });
});

Template.spectra.helpers({
  isHarmonic: function () {
    return spectraList[Session.get('spectraSource')].type == 'harmonic';
  },
  fund1: function () {
    return Session.get('spectraFund1');
  },
  fund2: function () {
    return Session.get('spectraFund2');
  },
  fund3: function () {
    return Session.get('spectraFund3');
  },
  harmonicUnits: function () {
    return spectraList[Session.get('spectraSource')].units.y;
  },
  yUnits: function () {
    return spectraList[Session.get('spectraSource')].units.y;
  },
  xUnits: function () {
    return spectraList[Session.get('spectraSource')].units.x;
  }
});
