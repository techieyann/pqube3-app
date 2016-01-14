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

AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('signUp');
