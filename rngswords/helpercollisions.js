

//extra helper collisions


// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // is either end INSIDE the circle?
  // if so, return true immediately
  inside1 = pointCircle(x1,y1, cx,cy,r);
  inside2 = pointCircle(x2,y2, cx,cy,r);
  if (inside1 || inside2) return true;

  // get length of the line
  distX = x1 - x2;
  distY = y1 - y2;
  len = sqrt( (distX*distX) + (distY*distY) );

  // get dot product of the line and circle
  dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / pow(len,2);

  // find the closest point on the line
  closestX = x1 + (dot * (x2-x1));
  closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) return false;

  // optionally, draw a circle at the closest point
  // on the line
  // fill(255,0,0);
  // noStroke();
  // ellipse(closestX, closestY, 20, 20);

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  distance = sqrt( (distX*distX) + (distY*distY) );

  // is the circle on the line?
  if (distance <= r) {
    return true;
  }
  return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  d1 = dist(px,py, x1,y1);
  d2 = dist(px,py, x2,y2);

  // get the length of the line
  lineLen = dist(x1,y1, x2,y2);

  // since  are so minutely accurate, add
  // a little buffer zone that will give collision
  buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range, rather
  // than one #
  if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {
  
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  distX = px - cx;
  distY = py - cy;
  distance = sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the circle's 
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}


// POLYGON/POINT
// only needed if you're going to check if the circle
// is INSIDE the polygon
function polygonPoint(vertices, px, py) {
  collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  next = 0;
  for (current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the  at our current position
    // this makes our if statement a little cleaner
    vc = vertices[current];    // c for "current"
    vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}




// LINE/RECTANGLE
function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {

  // check if the line has hit any of the rectangle's sides
  // uses the Line/Line function below
  rectLeft =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
  rectRight =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
  rectTop =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
  rectBottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  // if ANY of the above are true,
  // the line has hit the rectangle
  if (rectLeft || rectRight || rectTop || rectBottom) {
    return true;
  }
  return false;
}


// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

  // calculate the direction of the lines
  uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

// POLYGON/LINE
function polyLine(vertices, x1, y1, x2, y2) {

  // go through each of the vertices, plus the next
  // vertex in the list
  next = 0;
  for (current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // extract X/Y coordinates from each
    x3 = vertices[current].x;
    y3 = vertices[current].y;
    x4 = vertices[next].x;
    y4 = vertices[next].y;

    // do a Line/Line comparison
    // if true, return 'true' immediately and
    // stop testing (faster)
    hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
    if (hit) {
      return true;
    }
  }

  // never got a hit
  return false;
}

function polyPoint(vertices, px, py) {
  collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  next = 0;
  for (current=0; current<vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current+1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    vc = vertices[current];    // c for "current"
    vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
         (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
            collision = !collision;
    }
  }
  return collision;
}