var seed = Math.random() * 15283;
var t;
var num, vNum;
var radius, mySize, margin;
var sizes = [];

let colors = [];
let colors0 = "B7AB98-1ABC9C-B7AB98-1ABC9C".split("-").map((a) => "#" + a);
let colors7 = "B7AB98-B7AB98-1ABC9C-1ABC9C-B7AB98".split("-").map((a) => "#" + a);
let colors8 = "93C67D-92AA83-5f7367-1ABC9C-B7AB98-1ABC9C-B7AB98-1ABC9C-B7AB98-1ABC9C-B7AB98".split("-").map((a) => "#" + a);
let colors11 = "B7AB98-1ABD9C-B7AB98-1ABC9C-B7AB98".split("-").map((a) => "#" + a);

let speed = 0.03;
var color_setup1, color_setup2;
let color_bg;
let v_planet = [];
let angle = 3;
let centerX = 0;
let centerY = 0;
let sunRadius = 50;
let planets = [];
let torusRadius = 200;
let stars = [];


function setup() {
  randomSeed(seed);
  mySize = min(1000, 1000);
  margin = mySize / 200;
  createCanvas(1000, 1000, WEBGL);
  color_setup1 = colors7;
  color_setup2 = random([colors8]);
  color_bg = "#0D0D0D";
  background(color_bg);
  num = int(random(20, 10));
  radius = mySize * 0.85;
  for (let a = 0; a < TAU; a += TAU / num) {
    sizes.push(random(10, 100));
  }
  t = 0;

 
  // Define an array of random colors for the planets
  let planetColors = [];
  for (let i = 0; i < num; i++) {
    planetColors.push(color(random(255), random(255), random(255)));
  }


  // Create planets
  for (let i = 0; i < num; i++) {
    let planetRadius = random(20, 50);
    let distance = random(200, 400);
    let planetColor = planetColors[i]; // Assign a unique color
    planets.push({
      radius: planetRadius,
      distance: distance,
      angle: random(TAU),
      color: planetColor,
    });
  }

  // Generate random star positions
  for (let i = 0; i < 500; i++) {
    stars.push(createVector(random(-width, width), random(-height, height), random(-1000, 1000)))
  }

  var button = createButton("reset")
  button.mousePressed(refreshPage)
}



function refreshPage(){
  window.location.reload();
} 


function draw() {
  randomSeed(seed);
  background(color_bg);

  // Draw stars
  push();
  translate(-width / 2, -height / 2, 0);
  fill(255);
  noStroke();
  for (let star of stars) {
    ellipse(star.x, star.y, 2, 2);
  }
  pop();

noStroke();

  fill('#FFD306');
  noStroke();
  circle(0, 0, sunRadius);

  // the center of our rotation:
  translate(centerX, centerY);
  rotate(angle);
  circle(radius, 0, sunRadius);

  for (let i = 0; i < num; i++) {
    let a = (TAU / num) * i;
    let x = radius * sin(a + t) / random(5, 3) / 1.0;
    let y = radius * cos(a + t) / random(3, 5) / 1.0;
    v_planet[i] = createVector(x, y);
  }
  push();

  for (let q = 0; q < 1 / 5; q += 3 * random(0.01, 0.02)) {
    for (let j = 0; j < 1; j++) {
      let n = noise(q * t, j * t, frameCount * 0.01);
      rotateX(random(TAU) + sin(-t) / 12 + q);
      rotateY(random(TAU) + cos(t) / 20 + q);
      rotateZ(random(TAU) + sin(-t) / 17 + q);
      noStroke();
      fill(random(color_setup2));

      for (let i = 0; i < num; i += 4) {
        let d = random(radius / 2, radius / 4) / 1;
        push();
        rotateX(random(TAU) + sin(t));
        rotateY(random(TAU) + cos(-t) + n / 100);
        rotateZ(random(TAU) + 2 * sin(2 * t));

        let x_plus = 1.25 * random(-d, d) / 1;
        let y_plus = 1.25 * random(-d, d) / 1;
        let z_plus = 1.25 * random(-d, d) / 1;

        torus(z_plus, random(1), 100, 100);
        pop();
      }
      for (let i = 0; i < num; i += 4) {
        let d = (1.5 + sin(t)) * random(radius / 2, radius / 4);
        let x_plus = 0.5 * random(-d, d) / 1;
        let y_plus = 0.5 * random(-d, d) / 1;
        let z_plus = 0.5 * random(-d, d) / 1;
        stroke(random(color_setup2));
        strokeWeight(random(0.5));
        noFill();
        push();
        translate(v_planet[i].x + x_plus, v_planet[i].y + y_plus, z_plus);
        rotateX(random(TAU) + t);
        rotateY(random(-TAU) + t);
        rotateZ(random(PI) + t);
        sphere(random(2));
        pop();
      }
    }
  }
  pop();

  // Update and draw planets on the torus
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    let planetX = torusRadius * cos(planet.angle);
    let planetY = torusRadius * sin(planet.angle);
    let planetZ = 0; // Adjust the Z-coordinate if needed
    fill(planet.color);
    noStroke();
    push();
    translate(planetX, planetY, planetZ);
    sphere(planet.radius);
    pop();
    planet.angle += 0.01;
  }

  t += random(2, 1) * random(0.001, 0.005) / 1;
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("space", "png");
  }

}

