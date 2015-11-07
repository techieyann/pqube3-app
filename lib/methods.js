Meteor.methods({
  defaultizePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to make PQube default');
    }
    PQubes.update({defaultPQube: true}, {$set: {defaultPQube: false}});
    return PQubes.update(id, {$set: {defaultPQube: true}});
  },
  addNewPQube: function (pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to add PQube');
    }
    if (PQubes.findOne({name: pqubeOpts.name})) {
      throw new Meteor.Error('name', 'PQube already exists with name: '+pqubeOpts.name);
    }
    if (PQubes.findOne({ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', 'PQube already exists with IP: '+pqubeOpts.ip+':'+pqubeOpts.port);
    }
    pqubeOpts.status = 'unverified';
    return PQubes.insert(pqubeOpts);
  },
  editPQube: function (id, pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to modify PQube');
    }
    var pqube = PQubes.findOne(id);
    if (!pqube) {
      throw new Meteor.Error('unknownId', 'Could not find referenced PQube');
    }
    if (PQubes.findOne({_id: {$ne: id}, name: pqubeOpts.name})) {
      throw new Meteor.Error('name', 'PQube already exists with name: '+pqubeOpts.name);
    }    
    if (PQubes.findOne({_id: {$ne: id}, ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', 'PQube already exists with IP: '+pqubeOpts.ip+':'+pqubeOpts.port);
    }
    if (pqube.ip != pqubeOpts.ip || pqube.port != pqubeOpts.port)
    {
	pqubeOpts.status = 'unverified';
    }
    return PQubes.update(id, {$set: pqubeOpts});
  },
  removePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to remove PQube');
    }
    if (PQubes.findOne(id).defaultPQube) {
      var randomPQube = PQubes.findOne({_id: {$ne: id}});
      if (randomPQube)
	PQubes.update(randomPQube._id, {$set: {defaultPQube: true}});
    }
    return PQubes.remove(id);
  }
});
