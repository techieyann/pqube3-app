updateChartData = function (chart, data, type, dataset) {
  if (chart.datasets.length) {
    var length = chart.datasets[0][type].length;
    for (var i=0; i<length; i++) {

	    chart.datasets[dataset][type][i].value = data[i];

    }
  }
};
