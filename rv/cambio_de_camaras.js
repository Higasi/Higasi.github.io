

function setup(){
 document.addEventListener( 'keydown', onKeyDown, false );
 document.addEventListener( 'keyup', onKeyUp, false );
var material = new THREE.MeshNormalMaterial();


	var brazoform = new THREE.BoxGeometry(0.2,0.2,3 );
var cabezaform=new THREE.SphereGeometry(0.5);
var cuerpoform=new THREE.BoxGeometry(1,1,3);
var pieform=new THREE.BoxGeometry(0.5,0.2,0.2);
var piernaform=new THREE.BoxGeometry(0.2,0.2,3);
var manoform=new THREE.BoxGeometry(0.2,0.2,0.2);

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
cabeza.position.z=2;
piernai.position.z=-1;
piernad.position.z=-1;
piei.position.z=-2.5;
piei.position.x=0.2;
pied.position.z=-2.5;
pied.position.x=0.2;
brazoi.position.z=0;
brazod.position.z=0;
manoi.position.z=-0.2;
manoi.position.x=0.2;
manod.position.z=-0.2;
manod.position.x=0.2;


piernai.position.y=-.2;
piernad.position.y=.2;
piei.position.y=-.2;
pied.position.y=.2;
brazoi.position.y=-1;
brazod.position.y=1;
manoi.position.y=-1;
manod.position.z=1;


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
	

 var luzPuntual=new THREE.PointLight(0xffffff);
 luzPuntual.position.x=0;
 luzPuntual.position.y=0;
 luzPuntual.position.z=10;
 escena=new THREE.Scene();
 escena.add(luzPuntual);
 escena.add(malla);
 camara=new THREE.PerspectiveCamera();
 camara.position.z=5;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function onKeyDown ( event ) {
	event.stopPropagation();
	switch( event.keyCode ) {
	case 80: boton=true; break;
	case 38: botonu=true; break;
	case 40: botond=true; break;
	case 37: botonl=true; break;
	case 39: botonr=true; break;
				}
	}
function onKeyUp ( event ) {
	event.stopPropagation();
	switch( event.keyCode ) {
	case 80: boton=false; break;
	case 38: botonu=false; break;
	case 40: botond=false; break;
	case 37: botonl=false; break;
	case 39: botonr=false; break;
				}
	}

function loop(){
if(boton==true){
	camara=new THREE.OrthographicCamera( 50/ - 2, 50 / 2, 50 / 2, 50 / - 2, 10, 100 );
	ayuda=new THREE.CameraHelper(camara);
	camara.position.z=50;
}
else{
	camara=new THREE.PerspectiveCamera;
	ayuda=new THREE.CameraHelper(camara);
	camara.position.z=50;
}
if(botonr==true){
	camara.position.x+=10;
}
if(botonl==true){
	camara.position.x-=10;
}
if(botonu==true){
	camara.position.y+=10;
}
if(botond==true){
	camara.position.y-=10;
}
escena.add(ayuda)
camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
}

var escena,camara,renderer,boton,ayuda,botonu,botond,botonl,botonr,malla;
setup();
loop();

