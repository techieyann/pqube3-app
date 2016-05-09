FlowRouter.triggers.enter([function (context, redir) {
  var pageTitle = context.route.options.pageTitle;
  if (pageTitle) {
    document.title = TAPi18n.__('title'+pageTitle);
  }
}]);

FlowRouter.route('/logout', {
  action: function () {
    AccountsTemplates.logout();
  }
});

FlowRouter.notFound = {
  action: function () {
    FlowRouter.go('/');
    sAlert.warning(Tapi18n.__('err404'));
  }
};

/*
*
*App Index display routes
*
*/
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

/*
*
*manage routes
*
*/

var manageRoutes = FlowRouter.group({
  prefix: '/manage',
  name: 'manage',
  breadcrumb: 'manage',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

manageRoutes.route('/', {
  name: 'management',
  pageTitle: 'Manage',
  action: function () { 

    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      navButtons: 'manageNavButtons'
    });
  }
});

manageRoutes.route('/meters', {
  name: 'manageMeters',
  pageTitle: 'ManageMeters',
  action: function () { 
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'metersMaster',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);    
  }
});

manageRoutes.route('/sort', {
  name: 'sortPQubesOrg',
  pageTitle: 'SortPQubesOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'sortPQubes',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

/*
*
*manage org routes
*
*/

var manageOrgRoutes = manageRoutes.group({
  prefix: '/org/:orgId',
  name: 'organization',
  breadcrumb: 'organization',
  triggersEnter: [function (context, redir) {
    var id = Meteor.userId();
    if (!Roles.userIsInRole(id, 'admin', Roles.GLOBAL_GROUP) && !Roles.userIsInRole(id, 'manage', context.params.orgId)) {
      redir('/manage');
    }
  }]
});

manageOrgRoutes.route('/delete', {
  name: 'deleteOrg',
  pageTitle: 'DeleteOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'confirmDeleteOrg',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

manageOrgRoutes.route('/edit', {
  name: 'editOrg',
  pageTitle: 'EditOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'editOrg',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

manageOrgRoutes.route('/code', {
  name: 'editCodeOrg',
  pageTitle: 'EditCodeOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'accessCode',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

/*
*
*manage org pqube3 routes
*
*/

var orgPQubeRoutes = manageRoutes.group({
  prefix: '/org/pqube3',
  name: 'orgPQube',
  breadcrumb: 'pqube3'
/*  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]*/
});

orgPQubeRoutes.route('/new', {
  name: 'newOrgPQube',
  pageTitle: 'Add',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'newPQube',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
      Meteor.setTimeout(function () {
	$('#new-pqube-name').focus();
      }, 200);
    }, 200);
  }
});

orgPQubeRoutes.route('/:pqubeId/delete', {
  name: 'deleteorgPQube',
  pageTitle: 'Delete',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'confirmDeletePQube',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

orgPQubeRoutes.route('/:pqubeId/edit', {
  name: 'editPQube',
  pageTitle: 'Edit',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'editPQube',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

orgPQubeRoutes.route('/:pqubeId/meters', {
  name: 'metersPQube',
  pageTitle: 'Meters',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageHome',
      modal: 'metersPQube',
      navButtons: 'manageNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});


/*
*
*admin other org routes
*
*/


var triggerEnsureAdmin = function (context, redir) {
  if (!isAdmin()) 
    redir('/manage');
};

var adminOrgRoutes = manageRoutes.group({
  prefix: '/admin',
  name: 'adminOrg',
  breadcrumb: 'organization',
  triggersEnter: [
//    AccountsTemplates.ensureSignedIn,
    triggerEnsureAdmin
  ]
});

adminOrgRoutes.route('/', {
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

adminOrgRoutes.route('/new', {
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

adminOrgRoutes.route('/:orgId', {
  name: 'manageOrg',
  pageTitle: 'Org',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      navButtons: 'orgNavButtons'
    });    
  }
});

adminOrgRoutes.route('/:orgId/delete', {
  name: 'deleteOrg1',
  pageTitle: 'DeleteOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'confirmDeleteOrg',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

adminOrgRoutes.route('/:orgId/edit', {
  name: 'editOrg1',
  pageTitle: 'EditOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'editOrg',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

adminOrgRoutes.route('/:orgId/code', {
  name: 'editCodeOrg1',
  pageTitle: 'EditCodeOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'accessCode',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

adminOrgRoutes.route('/:orgId/sort', {
  name: 'sortPQubesOrg1',
  pageTitle: 'SortPQubesOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'sortPQubes',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

adminOrgRoutes.route('/:orgId/new', {
  name: 'newOrg1',
  pageTitle: 'AddOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
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

/*
*
*admin other org's pqube3s routes
*
*/

var adminOrgPQubeRoutes = adminOrgRoutes.group({
  prefix: '/:orgId/pqube3',
  name: 'adminOrgPQube3',
  breadcrumb: 'pqube3'
});


adminOrgPQubeRoutes.route('/new', {
  name: 'newOrgPQube',
  pageTitle: 'Add',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'newPQube',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
      Meteor.setTimeout(function () {
	$('#new-pqube-name').focus();
      }, 200);
    }, 200);
  }
});

adminOrgPQubeRoutes.route('/:pqubeId/delete', {
  name: 'deleteOrgPQube',
  pageTitle: 'Delete',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'confirmDeletePQube',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');    
    }, 200);
  }
});

adminOrgPQubeRoutes.route('/:pqubeId/edit', {
  name: 'editOrgPQube',
  pageTitle: 'Edit',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'editPQube',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

adminOrgPQubeRoutes.route('/:pqubeId/meters', {
  name: 'metersOrgPQube',
  pageTitle: 'Meters',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'manageOrgPQubes',
      modal: 'metersPQube',
      navButtons: 'orgNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});

/*
*
*admin PSL's pqube3s routes
*
*/

var pqubeRoutes = manageRoutes.group({
  prefix: '/pqube3',
  name: 'pqube3',
  breadcrumb: 'pqube3'
/*  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]*/
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

pqubeRoutes.route('/sort', {
  name: 'sortPQubesOrg',
  pageTitle: 'SortPQubesOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'sortPQubes',
      navButtons: 'pqubeNavButtons'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
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


FlowRouter.route('/:orgSlug', {
  name: 'orgIndex',
  pageTitle: 'Index',
  triggersEnter: [
    function (context, redir) {
      if (Meteor.isClient) Session.set('metersSelected', true);
    }
  ],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'meters'}); 
  }
});

FlowRouter.route('/:orgSlug/access', {
  name: 'orgAccess',
  pageTitle: 'AccessOrg',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'accessOrg'
    }); 
  }
});
