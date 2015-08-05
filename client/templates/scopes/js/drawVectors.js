drawVectors = function (vectType, vectors) {
  var scale = Session.get(vectType+'ScopeScale');
  var ctx = $('#'+vectType+'-vectors').get(0).getContext('2d');
  var radius = 40;
  ctx.clearRect(0,0,80,80);
  var colors = {
    l1: 'red',
    l2:'yellow',
    l3: '#0066FF'
  };
  var normalize = Session.get('vectorNormalize');
  for (var key in vectors) {
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((Math.PI/180)*(-(vectors[key].angle-normalize)));
    ctx.translate(-radius, -radius);

    var magnitude = vectors[key].magnitude;
    var length = (magnitude / (scale*6)) * radius * 1.414;
    ctx.beginPath();
    ctx.fillStyle = colors[key];
    ctx.moveTo(radius,radius);
    ctx.lineTo(radius,radius+1);
    ctx.lineTo(radius+length-6,radius+1);
    ctx.lineTo(radius+length-6, radius+4);
    ctx.lineTo(radius+length-3, radius+1);
    ctx.lineTo(radius+length, radius);
    ctx.lineTo(radius+length-3, radius-1);
    ctx.lineTo(radius+length-6, radius-4);
    ctx.lineTo(radius+length-6,radius-1);
    ctx.lineTo(radius+length, radius-1);
    ctx.lineTo(radius, radius-1);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
};
