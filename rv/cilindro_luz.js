
function setup(){

var forma= new THREE.BoxGeometry (100,100,500);
var material1 = new THREE.MeshStandardMaterial( {
					opacity: params.opacity,
					transparent: true
				} );
malla = new THREE.Mesh(forma, material1);

escena= new THREE.Scene();
escena.add(malla);

camara= new THREE.PerspectiveCamera();
camara.position.z=750;
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

