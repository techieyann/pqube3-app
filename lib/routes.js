FlowRouter.route('/', {
  name: 'index',
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
  triggersEnter: [function (context, redir) {
    if (Meteor.isClient) Session.set('spectraSelected', false);
  }],
  action: function () {
    BlazeLayout.render('dataLayout', {bottom: 'meters'}); 
  }
});
FlowRouter.route('/spectra', {
  name: 'spectra',
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
  action: function () {
    BlazeLayout.render('manageLayout', {main: 'managePQubes'});
  }
});

manageRoutes.route('/delete/:pqubeId', {
  name: 'editPQube',
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


FlowRouter.route('/manage/delete/:pqubeId', {
  name: 'editPQube',
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
