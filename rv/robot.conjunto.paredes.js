function Wall(size,x,y){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshBasicMaterial({map:textura}));
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}

Wall.prototype=new THREE.Mesh();

function Goal(size,x,y){
 THREE.ImageUtils.crossOrigin='';
 var textura  =THREE.ImageUtils.loadTexture('https://pansvinskys.github.io/imagenes/cuadros.jpg?raw=true');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshBasicMaterial({map:textura}));
 this.size=size;
 this.position.x=x;
 this.position.y=y;
 this.name="goal";
}

Goal.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
 //var _offset=Math.floor(map.length/2);
 for(var i=0;i<map.length;i++)
 for(var j=0;j<map.length;j++){
 if(map[i][j]==="x")
 this.add(new Wall(4,-20+4*j,-20+4*i));
 else if(map[i][j]==='r')
 this.add(new Robots(-20+4*j,-20+4*i));
 else if(map[i][j]==='g')
 this.add(new Goal(4,-20+4*j,-20+4*i));
 }
}

function setup(){
 document.addEventListener( 'keydown', onKeyDown, false );
 document.addEventListener( 'keyup', onKeyUp, false );
 var mapa=new Array();
 mapa[0] ="xxxxxxxxxxxxxxxxxxxxxxxx";
 mapa[1] ="x r      xxxxxxxxxxxxxxx";
 mapa[2] ="xxxxx    xxxxxxxxxxxxxxx";
 mapa[3] ="xxxxx    xxxxxxxxxxxxxxx"; 
 mapa[4] ="xxxxx        xxxxxxxxxxx";
 mapa[5] ="xxxxx        xxxxxxxxxxx";
 mapa[6] ="xxxxx                  x"; 
 mapa[7] ="xxxxx      xxxx        x";
 mapa[8] ="xxx        xxxx        x";
 mapa[9] ="xxx        xxxxxxxxxxxxx";
 mapa[10]="xxx        xxxxxx     xx"; 
 mapa[11]="xxx    xxxxxxxxxx     xx";
 mapa[12]="xxx    xxxxx          xx";
 mapa[13]="xxx    xxxxx        xxxx";
 mapa[14]="xxx                    x";
 mapa[15]="x     xxxxxxxxxxxxxxxxxx";
 mapa[16]="x     xxxxxxxxxxxxxxxx x";
 mapa[17]="x     xxxxxxxxxxxxxxxxxx";
 mapa[18]="x                     g";
 mapa[19]="xxxxxxxxxxxxxxxxxxxxxxxx";
 mapa[20]="x                      x";
 mapa[21]="x                      x";
 mapa[22]="x                      x";
 mapa[23]="x                      x";
 mapa[24]="xxxxxxxxxxxxxxxxxxxxxxxx";
 environment=new Environment();
 environment.setMap(mapa);
 camara=new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
 environment.add(camara);
 k=0;
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
	camara=new THREE.OrthographicCamera( 50/ - 2, 150 / 2, 160 / 2, 50 / - 2, 5, 200 );
	camara.position.z=1000;
}
else{
	camara=new THREE.PerspectiveCamera;
	 camara.position.set(idRobot.position.x,idRobot.position.y,idRobot.position.z+20);
}
 requestAnimationFrame(loop);
 environment.sense();
 environment.plan();
 environment.act();
 renderer.render(environment,camara);
}

var clock,environment,camara,renderer,idRobot,boton,k;
setup();
loop();
