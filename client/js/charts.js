updateChartData = function (chart, data, type, dataset) {
  if (chart.datasets.length) {
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

var down125 = function (num) {
  var sciNot = num.toExponential().split('e');
  var coefficient = parseInt(sciNot[0]);
  var exponent = parseInt(sciNot[1]);
  if (coefficient == 1) {
    exponent--;
    coefficient = 5;
  }
  else if (coefficient == 2) 
    coefficient = 1;
  else if (coefficient == 5)
    coefficient = 2;
  else {
    console.log('125 scaling down error: '+num);
    return;
  }
  var nextLower = parseFloat(coefficient + 'e' + exponent);
  return nextLower;
};

var up125 = function (num) {
  var sciNot = num.toExponential().split('e');
  var coefficient = parseInt(sciNot[0]);
  var exponent = parseInt(sciNot[1]);
  if (coefficient == 5) {
    coefficient = 1;
    exponent++;
  }
  else if (coefficient == 2) 
    coefficient = 5;
  else if (coefficient == 1)
    coefficient = 2;
  else {
    console.log('125 scaling up error: '+num);
    return;
  }
  var nextHigher = parseFloat(coefficient + 'e' + exponent);
  return nextHigher;
};


