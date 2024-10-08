var canvas = document.querySelector("canvas");
c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
class Walls{
constructor({position}){
  this.position=position;
}
build(){c.fillStyle="Black";
  c.fillRect(this.position.x,this.position.y,40,40);

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
 map.forEach((row,i)=>{
  row.forEach((indi,j)=>{if(indi==1){
    new Walls({position:{x:400+40*j,y:50+40*i}}).build();
  }})
 })          
 class Player{
  constructor({position,velocity}){
    this.position=position;
    this.velocity=velocity;
  }
  build(){
    c.beginPath();
    c.fillStyle="red";
    c.arc(this.position.x,this.position.y,10,0,Math.PI*2);
    c.fill();
    
  }
  update(){
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
  }
 }
 const p=new Player({position:{x:460,y:110},velocity:{x:0,y:0}});
 p.build();
 var speed=3;
 addEventListener("keydown",(event)=>{if(event.key=="ArrowRight" || event.key=="d"){
  p.velocity.x=speed;
  
  move();

  }
 else if(event.key=="ArrowLeft" || event.key=="a"){
  p.velocity.x=-speed;
  
  move();
 }
 else if(event.key=="ArrowUp" || event.key=="w"){
  
  p.velocity.y=-speed;
  move();
 }
 else if(event.key=="ArrowDown" || event.key=="s"){
  
  p.velocity.y=speed;
  move();
 }});
 function move(){
  c.clearRect(p.position.x-10,p.position.y-10,20,20);
  p.update();
  p.build();
  animationFrameId=requestAnimationFrame(move);
}
addEventListener("keyup",(event)=>{cancelAnimationFrame(animationFrameId);
  if(event.key=="ArrowRight" || event.key=="d"){
    p.velocity.x=0;
    
    
  
    }
   else if(event.key=="ArrowLeft" || event.key=="a"){
    p.velocity.x=0;
    
    
   }
   else if(event.key=="ArrowUp" || event.key=="w"){
    
    p.velocity.y=0;
   
   }
   else if(event.key=="ArrowDown" || event.key=="s"){
    
    p.velocity.y=0;
    
}})


