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

FlowRouter.route('/manage', {
  name: 'manage',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function () {
    BlazeLayout.render('manageLayout', {main: 'managePQubes'});
  }
});

FlowRouter.route('/manage/:pqubeId', {
  name: 'editPQube',
  action: function () {
    BlazeLayout.render('manageLayout', {main: 'editPQube'});
  }
});
