Template.manageBreadcrumbs.onRendered(function () {
  if (window.innerWidth < 768) {
    $('.nav a').on('click', function () {
      $('.navbar-toggle').click();
    });
  }
});
Template.manageBreadcrumbs.helpers({
  superGroup: function () {
    FlowRouter.watchPathChange();
    var group = FlowRouter.current().route.group;
    var superGroups = [];
    if (group) {
      var parentGroup = group.parent;
      while(parentGroup) {
        superGroups.unshift({
	        title: parentGroup.options.breadcrumb,
	        relURL: parentGroup.prefix
        });
        parentGroup = parentGroup.parent;
      }
    }
    return superGroups;
  },
  activePage: function () {
    FlowRouter.watchPathChange();
    var group = FlowRouter.current().route.group;
    return (group ? group.options.breadcrumb : '');
  }
});
