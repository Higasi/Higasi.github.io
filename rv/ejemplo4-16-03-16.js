function setup(){
THREE.ImageUtils.crossOrigin='';
var textura= THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/cube/pisa/nz.png');
var forma= new THREE.BoxGeometry (1,1,1);
var material= new THREE.MeshPhongMaterial({map: textura});
malla = new THREE.Mesh(forma, material);
malla.scale.set(1,4,9);

var LuzPuntual = new THREE.PointLight(0XFFFFFF);
LuzPuntual.position.x =10;
LuzPuntual.position.y =10;
LuzPuntual.position.z =10;

escena= new THREE.Scene();
escena.add(malla);
escena.add(LuzPuntual)


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
