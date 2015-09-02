Template.newData.helpers({
  hidden: function(light) {
    console.log(light);
    console.log(Session.get('light_on'));
    if (light == 'on' && !Session.get('light_on')) return 'hidden';
    if (light == 'off' && Session.get('light_on')) return 'hidden';
    return '';
  },
  lightStatus: function () {
    return (Session.equals('light_on', true) ? 'on':'off');
  }
});
