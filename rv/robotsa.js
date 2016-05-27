function Sensor(position, direction){
	THREE.Raycaster.call(this,position,direction);
	this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();
function Robot(size,x,y){
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


	
	
	
	Agent.call(this,x,y);


	this.sensor=new Sensor();
	this.actuator= new THREE.Mesh(robot,material);
	this.actuator.commands=[];
	this.add(this.actuator);
}

Robot.prototype=new Agent();

Robot.prototype.sense=function(environment){
	this.sensor.set(this.position,
		new THREE.Vector3(Math.cos(this.rotation.z),
			Math.sin(this.rotation.z),
			0));
	var obstaculo=this.sensor.intersectObjects(environment.children,true);

	if((obstaculo.length > 0 &&
	(obstaculo[0].distance<=1)))
		this.sensor.colision=true;
	else
		this.sensor.colision=false;
};
Robot.prototype.plan=function(environment){
	this.actuator.commands=[];

	if(this.sensor.colision==true)
	this.actuator.commands.push('rotateCW');
	else
	this.actuator.commands.push('goStraight');
};

Robot.prototype.act= function (environment){
  var command= this.actuator.commands.pop();
  if (command===undefined)
  console.log('Undefined command');
  else if (command in this.operations)
  this.operations[command](this);
  else
  console.log('Unknown command');
};

Robot.prototype.operations={ };
Robot.prototype.operations.goStraight= function(robot,distance){
  if (distance===undefined)
  distance=0.05;
  robot.position.x+=distance*Math.cos(robot.rotation.z);
  robot.position.y+=distance*Math.sin(robot.rotation.z);
};

Robot.prototype.operations.rotateCW= function(robot,angle){
  if (angle===undefined)
  angle=-Math.PI/2;
  robot.rotation.z+=angle;
};

Robot.prototype.operations.rotateCCW= function(robot,angle){
  if (angle===undefined)
  angle=Math.PI/2;
  robot.rotation.z+=angle;
};
