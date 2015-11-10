FlowRouter.triggers.enter([function (context, redir) {
  var pageTitle = context.route.options.pageTitle;
  if (pageTitle) {
    document.title = pageTitle;
  }
  console.log(context);
}]);

FlowRouter.route('/', {
  name: 'index',
  pageTitle: 'PQube3 Modbus App',
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
  pageTitle: 'PQube3 Modbus App',
  triggersEnter: [function (context, redir) {
    if (Meteor.isClient) Session.set('spectraSelected', false);
  }],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'meters'}); 
  }
});
FlowRouter.route('/spectra', {
  name: 'spectra',
  pageTitle: 'PQube3 Modbus App',
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
  name: 'managePQube',
  pageTitle: 'PQube3 Modbus Control',
  action: function () {
    BlazeLayout.render('manageLayout', {main: 'managePQubes'});
  }
});

manageRoutes.route('/new', {
  name: 'newPQube',
  pageTitle: 'Add new PQube3',
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

manageRoutes.route('/delete/:pqubeId', {
  name: 'deletePQube',
  pageTitle: 'Delete PQube3?',
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

manageRoutes.route('/edit/:pqubeId', {
  name: 'editPQube',
  pageTitle: 'Edit PQube3...',
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

