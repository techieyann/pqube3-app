Meteor.methods({
  defaultizePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInDefault'));
    }
    PQubes.update({defaultPQube: true}, {$set: {defaultPQube: false}});
    return PQubes.update(id, {$set: {defaultPQube: true}});
  },
  addNewPQube: function (pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (PQubes.findOne({name: pqubeOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errNameExists')+': '+pqubeOpts.name);
    }
    if (PQubes.findOne({ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', TAPi18n.__('errIPExists')+': '+pqubeOpts.ip+':'+pqubeOpts.port);
    }
    pqubeOpts.status = 'unknown';
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
    if (PQubes.findOne({_id: {$ne: id}, name: pqubeOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errNameExists')+': '+pqubeOpts.name);
    }    
    if (PQubes.findOne({_id: {$ne: id}, ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', TAPi18n.__('errIPExists')+': '+pqubeOpts.ip+':'+pqubeOpts.port);
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
    if (!PQubes.findOne(id)) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' PQube3');
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
    if (PQubes.findOne(id).defaultPQube) {
      var randomPQube = PQubes.findOne({_id: {$ne: id}});
      if (randomPQube)
	      PQubes.update(randomPQube._id, {$set: {defaultPQube: true}});
    }
    return PQubes.remove(id);
  },
  newOrg: function (orgOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (Orgs.findOne({name: orgOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errOrgNameExists')+': '+orgOpts.name);
    }
    return Orgs.insert(orgOpts);
  },
  editOrg: function (id, orgOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (!Orgs.findOne(id)) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' '+TAPi18n.__('organization'));
    }
    if (Orgs.findOne({name: orgOpts.name})) {
      throw new Meteor.Error('name', TAPi18n.__('errOrgNameExists')+': '+orgOpts.name);
    }
    return Orgs.update(id, {$set: orgOpts});
  },
  removeOrg: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInRemove')+' '+TAPi18n.__('organization'));
    }
    return Orgs.remove(id);
  }
});
