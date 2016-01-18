Meteor.methods({
  defaultizePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInDefault'));
    }
    var pqube = PQubes.findOne(id);
    if (!pqube) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' PQube3');
    }
    if (!hasPermission(pqube.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    PQubes.update({defaultPQube: true, org: pqube.org}, {$set: {defaultPQube: false}}, {multi: true});
    return PQubes.update(id, {$set: {defaultPQube: true}});
  },
  addNewPQube: function (pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (PQubes.findOne({org: pqubeOpts.org, name: pqubeOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errNameExists')+': '+pqubeOpts.name);
    }
    if (PQubes.findOne({host: pqubeOpts.host, port: pqubeOpts.port})) {
      throw new Meteor.Error('hostname', TAPi18n.__('errHostExists')+': '+pqubeOpts.host+':'+pqubeOpts.port);
    }
    if (!hasPermission(pqubeOpts.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    pqubeOpts.status = 'unknown';
    var pqubeMeters = {
      _id: pqubeOpts._id,
      frequency: 60
    };
    Meters.insert(pqubeMeters);
    return PQubes.insert(pqubeOpts);
  },
  editPQube: function (id, pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInEdit'));
    }
    var pqube = PQubes.findOne(id);
    if (!pqube) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' PQube3');
    }
    if (!hasPermission(pqube.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (PQubes.findOne({_id: {$ne: id}, org: pqube.org, name: pqubeOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errNameExists')+': '+pqubeOpts.name);
    }    
    if (PQubes.findOne({_id: {$ne: id}, host: pqubeOpts.host, port: pqubeOpts.port})) {
      throw new Meteor.Error('hostname', TAPi18n.__('errHostExists')+': '+pqubeOpts.host+':'+pqubeOpts.port);
    }
    if (pqube.ip != pqubeOpts.ip || pqube.port != pqubeOpts.port)
    {
      pqubeOpts.status = 'unknown';
    }
    return PQubes.update(id, {$set: pqubeOpts});
  },
  editMetersPQube: function (id, meterOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInEdit'));
    }
    var pqube = PQubes.findOne(id);
    if (!pqube) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' PQube3');
    }
    if (!hasPermission(pqube.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (!Meters.findOne(id)) {
      meterOpts._id = id;
      return Meters.insert(meterOpts);
    }
    else {
      return Meters.update(id, {$set: meterOpts});
    }
  },
  removePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInRemove')+' PQube3');
    }
    var pqube = PQubes.findOne(id);
    if (!pqube) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' PQube3');
    }
    if (!hasPermission(pqube.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (pqube.defaultPQube) {
      var randomPQube = PQubes.findOne({_id: {$ne: id}, org: pqube.org});
      if (randomPQube)
	      PQubes.update(randomPQube._id, {$set: {defaultPQube: true}});
    }
    return PQubes.remove(id);
  }
});
