FlowRouter.triggers.enter([function (context, redir) {
  var pageTitle = context.route.options.pageTitle;
  if (pageTitle) {
    document.title = TAPi18n.__('title'+pageTitle);
  }
}]);

FlowRouter.route('/', {
  name: 'index',
  pageTitle: 'Index',
  triggersEnter: [function (context, redir) {
    if (Meteor.isClient) Session.set('spectraSelected', false);
  }],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'meters'}); 
  }
});
FlowRouter.route('/logout', {
  action: function () {
    AccountsTemplates.logout();
  }
});
FlowRouter.route('/meters', {
  name: 'meters',
  pageTitle: 'Index',
  triggersEnter: [function (context, redir) {
    if (Meteor.isClient) Session.set('spectraSelected', false);
  }],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'meters'}); 
  }
});
FlowRouter.route('/spectra', {
  name: 'spectra',
  pageTitle: 'Index',
  triggersEnter: [function (context, redir) {
    if (Meteor.isClient) Session.set('spectraSelected', true);
  }],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'spectra'}); 
  }
});

FlowRouter.route('/initialize', {
  name: 'userInit',
  pageTitle: 'UserInit',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ],
  action: function () {
    
    BlazeLayout.render('manageLayout', {
      main: 'initUser'
    });
  
  }
});

var manageRoutes = FlowRouter.group({
  prefix: '/manage',
  name: 'manage',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

manageRoutes.route('/', {
  name: 'management',
  pageTitle: 'Manage',
  action: function () {
    var userId = Meteor.userId();
    if (Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)) {
      BlazeLayout.render('manageLayout', {
        main: 'manageHome'
      });
    }
    else {
      BlazeLayout.render('manageLayout', {
        main: 'manageOrgPQubes',
        navButtons: 'pqubeNavButtons'
      });      
    }
  }
});

var orgRoutes = manageRoutes.group({
  prefix: '/org',
  name: 'organization',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

orgRoutes.route('/', {
  name: 'selectOrg',
  pageTitle: 'SelectOrg',
  triggersEnter: [function(context, redir) {
    if (false) { //not admin
      var orgId;
      redir('/manage/'+orgId);
    }
  }],
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'selectOrg',
      navButtons: 'orgNavButtons'
    });
  }
});

orgRoutes.route('/new', {
  name: 'newOrg',
  pageTitle: 'AddOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'adminOrgs',
      modal: 'newOrg',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
      Meteor.setTimeout(function () {
        $('#new-org-name').focus();
      }, 200);
    }, 200);
  }
});

orgRoutes.route('/:orgId', {
  name: 'manageOrg',
  pageTitle: 'Org',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      navButtons: 'orgNavButtons'
    });    
  }
});

orgRoutes.route('/:orgId/delete', {
  name: 'deleteOrg',
  pageTitle: 'DeleteOrg',
  action: function () {
    var nav;
    if (true) { //admin
      nav = 'orgNavButtons';
    }
    BlazeLayout.render('manageLayout', {
      main: 'statusOrg',
      modal: 'confirmDeleteOrg',
      navButtons: nav
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

orgRoutes.route('/:orgId/edit', {
  name: 'editOrg',
  pageTitle: 'EditOrg',
  action: function () {
    var nav;
    if (true) { //admin
      nav = 'orgNavButtons';
    }
    BlazeLayout.render('manageLayout', {
      main: 'statusOrg',
      modal: 'editOrg',
      navButtons: nav
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

orgRoutes.route('/:orgId/code', {
  name: 'editCodeOrg',
  pageTitle: 'EditCodeOrg',
  action: function () {
    var nav;
    if (true) { //admin
      nav = 'orgNavButtons';
    }
    BlazeLayout.render('manageLayout', {
      main: 'statusOrg',
      modal: 'accessCode',
      navButtons: nav
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

var pqubeRoutes = manageRoutes.group({
  prefix: '/pqube3',
  name: 'pqube3',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

pqubeRoutes.route('/', {
  name: 'managePQube',
  pageTitle: 'PQube3s',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      navButtons: 'pqubeNavButtons'
    });
  }
});

pqubeRoutes.route('/new', {
  name: 'newPQube',
  pageTitle: 'Add',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'newPQube',
      navButtons: 'pqubeNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
      Meteor.setTimeout(function () {
	$('#new-pqube-name').focus();
      }, 200);
    }, 200);
  }
});

pqubeRoutes.route('/:pqubeId/delete', {
  name: 'deletePQube',
  pageTitle: 'Delete',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'confirmDeletePQube',
      navButtons: 'pqubeNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

pqubeRoutes.route('/:pqubeId/edit', {
  name: 'editPQube',
  pageTitle: 'Edit',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'editPQube',
      navButtons: 'pqubeNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

pqubeRoutes.route('/:pqubeId/meters', {
  name: 'metersPQube',
  pageTitle: 'Meters',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'metersPQube',
      navButtons: 'pqubeNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});
