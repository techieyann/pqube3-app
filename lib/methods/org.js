Meteor.methods({
  newOrg: function (orgOpts) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (!isAdmin()) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (Orgs.findOne({name: orgOpts.name}) || orgOpts.name == 'PSL') {
      throw new Meteor.Error('name', TAPi18n.__('errOrgNameExists')+': '+orgOpts.name);
    }

    orgOpts.slug = slugify(orgOpts.slug);
    if (Orgs.findOne({slug: orgOpts.slug}) || orgOpts.slug == 'manage') {
      throw new Meteor.Error('slug', TAPi18n.__('errOrgSlugExists')+': '+orgOpts.slug);
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
    if (!hasPermission(id)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (Orgs.findOne({_id: {$ne: id}, name: orgOpts.name}) || orgOpts.name == 'PSL') {
      throw new Meteor.Error('name', TAPi18n.__('errOrgNameExists')+': '+orgOpts.name);
    }
    orgOpts.slug = slugify(orgOpts.slug);
    if (Orgs.findOne({_id: {$ne: id}, slug: orgOpts.slug}) || orgOpts.slug == 'manage') {
      throw new Meteor.Error('slug', TAPi18n.__('errOrgSlugExists')+': '+orgOpts.slug);
    }
    return Orgs.update(id, {$set: orgOpts});
  },
  changeOrgCode: function (id, codes) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInAdd'));
    }
    if (!Orgs.findOne(id)) {
      throw new Meteor.Error('unknownId', TAPi18n.__('errUnknown')+' '+TAPi18n.__('organization'));
    }
    if (!hasPermission(id)) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));      
    }
    if (!isAdmin()) {
      if (!Orgs.findOne({_id: id, code: codes.original})) {
        throw new Meteor.Error('original', TAPi18n.__('errWrongCode')+' '+TAPi18n.__('organization'));
      }
    }
    var newCode = {
      accessCode: codes.updated
    };
    return Orgs.update(id, {$set: newCode});
  },
  removeOrg: function (id) {
    if (!Meteor.user()) {
      throw new Meteor.Error('loggedout', TAPi18n.__('errLoggedInRemove')+' '+TAPi18n.__('organization'));
    }
    if (!isAdmin()) {
      throw new Meteor.Error('403', TAPi18n.__('errNotPermitted'));
    }
    var users = Roles.getUsersInRole('manage', id).fetch();
    Roles.removeUsersFromRoles(users, 'manage', id);
    if (Meteor.isServer) {
      users.forEach(function (user) {
        Meteor.users.update(user._id, {$set: {'profile.initialized': false}});      
      });
    }
    PQubes.remove({org: id});
    return Orgs.remove(id);
  }
});
