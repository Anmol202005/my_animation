var canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Walls {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
  build() {
    
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


class Player {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.f = 0;
    this.c = 0;
    
  }

  build() {
    c.drawImage(this.image, 40 + 128 * (this.f % 4), 62, 55, 65, this.position.x, this.position.y, 40, 50);
    this.c += 1;
    if (this.c % 5 === 0) {
      this.f += 1;
    }this.k=this.k*2;
  
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
  death();
  victory();
  bullets.forEach((bullet, index) => {
    let bulletRemoved = false;
    
    for (let i = 0; i < map.length && !bulletRemoved; i++) {
      for (let j = 0; j < map[i].length && !bulletRemoved; j++) {
        if (map[i][j] === 1) {
          const wallX = 400 + 40 * j;
          const wallY = 50 + 40 * i;
          const wallWidth = 40;
          const wallHeight = 40;

          
          if (
            bullet.position.x <= wallX + wallWidth &&
            bullet.position.x + 10 >= wallX &&
            bullet.position.y <= wallY + wallHeight &&
            bullet.position.y + 10 >= wallY
          ) {
            
            c.clearRect(bullet.position.x, bullet.position.y, 10, 10);
            bullets.splice(index, 1);
            bulletRemoved = true;
          }
        }
      }
    }

    
    if (!bulletRemoved) {
      c.clearRect(bullet.position.x, bullet.position.y, 10, 10); 
      bullet.update();
      bullet.build();
    }
  });
  vill.forEach((villain)=>{villain.bullets.forEach((bullet, index) => {
    let bulletRemoved = false;

    for (let i = 0; i < map.length && !bulletRemoved; i++) {
      for (let j = 0; j < map[i].length  && !bulletRemoved; j++) {
        if (map[i][j] === 1) {
          const wallX = 400 + 40 * j;
          const wallY = 50 + 40 * i;
          const wallWidth = 40;
          const wallHeight = 40;

          
          if (
            bullet.position.x <= wallX + wallWidth &&
            bullet.position.x + 10 >= wallX &&
            bullet.position.y <= wallY + wallHeight &&
            bullet.position.y + 10 >= wallY
          ) {
            c.clearRect(bullet.position.x, bullet.position.y, 10, 10);
            villain.bullets.splice(index, 1); 
            bulletRemoved = true;
          }
        }
      }
    }

    
    if (!bulletRemoved) {
      c.clearRect(bullet.position.x, bullet.position.y, 10, 10);
      bullet.update();
      bullet.build();
    }
  });})


  
  if (p.position.x !== -1000 && p.position.y !== -1000) { 
    c.clearRect(p.position.x, p.position.y, 40, 50);
    p.update();
    p.build();
  }

  vill.forEach((villain)=>{
  if (villain.position.x !== -1000 && villain.position.y !== -1000) { 
    c.clearRect(villain.position.x, villain.position.y, 40, 50);
    villain.update();
    villain.build();
  }})

  requestAnimationFrame(move);
}




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
          return true; 
        }
      }
    }
  }
  return false;
}


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
    this.position.y += this.velocity.y;
  }
}

const bullimg = new Image();
bullimg.src = "images/bullet.png";



addEventListener("keydown", (event) => {
  if (event.key === " ") {hero.src = "../images/Shot_2.png";
    bullets.push(new Bullet({
      position: { x: p.position.x + 40, y: p.position.y + 15 },
      velocity: { x: 4 ,y:0},
      image: bullimg
      
    }));
  }
});
addEventListener("keyup",(event)=>{
  if (event.key === " ") {hero.src = "../images/Idle.png";}
    
})
const villbull = new Image();
villbull.src="../images/fire.png";
class Villain {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.velocity = velocity;
    this.image = image;
    this.bullets = [];
    this.shootInterval = null;
    this.f = 0;
    this.c = 0;
  }
  build() {
    c.drawImage(this.image,30+128*(13-this.f%14),15,60,110, this.position.x, this.position.y, 40, 50);
    this.c += 1;
    if (this.c % 10 === 0) {
      this.f += 1;
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.build();
  }

  shootAtHero(hero) {
    const dx = hero.position.x - this.position.x;
    const dy = hero.position.y - this.position.y;
    const angle = Math.atan2(dy, dx);

    
    this.bullets.push(new Bullet({
      position: { x: this.position.x, y: this.position.y+20 },
      velocity: { x: Math.cos(angle) * 4, y: Math.sin(angle) * 4 },
      image: villbull
    }));
  }
  startShooting(hero) {
    this.shootInterval = setInterval(() => {
      this.shootAtHero(hero);
    }, 1000); 
  }
  stopShooting() {
    clearInterval(this.shootInterval);
  }
}
const villainImage = new Image();
villainImage.src = "../images/villain.png";
const villain1 = new Villain({
  position: { x: 880 - 100, y: 105 }, 
  velocity: { x: 0, y: 0 }, 
  image: villainImage
});
const villain2=new Villain({position: { x: 880 - 100, y: 215 }, 
  velocity: { x: 0, y: 0 }, 
  image: villainImage
});
const villain3=new Villain({position: { x: 880 - 100, y: 405 }, 
  velocity: { x: 0, y: 0 }, 
  image: villainImage
});
const vill=[villain1,villain2,villain3];
move();
villainImage.onload = () => {
  vill.forEach((villain)=>{villain.startShooting(p);});
   
};

function victory() {
  vill.forEach((villain)=>{
  bullets.forEach((bullet, index) => {
    if (
      bullet.position.x < villain.position.x + 40 && 
      bullet.position.x + 10 > villain.position.x && 
      bullet.position.y < villain.position.y + 50 && 
      bullet.position.y + 10 > villain.position.y 
    ) {
      
      
      bullets.splice(index, 1); 
      c.clearRect(villain.position.x-10,villain.position.y,50,50);
      villain.stopShooting();
      villain.position = { x: -1000, y: -1000 }; 
      
    }
  });})
}


function death() {vill.forEach((villain)=>{
  villain.bullets.forEach((bullet, index) => {
    if (
      bullet.position.x < p.position.x + 40 && 
      bullet.position.x + 10 > p.position.x && 
      bullet.position.y < p.position.y + 50 && 
      bullet.position.y + 10 > p.position.y 
    ) {
      
      
      
      hero.src="../images/Dead.png";
      
      c.clearRect(p.position.x,p.position.y,40,50);
      p.position = { x: -1000, y: -1000 };
      villain.stopShooting();
      villain.bullets.splice(index, 1); 
      
    }
  });})
}
