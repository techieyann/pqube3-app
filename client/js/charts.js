updateChartData = function (chart, data, type, dataset) {
  if (chart.datasets.length && data) {
    var length = chart.datasets[0][type].length;
      for (var i=0; i<length; i++) {
	      chart.datasets[dataset][type][i].value = data[i];
      }
  }
};

scopeRescale = function (scopeSessVar, max) {
  var scopeScale = Session.get(scopeSessVar);
  if (max < scopeScale*5) {
    var smallerScopeScale = down125(scopeScale);
    var lastScopeScale = NaN;
    while (max < smallerScopeScale*5) {
      lastScopeScale = smallerScopeScale;
      smallerScopeScale = down125(smallerScopeScale);
    }
    if (!isNaN(lastScopeScale))
      Session.set(scopeSessVar, lastScopeScale);
  }
  else if (max > scopeScale*5) {
    var biggerScopeScale = up125(scopeScale);
    while (max > biggerScopeScale*5) {
      biggerScopeScale = up125(biggerScopeScale);
    }
    Session.set(scopeSessVar, biggerScopeScale);
  }
};


