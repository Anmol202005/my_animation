var canvas = document.querySelector("canvas");
c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
class walls{
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
    new walls({position:{x:400+40*j,y:50+40*i}}).build();
  }})
 })          
 


