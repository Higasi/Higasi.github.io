
function setup(){

var forma= new THREE.BoxGeometry (1,1,5);
var material = new THREE.MeshLambertMaterial( );
var light1 = new THREE.PointLight( 0xff0040, 1, 50 );
			
			
malla = new THREE.Mesh(forma, material);
malla.material.transparent = 1;
malla.material.opacity=0.5;
  var LuzPuntual = new THREE.PointLight(0XFFFFFF,1000);
  malla.position.x=1;
    malla.position.y=1;
      malla.position.z=1;
LuzPuntual.position.x =10;
LuzPuntual.position.y =10;
LuzPuntual.position.z =10;

light1.position.x=1;
light1.position.y=1;
light1.position.z=1;

escena= new THREE.Scene();
escena.add(malla);
escena.add(LuzPuntual); 
	escena.add( light1 );

camara= new THREE.PerspectiveCamera();
camara.position.z=10;
renderer= new THREE.WebGLRenderer();
renderer. setSize( window.innerHeight*.95, window.innerHeight*.95);
document.body.appendChild( renderer.domElement);
}

function loop(){

requestAnimationFrame (loop);

malla.rotation.x +=0.01;
malla.rotation.y +=0.01;
renderer.render  ( escena, camara);
}

var camara, escena,  renderer, malla;

setup();
loop();

