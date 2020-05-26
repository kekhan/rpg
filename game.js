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
canvas.width = 650;
canvas.height = 600;

// SPRITE SHEETS OF GAME WORLD
var girl = "https://comps.gograph.com/pinky-girl-game-sprites_gg84225487.jpg";
var spriteRunner="https://i.pinimg.com/originals/d3/78/99/d37899c20bb6dda3da5e1971e2a45f61.png";
const man ="http://www.allacrost.org/media/art/sprites_map_claudius.png";
const map = "https://media.indiedb.com/cache/images/games/1/32/31122/thumb_620x2000/master-tileset.png";
const coins = "coin_gold.png";
const dollars = "/dollar.png";
var current_frame = 0;

//the Game_Object sprite
var charImage = new Image();
var newIma = new Image();
var manimage = new Image();
var coinImg = new Image();
coinImg.src = coins;
newIma.src = girl;
manimage.src = man;
charImage.src = spriteRunner;
var tileSheet = new Image();
tileSheet.src = map;

// add main player boolean
var boyplayer = new Game_Object(charImage,0,10,10,10,864,280,8,2,false);
var girlplayer = new Game_Object(newIma,0,400,30,30,400,397,5,2,false);
//const manPlayer = new Game_Object(manimage,0,500,30,30,1000,362,8,2);
const manPlayer = new Game_Object(manimage,0,530,30,30,192,256,6,4,true);
const rock = new Game_Object(tileSheet,0,0,62,62,620,620,5,5,false);
const coin = new Game_Object(coinImg,100,100,30,30,150,25,8,1,false);

// Array of tiles to be copied to canvas
var tileMap =[[32,32,32,32,32,32,1,1,1,1]
,[1,1,1,1,1,32,1,32,32,32]
,[1,32,32,32,1,32,1,1,1,32]
,[1,32,32,32,1,32,32,32,1,32]
,[1,1,1,32,1,1,1,1,1,32]
,[1,32,32,32,32,32,32,32,32,32]
,[1,1,1,1,32,32,32,32,1,32]
,[1,32,32,1,1,1,1,32,1,32]
,[1,1,1,1,32,32,32,32,1,32]
,[1,32,32,1,1,1,1,1,1,1]
];

const online = false;

//size of each cell
var mapIndexOffset = -1;
var mapRows = tileMap.length;
var mapCols = tileMap[0].length;

function drawSheet(){
  for(var row=0; row<mapRows; row++){
    for(var col=0; col<mapCols; col++){
      var tileIndex = tileMap[row][col];
      var sourceX = Math.floor(tileIndex % mapCols)*62;
      var sourceY = Math.floor(tileIndex / mapRows)*62;
      if(online){
        context.drawImage(tileSheet,sourceX,sourceY,62,62,row*62,col*62,62,62);

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
  console.log(canvas.key);
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
	this.srcX=0;
	this.srcY=0;
	this.srcWidth=srcWidth;
	this.srcHeight=srcHeight;
	this.col=col;
	this.row=row;
	this.width=this.srcWidth/this.col;
	this.height=this.srcHeight/this.row;

  this.bounds = function(){

    if(this.x+10<=0){
      this.x = -this.x;
    }
    if(this.y+10<=0){
      this.y= -this.y;
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
  console.log(this.x,canvas.width);
  if(mainPlayer){

      if(canvas.key == 37){
        this.srcY = 1*this.height;
        this.x-=10;
      }
      else if (canvas.key == 39) {
        this.srcY = 3*this.height;
        this.x+=10;
      }
      else if(canvas.key == 40){
        this.srcY = 0*this.height;
        this.y+=10;
      }
      else if(canvas.key == 38){
        this.srcY = 2*this.height;
        this.y-=10;
      }
  	}
  }
}

function animate(){

    //boyplayer.update();

    context.clearRect(this.x,this.y,this.width,this.height);
    manPlayer.update();
    coin.update();

    if(online){
      drawSheet(tileMap);
    }
    drawSheet();
    // this.draw does not render both players on screen in update function
    // calling draw method here renders both chacters
    //boyplayer.draw();

    manPlayer.draw();
    coin.draw();



    setTimeout(function(){

      window.requestAnimationFrame(animate);
    },100);
  }
