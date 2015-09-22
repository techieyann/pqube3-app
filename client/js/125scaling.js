down125 = function (num) {
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

up125 = function (num) {
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
