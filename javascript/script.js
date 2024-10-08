var canvas = document.querySelector("canvas");
c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
class Walls{
constructor({position,image}){
  this.position=position;
  this.image=image;
}
build(){/*c.fillStyle="Black";
  c.fillRect(this.position.x,this.position.y,40,40);*/
  c.drawImage(this.image,this.position.x,this.position.y)

}}
const map=[[1,1,1,1,1,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,0,0,1],
           [1,0,0,0,0,0,0,0,0,0,0,1],
           [1,0,0,1,1,1,0,0,0,0,0,1],
           [1,0,0,0,0,1,0,0,0,0,0,1],
           [1,0,0,0,0,0,0,0,0,0,0,1],
           [1,0,0,0,0,0,0,0,1,0,0,1],
           [1,0,0,0,0,0,0,0,1,1,0,1],
           [1,0,0,0,1,1,1,0,0,0,0,1],
           [1,0,0,0,0,0,0,0,0,0,0,1],
           [1,1,1,1,1,1,1,1,1,1,1,1],]
 const img   = new Image();
 const hero = new Image();
 hero.src="../images/Idle.png";
 img.src="../images/wall.jpg" ; 
 img.onload = () =>{   
 map.forEach((row,i)=>{
  row.forEach((indi,j)=>{if(indi==1){
    new Walls({position:{x:400+40*j,y:50+40*i},image:img}).build();
  }})
 })   }       
 class Player{
  constructor({position,velocity,image}){
    this.position=position;
    this.velocity=velocity;
    this.image=image;
    this.f=0;
    this.c=0;
  }
  build(){
    // c.beginPath();
    // c.fillStyle="red";
    // c.arc(this.position.x,this.position.y,10,0,Math.PI*2);
    // c.fill();
    
    c.drawImage(this.image,40+128*(this.f%6),62,55,65,this.position.x,this.position.y,40,50);
    
    this.c=this.c+1;
    if(this.c%5==0){
    this.f=this.f+1;}
    
  }
  update(){
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
    if(boundary_check(this)==true){
      this.position.x-=this.velocity.x;
      this.position.y-=this.velocity.y;
     }
  }
 }
 const p=new Player({position:{x:460,y:110},velocity:{x:0,y:0},image:hero});
 
  p.build();


 var speed=3;
 addEventListener("keydown",(event)=>{if(event.key=="ArrowRight" || event.key=="d"){
  
  p.velocity.x=speed;
  hero.src="../images/Run.png";

  
  

  }
 else if(event.key=="ArrowLeft" || event.key=="a"){
  
  p.velocity.x=-speed;
  hero.src="../images/Run.png"
  
 }
 else if(event.key=="ArrowUp" || event.key=="w"){
  
  p.velocity.y=-speed;
  hero.src="../images/Run.png"
 }
 else if(event.key=="ArrowDown" || event.key=="s"){
  
  p.velocity.y=speed;
  hero.src="../images/Run.png"
 }});
 function move(){
  
  if(boundary_check(p)!==true){
  c.clearRect(p.position.x,p.position.y,40,50);
  p.update();
  p.build();}
  requestAnimationFrame(move);
}
move();
addEventListener("keyup",(event)=>{
  if(event.key=="ArrowRight" || event.key=="d"){
    p.velocity.x=0;
    hero.src="../images/Idle.png"
    
  
    }
   else if(event.key=="ArrowLeft" || event.key=="a"){
    p.velocity.x=0;
    hero.src="../images/Idle.png"
    
   }
   else if(event.key=="ArrowUp" || event.key=="w"){
    
    p.velocity.y=0;
   hero.src="../images/Idle.png"
   }
   else if(event.key=="ArrowDown" || event.key=="s"){
    
    p.velocity.y=0;
    hero.src="../images/Idle.png"
}})

function boundary_check(p) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        const wallX = 400 + 40 * j;
        const wallY = 50 + 40 * i;
        const wallWidth = 40;
        const wallHeight = 40;

        
        if (
          p.position.x < wallX + wallWidth && // player left side < wall right side
          p.position.x + 40 > wallX &&        // player right side > wall left side
          p.position.y < wallY + wallHeight && // player top side < wall bottom side
          p.position.y + 50 > wallY            // player bottom side > wall top side
        ) {
          return true; // Collision detected
        }
      }
    }
  }
  return false; // No collision
}

//  bullet{
//   constructor({position,velocity,image}){
//     this.position=position;
//     this.velocity=velocity;
//     this.image=image;
//   }
//   build(){
//     c.drawImage(this.image,this.position.x,this.position.y);
//   }class
// }
// const bullet=new Image();
// bullet.src="images/bullet.png";




