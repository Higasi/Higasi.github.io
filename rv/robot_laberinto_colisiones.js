function setup() {

	cubo1= new THREE.Mesh(new THREE.BoxGeometry(1,32,1),new THREE.MeshNormalMaterial());
	cubo2= new THREE.Mesh(new THREE.BoxGeometry(1,32,1),new THREE.MeshNormalMaterial());
cubo3= new THREE.Mesh(new THREE.BoxGeometry(32,1,1),new THREE.MeshNormalMaterial());
	cubo4= new THREE.Mesh(new THREE.BoxGeometry(32,1,1),new THREE.MeshNormalMaterial());
	pelota= new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial());

	cubo1.position.x=16;
	cubo2.position.x=-16;
	
	cubo3.position.y=16;
	cubo4.position.y=-16;
	
	camara = new THREE.PerspectiveCamera();
	camara.position.z=50;

	raycaster1= new THREE.Raycaster(pelota.position, new THREE.Vector3(0,1,0));
	raycaster2= new THREE.Raycaster(pelota.position, new THREE.Vector3(0,-1,0));
	raycaster3= new THREE.Raycaster(pelota.position, new THREE.Vector3(1,0,0));
	raycaster4= new THREE.Raycaster(pelota.position, new THREE.Vector3(-1,0,0));

	
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

	obstaculo1= raycaster1.intersectObject(cubo3);
	obstaculo2= raycaster2.intersectObject(cubo4);
	obstaculo3= raycaster3.intersectObject(cubo1);
	obstaculo4= raycaster4.intersectObject(cubo2);


	if((obstaculo1.length>0 && (obstaculo1[0].distance<=0.5)) || 
	   (obstaculo2.length>0 && (obstaculo2[0].distance<=0.5)))
	   
	   
	   
	   	
	step=-step;

	pelota.position.y +=step;
		pelota.position.x +=0.1;

	

	raycaster1.set(pelota.position, new THREE.Vector3(0,1,0))
	raycaster2.set(pelota.position, new THREE.Vector3(0,-1,0))
	
	//raycaster3.set(pelota.position, new THREE.Vector3(1,0,0))
	//raycaster4.set(pelota.position, new THREE.Vector3(-1,0,0))
	

	

	requestAnimationFrame(loop);
	renderer.render(escena,camara);
}

var escena, camara, renderer, cubo1, cubo2,cubo3,cubo4, pelota;
var raycaster1, raycaster2,raycaster3,raycaster4,step;
var obstaculo1, obstaculo2,obstaculo3,obstaculo4;
setup();
loop();
