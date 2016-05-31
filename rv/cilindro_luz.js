
function setup(){

var forma= new THREE.BoxGeometry (1,1,5);
//var material = new THREE.MeshLambertMaterial({opacity:0.6,transparent:true} );
var light1 = new THREE.PointLight( 0xFFFFFF, 20, 50,2 );
			
//malla = new THREE.Mesh(forma, material);
/*  malla.position.x=1;
    malla.position.y=1;
      malla.position.z=1;*/

light1.position.set(0,0,0);
escena= new THREE.Scene();
//escena.add( new THREE.AmbientLight( 0xFFFFFF ) );
//escena.add(malla);
escena.add( light1 );
camara= new THREE.PerspectiveCamera();
camara.position.set(o,o,4);
renderer= new THREE.WebGLRenderer();
renderer. setSize( window.innerHeight*.95, window.innerHeight*.95);
document.body.appendChild( renderer.domElement);
}

function loop(){

requestAnimationFrame (loop);
/*
malla.rotation.x +=0.01;
malla.rotation.y +=0.01;
*/
renderer.render  ( escena, camara);
}

var camara, escena,  renderer, malla;

setup();
loop();

