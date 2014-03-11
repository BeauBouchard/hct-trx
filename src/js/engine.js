/*
 * Game Engine for Sprite Based HTML5 Canvas Game
 * Author: Beau Bouchard (@beaubouchard)
 */
 

var game;

function messagelog(text){
	console.log("## " + text);
}



//+------------------------------------------------+
//| 		GAME 				   |
//+------------------------------------------------+

function Game(){
	this.gamewindow = document.getElementById("game");
	this.map = new Map();
	this.tick=0;
	this.player = new Player();
	this.keyStroke = [];
	this.then;
	this.now = Date.now();;
	this.delta;
	this.fps = 0;
	
}
Game.prototype = {
	initialize: function() {
		messagelog("game.prototype initialize");
		
		this.map.initialize();
		this.player.initialize(this.map.getContext());
		
		this.onstart();
		
	},
	onready: function() { 
	
	},
	onstart: 			function() {
		
		messagelog("game.prototype.onstart");
	},
	renderToCanvas: 	function(){
	},
	parseImage: 		function(image, callback) {
	
	},
	setupLevel: 		function(source) {
		
	},
	//+------------------------------------------------+
	//| 		Game loop			   |
	//+------------------------------------------------+
	//Game loop
	main: 				function(){
		
		this.now = Date.now();
		this.fps = 
		this.delta = this.now - this.then;
		this.fps = 	game.update( 1000 / this.delta );
		game.render();
		
		
		this.then = this.now;
	},
	update: 			function(incMod){
		//incMod = fps
		game.handleInput(incMod);
		
		
	},
	render:				function(){
		//here we move shit, and render game
		window.webkitRequestAnimationFrame(game.main);
	},
	//+------------------------------------------------+
	//| 		INPUT 				   |
	//+------------------------------------------------+
	// Event listener for keystroke codes
	handleInput:		function(incMod){
			
			if ((38 in this.keyStroke )|| (87 in this.keyStroke)) {// up key stroke or 'w' key stroke
				game.player.tryMove(game.player.getX() ,(game.player.getY() + (game.player.getSpeed() )));
				game.tick += incMod*5;
			}
			if ((40 in this.keyStroke) || (83 in this.keyStroke)) { // down key stroke or 's' key stroke
				game.player.tryMove(game.player.getX() ,(game.player.getY() - (game.player.getSpeed() )));
				game.tick += incMod*5;
			}
			if ((37 in this.keyStroke) || (65 in this.keyStroke)){ // left key stroke or 'a' key stroke
				game.player.tryMove((game.player.getX() + (game.player.getSpeed() )),game.player.getY());
				game.tick += incMod*5;
			}
			if ((39 in this.keyStroke) || (68 in this.keyStroke)) { // right key stroke or 'd' key stroke
				game.player.tryMove((game.player.getX() - (game.player.getSpeed() )),game.player.getY());
				game.tick += incMod*5;
			}
			
			//if(game.tick >1){playerAnimate();game.tick=0;}
			
			//action, or fire? button 
			if ((32 in this.keyStroke) || (17 in this.keyStroke)) { // SPACE key stroke or CTRL key stroke
				//Fire
			}
			// PLAYER VARIABLES
	}
}
//+------------------------------------------------+
//| 		MAP  				   |
//+------------------------------------------------+
function Map(){
	this.canvas;
	this.context;
}
Map.prototype = {
	initialize: function() {
		messagelog("map.prototype initialize");
		this.canvas 		= document.createElement("canvas");
	 	this.context 		= this.canvas.getContext("2d");
	 	this.canvas.width 	= 1024;
	 	this.canvas.height	= 768;
		this.canvas.style.background="#f3f3f3";
		
	 	document.getElementById("game").appendChild(this.canvas);
	},
	getCanvas: function() { 
		return this.canvas;
	},
	getContext: function() {
		return this.context;
	},
	//loosely based on Jake Gordon's Gaunlet level map generator. 
	//A little more powerful than I need it to be
	loadMapImage: function(incSource, onload) {
		var image = document.createElement('img');
		image.on('load', onload);
		image.src = incSource;
		return image;
	},
	parseMap: function(incMapTemplateImage, callback) {
		/*
			extract the image width & height
			render the image to a temporary <canvas>
			extract the raw pixel imageData
			provide 3 helper methods to do some low level pixel bit manipulation
			iterate through all the pixels, calling the callback once for each pixel
		*/
		var image = incMapTemplateImage, 
			totalHeight			= incMapTemplateImage.height, 
			totalWidth 			= incMapTemplateImage.width,
			tempCanvas,tempContext,data,tx,ty;
		tempCanvas = document.createElement('canvas');
			tempCanvas.width = totalWidth;
			tempCanvas.height = totalHeight;
			tempContext = tempCanvas.getContext('2d');
			tempContext.drawImage(image, 0, 0);
		data    = ctx.getImageData(0, 0, totalWidth, totalHeight).data;
		var helpers = {
			valid: function(tx,ty) { return (tx >= 0) && (tx < totalWidth) && (ty >= 0) && (ty < totalHeight); },
			//which entry in the imageData represents this tile
			index: function(tx,ty) { return (tx + (ty*totalWidth)) * 4; },
			//Pixel returns the pixel color for that tile
			pixel: function(tx,ty) { 
				var i = this.index(tx,ty); 
				return this.valid(tx,ty) ? (data[i]<<16)+(data[i+1]<<8)+(data[i+2]) : null;
			}//pixel
		}//helpers

		//run loop for each tx,ty pixel
		for(ty = 0 ; ty < totalHeight ; ty++) {
			for(tx = 0 ; tx < totalWidth ; tx++) {
				//check that pixel
				callback(tx, ty, helpers.pixel(tx,ty), helpers);
			}
		}
	},//parseMap
	setupMap: function (incMapTemplateImage) {
		//not yet
		function is(pixel, type) 		{ return ((pixel & PIXEL.MASK.TYPE) === type); };
		function type(pixel)     		{ return  (pixel & PIXEL.MASK.SUBTYPE) >> 4;   };
		function iswall(pixel)         	{ return is(pixel, PIXEL.WALL);      };
		function isstart(pixel)        	{ return is(pixel, PIXEL.START);     };
		function isexit(pixel)         	{ return is(pixel, PIXEL.EXIT);      };
		Game.parseImage(source, function(tx, ty, pixel) {
			if (isstart(pixel))
				setStart(tx, ty);
			else if (iswall(pixel))
				addWall(tx, ty);
			else if (isexit(pixel))
				addExit(tx, ty);
		});
	}//setupMap

} // Map

//+------------------------------------------------+
//| 		Monster 			   |
//+------------------------------------------------+
function Monster (){
}
Monster.prototype = {
	initialize: function() {
	
	},
	spawn: function(ix, iy) {
		
	},
	render: function() {
		
	},
	tryMove: function(dX, dY) {
		
	}
 }
  
//+------------------------------------------------+
//| 		Player	 			   |
//+------------------------------------------------+
function Player(){
	this.x;
	this.y;
	this.sprite;
	this.cells  = []; // entities track which cells they currently occupy
	
	this.speed = 5; //pixels per second
}
Player.prototype = {
	initialize: function(context) {
		messagelog("game.player.initialize");
		this.sprite = new Sprite("box");
		this.x = game.map.getCanvas().width / 2;
		this.y = game.map.getCanvas().height / 2;
		this.sprite.initialize(this.x,this.y);
	},
	loadSprite: 	function() {

		
	},
	spawn: 			function(ix, iy) {
		this.sprite.spawn(ix, iy);
	},
	render: 		function() {
		
	},
	tryMove: 		function(iX, iY) {
		
		//there will be some colition detection here later. "
		messagelog(iX);
		this.x = iX;
		this.y = iY;
		this.sprite.draw(this.x, this.y);
	},
	getX: 			function(){
		return this.x;
	},
	getY: 			function(){
		return this.y;
	},
	getSpeed: 		function(){
		return this.speed;
	}
}

//+------------------------------------------------+
//| 		Entity	 			   |
//+------------------------------------------------+
// other non-moving items. Including barriers/grass
function Entity(){
	var x,y,size,passable = false;
}
Entity.prototype = {
	initialize: function() {
	
	},
	render: function() {
		
	}
}

//+------------------------------------------------+
//| 		Sprite	 			   |
//+------------------------------------------------+
function Sprite(inctype){
	this.spritetype = inctype;
	this.spritetable =[
	["box", "None"],
	["player", "media/images/player.png"],
	["monster", "media/images/badguy.png"],
	["tallgrass", "media/images/tallgrass.png"]
	];
	
}
Sprite.prototype = {
	initialize: 		function(iX, iY) {
		messagelog("game.player.sprite.initialize : Type :" + this.spritetype);
		this.context = game.map.getContext();
		this.spawn(iX, iY);
	},
	spawn:				function(iX, iY) {
		switch (this.spritetype) {
			case "box":
				this.context.fillStyle = "rgb(200,0,0)";
				this.context.fillRect (10, 10, 55, 50);
				break;
			case "player":
				
				break;
			case "monster":
			
				break;
			case "tallgrass":
				break;
			default:
				this.context.fillStyle = "rgb(200,0,0)";
				this.context.fillRect (10, 10, 55, 50);
		}
	},
	preloadImages:		function() {
	
	},
	loadImage: 			function(){
	},
	parseImage:			function(){
	},
	draw:			function(iX, iY){
		switch (this.spritetype) {
			case "box":
				this.context.clearRect(0,0,game.map.getCanvas().width,game.map.getCanvas().height);
				this.context.fillStyle = "rgb(200,0,0)";
				this.context.fillRect (iX, iY, 55, 50);
				break;
			case "player":
				
				break;
			case "monster":
			
				break;
			case "tallgrass":
				break;
			default:
				this.context.fillStyle = "rgb(200,0,0)";
				this.context.fillRect (iX, iY, 55, 50);
		}
	}

}



//+------------------------------------------------+
//| 		Menu	 			   |
//+------------------------------------------------+

//		Each Array contains strings, First string is title, each one following is option
//		"menu Title", Option 1, Option 2, ...
var menuArray = [
		["Main Menu","New Game", "Load Game","2:Help", "Exit"],
		["World Map Menu","Something"],
		["In Battle Menu","Something"]];
var subMenuArray = [
		
		["submenu title 1","submenu option 1","submenu option 2","submenu option 3"],
		["submenu title 2","submenu option 1","submenu option 2","submenu option 3"],
		["Help Sub Menu","About Game", "Controls"]];
		
		
function Menu(){
	this.menuList = [];
	
        this.subMenuOpen = false;

}
Menu.prototype = {
	
	initialize: 		function(incMenuNum) {
		//assign which menu to bring up.
		this.menuList = menuArray[incMenuNum];
		//loop through menu
		for (var i = 0; i < this.menuList.length; i++) {
			var menuItem = this.menuList[i];
			//add each menu item to screen
			this.loadMenu[menuItem];
		}
	},
	loadMenu : 		function(incMenuItem) {
		//incMenuItem is a string
		if(incMenuItem.indexOf(":")>0){
			//sub menu detected
			//Loading up submenu
			var menu = incMenuItem.substring(0,incMenuItem.indexOf(":"));
			//When a menu item has a submenu
			//add a onMouseOver event to bring up submenu
		
			addEventListener("mouseover", function (e) {
				menu.loadMenu(menu);
				this.subMenuOpen = true;
			}, false);
			addEventListener("mouseexit", function (e) {
				menu.unLoadMenu(menu);
				this.subMenuOpen = false;
			}, false);
		}
		else {
			//code to append the menu item to canvas
		}
		//for each this.menuList
		//display(this.menuList[x]);
	},
	unloadMenu:		function() {
		//code to unload menu
		// remember to delete self when done, as object is no longer needed.removeChild()
	}
	
}








	
	
