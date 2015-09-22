Template.spectra.onRendered(function () {
  var self = this;
  self.initialized = false;
  self.ctx = $('#spectra-chart').get(0).getContext('2d');
  self.source = Session.get('spectraSource');
  self.autorun(function () {
    var spectraData = Session.get('spectraData');
    if (spectraData) {
      if (!Session.equals('spectraSource', self.source)) {
        self.initialized = false;
        self.source = Session.get('spectraSource');
      }
      if (!self.initialized) {
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
	  data.datasets.push(            {
            //            label: "My First dataset",
            fillColor: spectraList[self.source].colors[i],
            //            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(0,163,0,0.75)",
            //            highlightStroke: "rgba(220,220,220,1)",
            data: emptyData
          });
	}
        var options = {
          barValueSpacing: 1,
          barShowStroke: false,
          animation: false,
          omitXLabels: false,
          scaleShowGridLines: false,
          scaleShowVerticalLines: false,
          scaleFontColor: 'rgba(0,163,0,.75)',
          scaleGridLineColor : 'rgba(0,163,0,1)',
          scaleLineColor: 'rgba(0,163,0,1)'
        };
        self.barChart = new Chart(self.ctx).Bar(data, options);
        if (spectraData.type == 'harmonic') {
          Session.set('spectraDC1',0);
          Session.set('spectraDC2',0);
          Session.set('spectraDC3',0);
        }
        self.initialized = true;
      }
      else {
        if (spectraData.type == 'harmonic') {
          Session.set('spectraDC1',spectraData.DC1);
          Session.set('spectraDC2',spectraData.DC2);
          Session.set('spectraDC3',spectraData.DC3);
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
  DC1: function () {
    return Session.get('spectraDC1');
  },
  DC2: function () {
    return Session.get('spectraDC2');
  },
  DC3: function () {
    return Session.get('spectraDC3');
  },
  harmonicUnits: function () {
    return spectraList[Session.get('spectraSource')].units;
  }
});
