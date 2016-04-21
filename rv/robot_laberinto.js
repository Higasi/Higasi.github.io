function Pierna(){
THREE.Object3D.call(this);
//Mallas para pierna y pie


this.pierna=new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
this.pie=new THREE.Mesh(new THREE.BoxGeometry(2,1,1));

//Posicion de mallas
this.pierna.position.y=-2.5;
this.pie.position.y=-4.5;
this.pie.position.x=1;

//Se agrega el objeto 3d para conformar una unidad y se termina la definicion del constructor
this.add(this.pierna);
this.add(this.pie);
}

function Cuerpo(){
THREE.Object3D.call(this);
this.cuerpo=new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
this.cuerpo.position.y=0;
this.add(this.cuerpo);
}


function Brazo(){
THREE.Object3D.call(this);
//Mallas para pierna y pie
this.brazo=new THREE.Mesh(new THREE.BoxGeometry(1,3,1));
this.mano=new THREE.Mesh(new THREE.BoxGeometry(1,1,1));

this.brazo.position.y=0;
this.mano.position.y=-1;
this.mano.position.x=1;

this.add(this.brazo);
this.add(this.mano);
}

function Cabeza(){
THREE.Object3D.call(this);
this.cabeza=new THREE.Mesh(new THREE.SphereGeometry(1.5));
this.cabeza.position.y=6;
this.add(this.cabeza);
}

//Se establece la herencia entre la pierna y el object 3d
Pierna.prototype=new THREE.Object3D();
Cuerpo.prototype=new THREE.Object3D();
Brazo.prototype=new THREE.Object3D();
Cabeza.prototype=new THREE.Object3D();

//Se procede a definir la funcion de inicializacion del mundo virtual
function setup(){



  
cuerpo=new Cuerpo();
piernaD=new Pierna();
piernaI=new Pierna();
brazoI=new Brazo();
brazoD=new Brazo();
cabeza=new Cabeza();

//El cuerpo y las piernas se desplazan a posiciones deseadas

piernaD.position.z=-0.5;
piernaI.position.z=0.5;
brazoD.position.z=-2;
brazoI.position.z=2;

//Determinamos que tanto van a rotar las figuras en un momento dado
step=.01;

//Definimos la escena
escena=new THREE.Scene();
escena.add(cuerpo);
escena.add(piernaD);
escena.add(piernaI);
escena.add(brazoI);
escena.add(brazoD);
escena.add(cabeza);

//Agregamos camara y renderer
camara=new THREE.PerspectiveCamera();
camara.position.z=20;


renderer =new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

//Loop


function loop(){
requestAnimationFrame(loop);
renderer.render(escena,camara);


if (Math.abs(piernaD.rotation.z)>.5)
  step=-step;
  piernaD.rotation.z+=step;
  piernaI.rotation.z-=step;
  
  brazoI.rotation.z+=step;
  brazoD.rotation.z-=step;
}

//Se declaran simbolos globales y se ejecuta setup y loop
var escena,camara,renderer;
var step, piernaD,piernaI, cuerpo, brazoI, brazoD, cabeza;
setup();
loop();
