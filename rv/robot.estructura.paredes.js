

function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}

Sensor.prototype=new THREE.Raycaster();



function Robots (x,y){
 
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

 
 
 
Agent.call(this,x,y);
this.sensor= new Sensor();
this.sensor2= new Sensor();
this.sensor3= new Sensor();
this.sensor4= new Sensor();
this.actuator= new Robot();
this.actuator= new THREE.Mesh(robot,material);
this.actuator.rotation.x=Math.PI/2;
this.actuator.commands=[];
this.add(this.actuator);
this.ga=false;
this.gi=false;
this.sC=false;
this.pC=false;
this.g=false;
}
Robots.prototype=new Agent();

Robots.prototype.sense= function(environment){
this.sensor.set(this.position,new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
this.sensor2.set(new THREE.Vector3(this.position.x+3*Math.cos(this.rotation.z-Math.PI),this.position.y+2*Math.sin(this.rotation.z-Math.PI),this.position.z),new THREE.Vector3(Math.cos(this.rotation.z-Math.PI/2),Math.sin(this.rotation.z-Math.PI/2),0));
this.sensor3.set(new THREE.Vector3(this.position.x,this.position.y,this.position.z),new THREE.Vector3(Math.cos(this.rotation.z+Math.PI/2),Math.sin(this.rotation.z+Math.PI/2),0));
this.sensor4.set(new THREE.Vector3(this.position.x,this.position.y,this.position.z),new THREE.Vector3(Math.cos(this.rotation.z+Math.PI),Math.sin(this.rotation.z+Math.PI),0));
var obstaculo= this.sensor.intersectObjects(environment.children,true);
var obstaculo2= this.sensor2.intersectObjects(environment.children,true);
var obstaculo3= this.sensor3.intersectObjects(environment.children,true);
if((obstaculo.length>0 && (obstaculo[0].distance<=3)))
{
this.sensor.colision=true;
if(obstaculo[0].object.name=="goal")
this.g=true;
}
else
this.sensor.colision=false;
if((obstaculo3.length>0 && (obstaculo3[0].distance<=3)))
{
if(obstaculo3[0].object.name=="goal")
this.g=true;
}



if((obstaculo2.length>0 && (obstaculo2[0].distance>=5)))
{
this.sensor2.colision=true;
}
else
this.sensor2.colision=false;


if((obstaculo3.length>0 && (obstaculo3[0].distance>=5)))
{
if(obstaculo3[0].object.name=="goal")
this.gi=true;
}
if((obstaculo.length>0 && (obstaculo[0].distance>=3)))
{
if(obstaculo[0].object.name=="goal"){
this.ga=true;
 }
}

};

Robots.prototype.plan=function (environment){
this.actuator.commands=[];
if(this.g==false)
{
 if(this.ga==false&&this.gi==false)
 {
   if(this.pC==false){
    if (this.sensor.colision==true){
    this.actuator.commands.push('rotateCCW');
    this.pC=true;}
    else
    this.actuator.commands.push('goStraight');
    }
    else
    {
    if(this.sC==false){
       if (this.sensor.colision==true)
       this.actuator.commands.push('rotateCCW');
       else if (this.sensor.colision==false&&this.sensor2.colision==false)
       this.actuator.commands.push('goStraight');
       else{
       this.actuator.commands.push('rotateCW');
       this.sC=true;
       }
      }
    else{
      if(this.sensor2.colision==false)
      this.sC=false;
      else
      this.actuator.commands.push('goStraight');
     }
    }
   } 
 else{
  if(this.ga==true)
  this.actuator.commands.push('goStraight');
  if(this.gi==true&&this.ga==false){
  this.actuator.commands.push('rotateCCW'); 
  }
 }
}
};

Robots.prototype.act=function (environment){
 var command=this.actuator.commands.pop();
 if(command===undefined)
 console.log('Undefined Command');
 else if(command in this.operations)
 this.operations[command](this);
 else
 console.log('Unknown Command');
};

Robots.prototype.operations={}

Robots.prototype.operations.goStraight=function(robot,distance){
 if(distance===undefined)
 distance=.5;
 robot.position.x+=distance*Math.cos(robot.rotation.z);
 robot.position.y+=distance*Math.sin(robot.rotation.z);
 robot.actuator.llanta1.rotation.z-=.1;
 robot.actuator.llanta2.rotation.z-=.1;
 robot.actuator.llanta3.rotation.z-=.1;
 robot.actuator.llanta4.rotation.z-=.1;
 robot.actuator.llanta5.rotation.z-=.1;
 robot.actuator.llanta6.rotation.z-=.1;
 idRobot=robot;
};

Robots.prototype.operations.rotateCW=function(robot,angle){
 if(angle===undefined)
 angle=Math.PI/2;
 robot.rotation.z-=angle;
};

Robots.prototype.operations.rotateCCW=function(robot,angle){
 if(angle===undefined)
 angle=Math.PI/2;
 robot.rotation.z+=angle;
}
