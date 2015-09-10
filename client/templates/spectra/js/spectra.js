Template.spectra.onRendered(function () {
  var self = this;
  self.initialized = false;
  self.ctx = $('#spectra-chart').get(0).getContext('2d');
  self.source = Session.get('spectraSource');
  self.autorun(function () {
    var spectraData = Session.get('spectraData');
    if (!Session.equals('spectraSource', self.source)) {
      self.initialized = false;
      self.source = Session.get('spectraSource');
    }
    if (!self.initialized) {
      var data = {
        labels: spectraList[self.source].labels,
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }
        ]
      };
      var options = {};
      self.barChart = new Chart(self.ctx).Bar(data, options);
      if (spectraData.type == 'harmonic') {
        Session.set('spectraFundamental',0);
      }
      self.initialized = true;
    }
    else {
      if (spectraData.type == 'harmonic') {
        Session.set('spectraFundamental',spectraData.fundamental);
      }
      updateChartData(self.barChart, spectraData.dataSet, 'bars', 0);
      self.barChart.update();
    }
  });
});

Template.spectra.helpers({
  isHarmonic: function () {
    return spectraList[Session.get('spectraSource')].type == 'harmonic';
  },
  fundamental: function () {
    return Session.get('spectraFundamental');
  },
  harmonicUnits: function () {
    return spectraList[Session.get('spectraSource')].units;
  }
});
