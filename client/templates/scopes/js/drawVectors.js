drawVectors = function (vectType, vectors) {
  var scale = Session.get(vectType+'ScopeScale');
  var ctx = $('#'+vectType+'-vectors').get(0).getContext('2d');

  var radius = 40;
  ctx.clearRect(0,0,80,80);
  var colors = {
    l1: 'red',
    l2:'yellow',
    l3: 'blue'
  };
  var normalize;
  for (var key in vectors) {
    if (key == 'l1') normalize = vectors[key].angle;
    var path = arrowPath(vectors[key].magnitude, scale, radius);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((Math.PI/180)*(-(vectors[key].angle-normalize)));
    ctx.translate(-radius, -radius);
    ctx.fillStyle = colors[key];
    ctx.fill(path);
    ctx.restore();
  }
};

var arrowPath = function (magnitude, scale, radius) {
  var length = (magnitude / scale) * (radius/4);
  var path = new Path2D();
  path.moveTo(radius,radius);
  path.lineTo(radius,radius+1);
  path.lineTo(radius+length-8,radius+1);
  path.lineTo(radius+length-8, radius+4);
  path.lineTo(radius+length-6, radius+1);
  path.lineTo(radius+length, radius);
  path.lineTo(radius+length-6, radius-1);
  path.lineTo(radius+length-8, radius-4);
  path.lineTo(radius+length-8,radius-1);
  path.lineTo(radius+length, radius-1);
  path.lineTo(radius, radius-1);
  path.lineTo(radius, radius);
  return path;
};
