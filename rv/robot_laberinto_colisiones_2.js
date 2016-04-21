
function setup() {

	cubo1= new THREE.Mesh(new THREE.BoxGeometry(1,32,10),new THREE.MeshNormalMaterial());
	cubo2= new THREE.Mesh(new THREE.BoxGeometry(1,32,10),new THREE.MeshNormalMaterial());
cubo3= new THREE.Mesh(new THREE.BoxGeometry(32,1,10),new THREE.MeshNormalMaterial());
	cubo4= new THREE.Mesh(new THREE.BoxGeometry(32,1,10),new THREE.MeshNormalMaterial());


var material = new THREE.MeshNormalMaterial();


	var brazoform = new THREE.BoxGeometry(1,1,5 );
var cabezaform=new THREE.SphereGeometry(1.5);
var cuerpoform=new THREE.BoxGeometry(3,3,5);
var pieform=new THREE.BoxGeometry(2,1,1);
var piernaform=new THREE.BoxGeometry(1,1,5);
var manoform=new THREE.BoxGeometry(1,1,1);

var cabeza= new THREE.Mesh(cabezaform,material);
var cuerpo= new THREE.Mesh(cuerpoform,material);
var pied=new THREE.Mesh(pieform,material);
var piei= new THREE.Mesh(pieform,material);
var piernad= new THREE.Mesh(piernaform,material);
var piernai= new THREE.Mesh(piernaform,material);
var brazoi=new THREE.Mesh(brazoform,material);
var brazod=new THREE.Mesh(brazoform,material);
var manoi=new THREE.Mesh(manoform,material);
var manod=new THREE.Mesh(manoform,material);

cuerpo.position.z=0;
cabeza.position.z=4;
piernai.position.z=-2.5;
piernad.position.z=-2.5;
piei.position.z=-4.5;
piei.position.x=1;
pied.position.z=-4.5;
pied.position.x=1;
brazoi.position.z=0;
brazod.position.z=0;
manoi.position.z=-1;
manoi.position.x=1;
manod.position.z=-1;
manod.position.x=1;


piernai.position.y=-.8;
piernad.position.y=.8;
piei.position.y=-.8;
pied.position.y=.8;
brazoi.position.y=-2;
brazod.position.y=2;
manoi.position.y=-2;
manod.position.z=2;


var robot= new THREE.Geometry();

THREE.GeometryUtils.merge(robot,cabeza);
THREE.GeometryUtils.merge(robot,cuerpo);
THREE.GeometryUtils.merge(robot,brazoi);
THREE.GeometryUtils.merge(robot,brazod);
THREE.GeometryUtils.merge(robot,manoi);
THREE.GeometryUtils.merge(robot,manod);
THREE.GeometryUtils.merge(robot,piernai);
THREE.GeometryUtils.merge(robot,piernad);
THREE.GeometryUtils.merge(robot,piei);
THREE.GeometryUtils.merge(robot,pied);

	malla=new THREE.Mesh(robot, material);
	
	cubo1.position.x=16;
	cubo2.position.x=-16;
	
	cubo3.position.y=16;
	cubo4.position.y=-16;
	camara = new THREE.PerspectiveCamera();
	camara.position.z=120;
	camara.position.y= -20;;
	

	//raycaster1= new THREE.Raycaster(pelota.position, new THREE.Vector3(1,0,0));


	
	escena= new THREE.Scene();
	escena.add(cubo1);
	escena.add(cubo2);
	escena.add(cubo3);
	escena.add(cubo4);
	escena.add(camara);
	escena.add(malla);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
 	document.body.appendChild(renderer.domElement);
	step=0.2;
	raycaster= new THREE.Raycaster(malla.position,new THREE.Vector3(0,1,0));
 }


function loop() {

	obstaculo1= raycaster.intersectObject(cubo1);
	obstaculo2= raycaster.intersectObject(cubo2);
	obstaculo3= raycaster.intersectObject(cubo3);
	obstaculo4= raycaster.intersectObject(cubo4);




if ((obstaculo3.length>0) && (obstaculo3[0].distance<=3)){
    dir=2;
    raycaster.set(malla.position,new THREE.Vector3(1,0,0));
  }
  
  if ((obstaculo1.length>0) && (obstaculo1[0].distance<=3)){
    dir=3;
    raycaster.set(malla.position,new THREE.Vector3(0,-1,0));
  }
 if ((obstaculo4.length>0) && (obstaculo4[0].distance<=3)){
    dir=4;
    raycaster.set(malla.position,new THREE.Vector3(-1,0,0));
  }
  
  if ((obstaculo2.length>0) && (obstaculo2[0].distance<=3)){
    dir=1;
    raycaster.set(malla.position,new THREE.Vector3(0,1,0));
  }

  
  if (dir==1){
    
     malla.position.y+=step;
  }
  else if(dir==2){
     malla.position.x+=step;
  }
  else if(dir==3){
    malla.position.y-=step;
  }
  else if(dir==4){
    malla.position.x-=step;
  }
 	





		requestAnimationFrame(loop);
	renderer.render(escena,camara);
}

var escena, camara, renderer, cubo1, cubo2,cubo3,cubo4, pelota;
var raycaster, dir;
var obstaculo1, obstaculo2,obstaculo3,obstaculo4;

dir=1;
setup();
loop();
