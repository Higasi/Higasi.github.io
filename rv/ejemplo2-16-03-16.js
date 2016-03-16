function setup(){
THREE.ImageUtils.crossOrigin='';
var textura= THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
var forma= new THREE.BoxGeometry (1,4,9);
var material= new THREE.MeshLambertMaterial({map: textura});
malla = new THREE.Mesh(forma, material);

var LuzPuntual = new THREE.PointLight(0XFFFFFF);
LuzPutual.position.x =10;
LuzPutual.position.y =10;
LuzPutual.position.z =10;

escena= new THREE.Scene();
escena.add(malla);


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
