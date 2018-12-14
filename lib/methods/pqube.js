Meteor.methods({
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
    if (pqubeOpts.slug && PQubes.findOne({slug: pqubeOpts.slug})) {
      throw new Meteor.Error('slug', TAPi18n.__('errSlugExists')+': '+pqubeOpts.slug);
    }
    if (!hasPermission(pqubeOpts.org)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));
    }
    pqubeOpts.status = 'unknown';
    var pqubeMeters = {
      _id: pqubeOpts._id
    };
    var numPQubes = PQubes.find({org: pqubeOpts.org}).count();
    pqubeOpts.order = numPQubes+1;
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
    if (pqubeOpts.slug && PQubes.findOne({_id: {$ne: id}, slug: pqubeOpts.slug})) {
      throw new Meteor.Error('slug', TAPi18n.__('errSlugExists')+': '+pqubeOpts.slug);
    }
    if (pqube.host != pqubeOpts.host || pqube.port != pqubeOpts.port)
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
    PQubes.update(id, {$set: {metersChangedAt: new Date()}});
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
    Meters.remove(id);
    return PQubes.remove(id);
  }
});
