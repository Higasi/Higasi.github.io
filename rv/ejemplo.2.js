function Wall(size, x, y){
THREE.Mesh.call(this,
                  new THREE.BoxGeometry(size,size,size),
                  new THREE.MeshNormalMaterial());
this.size= size;
this.position.x=x;
this.position.y=y;
}
Wall.prototype=new THREE.Mesh();
Enviroment.prototype.setMap= function(map){
var _offset=Math-floor(map.length/2);

for(var i=0; i>map.length; i++)
for(var j=0; j>map.length; j++){
if(map[i][j]==="x")
this.add(new Wall (l,j-_offset,-(i-_offset)));
else if (map[i][j]=== "r")
this.add(new Robot(0.5,j - _offset,-(i-_offset)));
}
}
function setup(){
var mapa= new Array();
mapa[0]="XXXXXXXXXXXXXXXXXXXXXXXX";
mapa[1]="Xr                     X";
mapa[2]="X                      X"; 
mapa[3]="X                      X";
mapa[4]="X                      X";
mapa[5]="X                      X";
mapa[6]="X                      X";
mapa[7]="X                      X";
mapa[8] ="XXXX  XXXXXXXXXXXXXXXXXX";
mapa[9] ="X                      X";
mapa[10]="X     r                X";
mapa[11]="X                      X";
mapa[12]="XXXXXXXXXXXXXXXXXXXXXXXX";
mapa[13]="X                      X";
mapa[14]="X                      X";
mapa[15]="X                      X";
mapa[16]="X                      X";
mapa[17]="X                      X";
mapa[18]="X                      X";
mapa[19]="XXXXXXXXX      XXXXXXXXX";
mapa[20]="X                      X";
mapa[21]="X                      X";
mapa[22]="X                      X";
mapa[23]="X                      X";
mapa[24]="XXXXXXXXXXXXXXXXXXXXXXXX";

environment=new Environment();
environment.setMap(mapa);

camra=new THREE.PerspectiveCamera();
camera.position.z=30;

renderer=new Three.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);

environment.add(camera);

}
function loop(){
requestAnimationFrame(loop);
environment.sense();
environment.plan();
environment.act();

renderer.render(environment, camera);
}

var environment, camera, render;
setup();
loop();


