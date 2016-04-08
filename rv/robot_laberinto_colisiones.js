function setup() {

	cubo1= new THREE.Mesh(new THREE.BoxGeometry(1,30,1),new THREE.MeshNormalMaterial());
	cubo2= new THREE.Mesh(new THREE.BoxGeometry(1,30,1),new THREE.MeshNormalMaterial());
cubo3= new THREE.Mesh(new THREE.BoxGeometry(30,1,1),new THREE.MeshNormalMaterial());
	cubo4= new THREE.Mesh(new THREE.BoxGeometry(30,1,1),new THREE.MeshNormalMaterial());
	pelota= new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial());

	cubo1.position.x=16;
	cubo2.position.x=-16;
	
	cubo3.position.y=16;
	cubo4.position.y=-16;
	
	camara = new THREE.PerspectiveCamera();
	camara.position.z=50;

	raycaster1= new THREE.Raycaster(pelota.position, new THREE.Vector3(1,0,0));
	raycaster2= new THREE.Raycaster(pelota.position, new THREE.Vector3(-1,0,0));
	
	escena= new THREE.Scene();
	escena.add(cubo1);
	escena.add(cubo2);
	escena.add(cubo3);
	escena.add(cubo4);
	escena.add(camara);
	escena.add(pelota);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
 	document.body.appendChild(renderer.domElement);
	step=0.5;
 }


function loop() {

	obstaculo1= raycaster1.intersectObject(cubo1);
	obstaculo2= raycaster2.intersectObject(cubo2);

	if((obstaculo1.length>0 && (obstaculo1[0].distance<=0.5)) || 
	   (obstaculo2.length>0 && (obstaculo2[0].distance<=0.5)))	
	step=-step;

	pelota.position.x +=step;

	raycaster1.set(pelota.position, new THREE.Vector3(1,0,0))
	raycaster2.set(pelota.position, new THREE.Vector3(-1,0,0))

	requestAnimationFrame(loop);
	renderer.render(escena,camara);
}

var escena, camara, renderer, cubo1, cubo2, pelota;
var raycaster1, reycaster2,step;
var obstaculo1, obstaculo2;
setup();
loop();
