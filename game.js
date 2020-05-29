/*
This game will be similar to mario bros. The Game_Object will be able
to  attck,collect, run and jump. There will be multiple levels to this game.
*/
/*

http://www.allacrost.org/media/art/sprites_map_claudius.png
MAP:: https://media.indiedb.com/cache/images/games/1/32/31122/thumb_620x2000/master-tileset.png
*/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let level1 = true;


// SPRITE SHEETS OF GAME WORLD
var girl = "https://comps.gograph.com/pinky-girl-game-sprites_gg84225487.jpg";
var spriteRunner="https://i.pinimg.com/originals/d3/78/99/d37899c20bb6dda3da5e1971e2a45f61.png";
const man ="http://www.allacrost.org/media/art/sprites_map_claudius.png";
const map = "https://media.indiedb.com/cache/images/games/1/32/31122/thumb_620x2000/master-tileset.png";
const coins = "coin_gold.png";
const dollars = "/dollar.png";
var current_frame = 0;
let maplevel = [];

//the Game_Object sprite
var charImage = new Image();
var newIma = new Image();
var manimage = new Image();
var coinImg = new Image();
coinImg.src = coins;
newIma.src = girl;
manimage.src = man;
manimage.height = 20;
charImage.src = spriteRunner;
var tileSheet = new Image();
tileSheet.src = map;

// add main player boolean
var boyplayer = new Game_Object(charImage,0,10,10,10,864,280,8,2,false);
var girlplayer = new Game_Object(newIma,0,400,30,30,400,397,5,2,false);
//const manPlayer = new Game_Object(manimage,0,500,30,30,1000,362,8,2);
const manPlayer = new Game_Object(manimage,0,530,20,20,192,256,6,4,true);
const coin = new Game_Object(coinImg,100,100,30,30,256,32,8,1,false);

// Array of tiles to be copied to canvas
var tileMap =[[1,32,32,32,32,32,1,1,1,1]
,[1,1,1,1,1,32,1,32,32,32]
,[1,32,32,32,1,32,1,1,1,32]
,[1,32,32,32,1,32,32,32,1,32]
,[1,1,1,32,1,1,1,1,1,32]
,[1,32,32,32,32,32,32,32,32,32]
,[1,1,1,1,32,32,39,32,1,32]
,[1,32,32,1,1,1,1,32,1,32]
,[1,1,1,1,32,10,33,32,1,32]
,[1,32,32,1,1,1,1,1,1,1]
];
var level2 =[[32,32,32,32,32,32,1,1,32,1]
,[1,1,1,1,1,32,1,32,32,32]
,[1,32,32,32,1,32,32,1,1,32]
,[1,32,32,32,1,32,32,32,1,32]
,[1,1,1,32,1,1,1,1,1,32]
,[1,32,32,32,32,39,32,32,32,32]
,[1,1,1,1,32,32,32,32,1,32]
,[1,32,32,1,1,1,1,32,1,32]
,[1,1,1,1,32,10,33,32,1,1]
,[1,32,32,32,1,1,1,1,1,1]
];
maplevel = Array.from(tileMap);

const online = false;

//size of each cell
var mapIndexOffset = -1;
var mapRows = tileMap.length;
var mapCols = tileMap[0].length;

function drawSheet(level){
  for(var row=0; row<mapRows; row++){
    for(var col=0; col<mapCols; col++){
      var tileIndex = level[row][col];
      var sourceX = Math.floor(tileIndex % mapCols)*62;
      var sourceY = Math.floor(tileIndex / mapRows)*62;

      if(online){
        context.drawImage(tileSheet,sourceX,sourceY,62,62,row*100,col*100,62,62);

      }
      else{
        context.drawImage(tileSheet,sourceX,sourceY,62,62,row*62,col*62,62,62);
      }
    }
  }

}

// number of rows and columns
window.addEventListener('keydown',function(){
  canvas.key = event.keyCode;
});
window.addEventListener('keyup',function(){
  canvas.key = false;
});
function start_game(){
	/*This function is called from html*/
    animate();

}

function Game_Object(img,x,y,width,height,srcWidth,srcHeight,col,row,mainPlayer){
	this.img = img;
	this.x=x;
	this.y=y;
  this.velocity = 10;

	this.srcX=0;
	this.srcY=0;
	this.srcWidth=srcWidth;
	this.srcHeight=srcHeight;
	this.col=col;
	this.row=row;
	this.width=this.srcWidth/this.col;
	this.height=this.srcHeight/this.row;

  this.bounds = function(){
    if(manPlayer.x == coin.x && manPlayer.y == coin.y){
       coin.width = 0;
       coin.height = 0;

    }


    if(this.x<=0 || this.x >= canvas.width){
      this.x = -this.x;
      this.y = -this.y;
    }
    if(this.y<=0){
      this.y = -this.y;
    }


  }
	this.draw = function(){
		/*This functions draws the objects to the screen*/
		//console.log("actor");

		context.drawImage(this.img,this.srcX,this.srcY,
			this.width,this.height,this.x,this.y,this.width,this.height);
	}

  this.update = function(){
  /*this function updates the objecst movements */

  context.clearRect(0,0,canvas.width,canvas.height);

  /*if(canvas.key == false){
    current_frame = current_frame;
  }
  else{
    current_frame = ++current_frame % this.col;
    console.log("currentFrame", current_frame);
  }*/
  current_frame = ++current_frame % this.col;

  this.srcX = current_frame * this.width;
  this.bounds();
  // this.srcY displays the row of the sprite
  this.srcY = 0*this.height;
  console.log(this.x,this.y);
  const step_x = Math.floor(this.x / 62);
  const step_y = Math.floor(this.y / 62);
  this.changeLevel(step_x,step_y);

  if(mainPlayer){
    if(tileMap[step_x][step_y] == 32){
      this.y = -this.y;
      this.x = -this.x ;

    }


      if(canvas.key == 37){
        this.srcY = 1*this.height;
        this.x-=this.velocity;
        this.bounds();
      }
      else if (canvas.key == 39) {
        this.srcY = 3*this.height;
        this.x+=this.velocity;
        this.bounds();
      }
      else if(canvas.key == 40){
        this.srcY = 0*this.height;
        this.y+=this.velocity;
        this.bounds();
      }
      else if(canvas.key == 38){
        this.srcY = 2*this.height;
        this.y-=this.velocity;
        this.bounds();
      }

  	}
  }
  this.changeLevel = function(x,y){
    console.log(x,y);
    if(tileMap[x][y] == 39){
      maplevel = Array.from(level2);


    }
  }
}





function animate(){

    //boyplayer.update();

    context.clearRect(this.x,this.y,this.width,this.height);
    manPlayer.update();
    coin.update();
    drawSheet(maplevel);



    // this.draw does not render both players on screen in update function
    // calling draw method here renders both chacters
    //boyplayer.draw();

    manPlayer.draw();
    coin.draw();




    setTimeout(function(){

      window.requestAnimationFrame(animate);
    },100);
  }
