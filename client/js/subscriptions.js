watchDataSubscriptions = function () {
  Tracker.autorun(function () {
    var scopesSource = Session.get('scopesSource');
    var spectraSelected = Session.get('spectraSelected');
    var spectraSource = Session.get('spectraSource');

    var pqubes = PQubes.find();
    var subOpts = {};
    pqubes.forEach(function (pqube) {
      var pqubeOpts;
      if (scopesSource == pqube._id) {
	      var spectraSelectors = {};
	      if (spectraSelected) {
	        var dataSources = spectraList[spectraSource].dataSources;
	        for (var i=0; i<dataSources.length; i++) {
	          spectraSelectors[dataSources[i]] = true;
	        }
	      }
	      pqubeOpts = $.extend(true, 
			                       {}, 
			                       pqubeTime,
			                       scopesDataSources,
			     spectraSelectors);
      }
      else pqubeOpts = pqubeTime;
      subOpts[pqube._id] = pqubeOpts;
    });
    if (!spectraSelected) {
      for (var i=1; i<4; i++) {
	      var gauge = Session.get('gauge'+i);
	      if (gauge) {
	        if (subOpts[gauge.pqubeId]) {
            var source = gauge.dataSource;
	          subOpts[gauge.pqubeId][source] = true;
	        }
	      }
      }
    }
    pqubes.forEach(function (pqube) {
      Meteor.subscribe('pqubeData', pqube._id, subOpts[pqube._id]);
    });
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


