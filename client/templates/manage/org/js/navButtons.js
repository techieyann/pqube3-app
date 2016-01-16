Template.orgNavButtons.onRendered(function () {
  if (window.innerWidth < 768) {
    $('.nav a').on('click', function () {
      $('.navbar-toggle').click();
    });
  }
});
