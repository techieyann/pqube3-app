Template.newData.helpers({
  hidden: function(light) {
    if (light == 'on' && Session.get('light_on')) return 'hidden';
    if (light == 'off' && !Session.get('light_on')) return 'hidden';
    return '';
  },
  lightStatus: function () {
    return (Session.equals('light_on', true) ? 'on':'off');
  }
});
