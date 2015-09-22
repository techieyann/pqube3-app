setSubscription = function () {
  Tracker.autorun(function () {
    var subOpts = {
      pqube1: pqubeTime,
      pqube2: pqubeTime
    };
    var spectraSelected = Session.get('spectraSelected');
    var scopesSource = Session.get('scopesSource');
    subOpts[scopesSource] = $.extend(true, 
			                               {}, 
			                               pqubeTime,
                                     scopesDataSources);


    if (spectraSelected) {
      var spectraSource = Session.get('spectraSource');
      var spectraSelectors = spectraList[spectraSource].dataSources;
      for (var i=0; i<spectraSelectors.length; i++) {
	subOpts[scopesSource][spectraSelectors[i]] = true;
      }
    }
    else {
      for (var i=1; i<4; i++) {
        var gauge = Session.get('gauge'+i);
        if (gauge) {
          var source = gauge.dataSource;
          subOpts[gauge.pqubeId][source] = true;
        }
      }
    }
    Meteor.subscribe('pqube1Data', subOpts.pqube1);
    Meteor.subscribe('pqube2Data', subOpts.pqube2);
  });
};
var pqubeTime =  {
  pqYear: true,
  pqMonth: true,
  pqDay: true,
  pqHour: true,
  pqMinute: true,
  pqSecond: true
};

var scopesDataSources = {
  vMagL1N: true,
  vAngL1N: true,
  vMagL2N: true,
  vAngL2N: true,
  vMagL3N: true,
  vAngL3N: true,
  iMagL1N: true,
  iAngL1N: true,
  iMagL2N: true,
  iAngL2N: true,
  iMagL3N: true,
  iAngL3N: true,
  yearER: true,
  monthER: true,
  dayER: true,
  vL1NGraph: true,
  vL2NGraph: true,
  vL3NGraph: true,
  iL1NGraph: true,
  iL2NGraph: true,
  iL3NGraph: true,
  energy: true,
  VAh: true
};


