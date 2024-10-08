var canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Class for walls
class Walls {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
  build() {
    // Draw the image for walls
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const bullets = [];
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const img = new Image();
const hero = new Image();
hero.src = "../images/Idle.png";
img.src = "../images/wall.jpg";

img.onload = () => {
  map.forEach((row, i) => {
    row.forEach((indi, j) => {
      if (indi == 1) {
        new Walls({ position: { x: 400 + 40 * j, y: 50 + 40 * i }, image: img }).build();
      }
    });
  });
};

// Class for player
class Player {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.f = 0;
    this.c = 0;
  }

  build() {
    c.drawImage(this.image, 40 + 128 * (this.f % 6), 62, 55, 65, this.position.x, this.position.y, 40, 50);
    this.c += 1;
    if (this.c % 5 === 0) {
      this.f += 1;
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (boundary_check(this)) {
      this.position.x -= this.velocity.x;
      this.position.y -= this.velocity.y;
    }
  }
}

const p = new Player({ position: { x: 460, y: 110 }, velocity: { x: 0, y: 0 }, image: hero });
p.build();

let speed = 3;

// Keydown events for movement
addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "d") {
    p.velocity.x = speed;
    hero.src = "../images/Run.png";
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    p.velocity.x = -speed;
    hero.src = "../images/Run.png";
  } else if (event.key === "ArrowUp" || event.key === "w") {
    p.velocity.y = -speed;
    hero.src = "../images/Run.png";
  } else if (event.key === "ArrowDown" || event.key === "s") {
    p.velocity.y = speed;
    hero.src = "../images/Run.png";
  }
});

function move() {
  // Move bullets and check for collision
  bullets.forEach((bullet, index) => {
    let bulletRemoved = false;
    
    for (let i = 0; i < map.length && !bulletRemoved; i++) {
      for (let j = 0; j < map[i].length && !bulletRemoved; j++) {
        if (map[i][j] === 1) {
          const wallX = 400 + 40 * j;
          const wallY = 50 + 40 * i;
          const wallWidth = 40;
          const wallHeight = 40;

          // Check bullet collision with the wall
          if (
            bullet.position.x <= wallX + wallWidth &&
            bullet.position.x + 10 >= wallX &&
            bullet.position.y <= wallY + wallHeight &&
            bullet.position.y + 10 >= wallY
          ) {
            // Bullet hits the wall, so remove it from the array
            c.clearRect(bullet.position.x, bullet.position.y, 10, 10);
            bullets.splice(index, 1);
            bulletRemoved = true;
          }
        }
      }
    }

    // If the bullet hasn't been removed, update its position and draw it
    if (!bulletRemoved) {
      c.clearRect(bullet.position.x, bullet.position.y, 10, 10); // Clear old bullet position
      bullet.update();
      bullet.build();
    }
  });

  // Handle player movement
  c.clearRect(p.position.x, p.position.y, 40, 50);
  p.update();
  p.build();

  requestAnimationFrame(move);
}

move();

// Keyup events to stop movement
addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight" || event.key === "d") {
    p.velocity.x = 0;
    hero.src = "../images/Idle.png";
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    p.velocity.x = 0;
    hero.src = "../images/Idle.png";
  } else if (event.key === "ArrowUp" || event.key === "w") {
    p.velocity.y = 0;
    hero.src = "../images/Idle.png";
  } else if (event.key === "ArrowDown" || event.key === "s") {
    p.velocity.y = 0;
    hero.src = "../images/Idle.png";
  }
});

// Boundary check function
function boundary_check(p) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        const wallX = 400 + 40 * j;
        const wallY = 50 + 40 * i;
        const wallWidth = 40;
        const wallHeight = 40;

        if (
          p.position.x < wallX + wallWidth &&
          p.position.x + 40 > wallX &&
          p.position.y < wallY + wallHeight &&
          p.position.y + 50 > wallY
        ) {
          return true; // Collision detected
        }
      }
    }
  }
  return false;
}

// Class for bullets
class Bullet {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
  }

  build() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.position.x += this.velocity.x;
  }
}

const bullimg = new Image();
bullimg.src = "images/bullet.png";

// Shooting event listener
addEventListener("keydown", (event) => {
  if (event.key === " ") {
    bullets.push(new Bullet({
      position: { x: p.position.x + 40, y: p.position.y + 30 },
      velocity: { x: 4 },
      image: bullimg,
    }));
  }
});
