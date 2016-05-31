function setup(){
	var material = new THREE.MeshPhongMaterial({color: 0xD0A9F5});
	material.transparent = true;
	material.opacity =0;
	malla= new THREE.Mesh(new THREE.CylinderGeometry(2,2,6),material);
	
	var pared = new THREE.Mesh(new THREE.BoxGeometry(8,12,2),new THREE.MeshBasicMaterial({color: 0x0489B1}));
	pared.position.z = -5;
	
	var iluminacion = new THREE.PointLight(0xffffff);
	iluminacion.position.set(0,0,0);

	escena= new THREE.Scene();
	escena.add(malla);
	escena.add(pared);
	escena.add(iluminacion);
        escena.add(pared);
	camara= new THREE.PerspectiveCamera();
	camara.position.set(0,-20,10)
	renderer= new THREE.WebGLRenderer();
	renderer.setSize(window.innerHeight*.75,window.innerHeight*.75);
	document.body.appendChild(renderer.domElement);
	
	renderer.shadowMapEnabled = true;
	malla.castShadow = true;
	pared.receiveShadow = true;
	iluminacion.castShadow = true;
	step=0.2;
}

function loop(){
	requestAnimationFrame(loop);
	if(malla.material.opacity >= 1)
		step = -0.01;
	if(malla.material.opacity <= 0)
		step = 0.01;
	
	malla.material.opacity += step;
	
	renderer.render(escena,camara);
}

var camara, escena, renderer, malla, step;
setup();
loop();
