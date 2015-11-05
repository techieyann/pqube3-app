Meteor.methods({
  addNewPQube: function (pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to add PQube');
      return;
    }
    if (PQubes.findOne({name: pqubeOpts.name})) {
      throw new Meteor.Error('name', 'PQube already exists with name: '+pqubeOpts.name);
      return;
    }
    if (PQubes.findOne({ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', 'PQube already exists with IP: '+pqubeOpts.ip+':'+pqubeOpts.port);
      return;
    }
    return PQubes.insert(pqubeOpts);
  },
  editPQube: function (id, pqubeOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to modify PQube');
      return;
    }
    if (PQubes.findOne({_id: {$ne: id}, name: pqubeOpts.name})) {
      throw new Meteor.Error('name', 'PQube already exists with name: '+pqubeOpts.name);
      return;
    }    
    if (PQubes.findOne({_id: {$ne: id}, ip: pqubeOpts.ip, port: pqubeOpts.port})) {
      throw new Meteor.Error('ip', 'PQube already exists with IP: '+pqubeOpts.ip+':'+pqubeOpts.port);
      return;
    }
    return PQubes.update(id, {$set: pqubeOpts});
  },
  removePQube: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', 'Must be logged in to remove PQube');
      return;
    }
    return PQubes.remove(id);
  }
});
