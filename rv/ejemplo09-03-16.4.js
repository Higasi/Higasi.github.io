
function setup(){

var forma= new THREE.BoxGeometry (1,1,1);
var material= new THREE.MeshLamberMaterial({color: '#ffffff'});
malla = new THREE.Mesh(forma, material);
var LuzPuntual = new THREE.PointLight(0XCC00CC);
LuzPutual.position.x =10;
LuzPutual.position.y =10;
LuzPutual.position.z =10;

escena= new THREE.Scene();
escena.add(malla);
escena.add(LuzPuntual)

camara= new THREE.PerspectiveCamera();
camara.position.z=5;
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

