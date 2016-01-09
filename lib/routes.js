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
    BlazeLayout.render('manageLayout', {main: 'manageHome'});
  }
});

var orgRoutes = manageRoutes.group({
  prefix: '/org',
  name: 'organization',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

var pqubeRoutes = manageRoutes.group({
  prefix: '/pqube3',
  name: 'pqube',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn
  ]
});

pqubeRoutes.route('/', {
  name: 'managePQube',
  pageTitle: 'PQube3s',
  action: function () {
    BlazeLayout.render('manageLayout', {main: 'managePQubes'});
  }
});

pqubeRoutes.route('/new', {
  name: 'newPQube',
  pageTitle: 'Add',
  action: function () {
    BlazeLayout.render('manageLayout', {
      main: 'managePQubes',
      modal: 'newPQube'
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
      modal: 'confirmDeletePQube'
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
      modal: 'editPQube'
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
      modal: 'metersPQube'
    });
    Meteor.setTimeout(function () {
      $('#modal').modal('show');
    }, 200);
  }
});
