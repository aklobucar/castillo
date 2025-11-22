// Nature + Love + Rain Generative Art
// by America Castillo  

let hearts = [];
let leaves = [];
let raindrops = [];
let rainSound;

function preload() {
  soundFormats('mp3');
  rainSound = loadSound('rain.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER);
  textSize(18);
  fill(255, 200);

  // initialize objects
  for (let i = 0; i < 25; i++) {
    hearts.push(new Heart(random(width), random(height)));
    leaves.push(new Leaf(random(width), random(height)));
  }
  for (let i = 0; i < 150; i++) {
    raindrops.push(new Raindrop(random(width), random(-height, height)));
  }
}

function mousePressed() {
  userStartAudio();
  rainSound.loop();
  rainSound.setVolume(0.4);
}

function draw() {
  background(40, 60, 70, 25); // soft transparency for trail effect

  // Gentle rain
  for (let drop of raindrops) {
    drop.move();
    drop.display();
  }

  // Floating leaves
  for (let leaf of leaves) {
    leaf.move();
    leaf.display();
  }

  // Floating hearts
  for (let heart of hearts) {
    heart.move();
    heart.display();
  }

  // Gentle text overlay
  fill(255, 180);
  text("Nature breathes love into motion", width / 2, height - 60);
  text("Click to play: Light Rain & Morning Birds 🌧️", width / 2, height - 35);
}

// --- Heart Class ---
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 30);
    this.speed = random(0.2, 1);
    this.offset = random(TWO_PI);
  }

  move() {
    this.y -= this.speed;
    this.x += sin(frameCount * 0.02 + this.offset) * 0.5;
    if (this.y < -20) {
      this.y = height + 20;
      this.x = random(width);
    }
  }

  display() {
    fill(255, 100, 150, 150);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.x - this.size,
      this.y + this.size / 3,
      this.x,
      this.y + this.size
    );
    bezierVertex(
      this.x + this.size,
      this.y + this.size / 3,
      this.x + this.size / 2,
      this.y - this.size / 2,
      this.x,
      this.y
    );
    endShape(CLOSE);
  }
}

// --- Leaf Class ---
class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 25);
    this.speed = random(0.3, 1);
    this.offset = random(TWO_PI);
    this.c = color(random(60, 120), random(160, 220), random(60, 120), 160);
  }

  move() {
    this.y += this.speed * 0.5;
    this.x += cos(frameCount * 0.01 + this.offset) * 0.5;
    if (this.y > height + 20) {
      this.y = -20;
      this.x = random(width);
    }
  }

  display() {
    fill(this.c);
    ellipse(this.x, this.y, this.size, this.size / 2);
  }
}

// --- Raindrop Class ---
class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.len = random(10, 20);
    this.speed = random(3, 6);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }

  display() {
    stroke(180, 200, 255, 180);
    strokeWeight(1.5);
    line(this.x, this.y, this.x, this.y + this.len);
    noStroke();
  }
}
