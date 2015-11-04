AccountsTemplates.configure({
  defaultTemplate: 'fullPageAtForm',
  defaultLayout: 'loginLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  continuousValidation: true,
  positiveValidation: true,
  negativeValidation: true,
  negativeFeedback: true,
  positiveFeedback: true,
  showValidating: true,
  texts: {
    errors: {
      loginForbidden: 'Incorrect email/password combo'
    }
  },
  homeRoutePath: '/manage',
  onLogoutHook: function () {
    FlowRouter.go('/');
  }
});
AccountsTemplates.addField({
  _id: 'accessCode',
  displayName: 'Access Code',
  placeholder: {
    signUp: 'Access Code'
  },
  type: 'password',
  required: true,
  continuousValidation:false,
  func: function(value) {
    if (Meteor.isClient) {
      var self = this;
      Meteor.call('checkAccess', value, function(err, accessDenied){
        if (err) {
          self.setError(err.reason);
        }
        else {
          if (accessDenied)
            self.setError(accessDenied);
          else
            self.setSuccess();
        }
        self.setValidating(false);
      });
      return;
    }
    return Meteor.call('checkAccess', value);
  },
  errStr: 'Incorrect value'
  });
AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('signUp');
