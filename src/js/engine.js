//+------------------------------------------------+
//| 		GAME 				   |
//+------------------------------------------------+
function messagelog(text){
	console.log("## " + text);
}

function Game(){
	messagelog("game");
	this.gamewindow = document.getElementById("game");
	this.map 		= new Map();
	this.player 	= new Player();	
	this.ball 		= new Ball();
	this.ball1 		= new Ball();
	this.ball2 		= new Ball();
	this.ball3 		= new Ball();
	this.score		= 0;
	this.tick		= 0;
	this.keyStroke 	= [];
	this.then;
	this.now 		= Date.now();;
	this.delta;
	this.fps 		= 0;
	
}
Game.prototype = {	
	initialize: function() {
			messagelog("game.prototype initialize");
			this.map 		= new Map();
			this.player 	= new Player();	
			this.ball 		= new Ball();
			this.tick		= 0;
			this.count		= 0;
			this.keyStroke 	= [];
			this.then		= Date.now();
			this.now 		= Date.now();
			this.delta;
			this.fps 		= 0;
			this.onstart();
		
	},
	onready: function() { 
		messagelog("game.prototype onready");
	},
	onstart: 			function() {
		messagelog("game.prototype onstart");
		this.map.initialize();
		this.ball.initialize();
		this.ball1.initialize();
		this.ball2.initialize();
		this.ball3.initialize();



	},
	onend: 			function() {
			//game over, this happens after score is met
		messagelog("game.prototype onend");
		this.map.getContext().fillStlye = "white";
		this.map.getContext().font = "20px Arial, sans-serif";
		this.map.getContext().textAlign = "center";
		this.map.getContext().textBaseline = "middle";
		this.map.getContext().fillText("Game Over", W/2, H/2 + 25);

	},
	onscore: 			function() {
			//when the ball is past the paddle
		messagelog("game.prototype onscore");
	},
	//+------------------------------------------------+
	//| 		Game loop			   |
	//+------------------------------------------------+
	//Game loop
	loop: 				function(){
		this.now = Date.now(); 
		this.delta = this.now - this.then;
		this.fps = 	1000 / this.delta;
		game.update( 1);
		game.render();
		this.count++;
		this.then = this.now;
	},
	update: 			function(incMod){
		//incMod = fps

		game.handleInput(incMod);
		this.ball.update(incMod);
		this.ball1.update(incMod);
		this.ball2.update(incMod);
		this.ball3.update(incMod);
	},
	render:				function(){
		//here we move shit, and render game
		//this.
		this.ball.render();
		this.ball1.render();
		this.ball2.render();
		this.ball3.render();

		this.map.getContext().fillStlye = "white";
		this.map.getContext().font = "20px Arial, sans-serif";
		this.map.getContext().textAlign = "center";
		this.map.getContext().textBaseline = "middle";
		this.map.getContext().fillText("FPS:"+this.fps , 32,32);


		window.webkitRequestAnimationFrame(game.loop);
	},
	//+------------------------------------------------+
	//| 		INPUT 				   |
	//+------------------------------------------------+
	// Event listener for keystroke codes
	handleInput:		function(incMod){
			
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
		messagelog("player initialize");
		this.x = game.map.getCanvas().width / 2;
		this.y = game.map.getCanvas().height / 2;
	},
	spawn: 			function(ix, iy) {

	},
	render: 		function() {
		
	}
}

//+------------------------------------------------+
//| 		Ball  	 			   |
//+------------------------------------------------+
function Ball(){
	this.x;
	this.y;
	this.cells  	= []; // entities track which cells they currently occupy
	this.speed;
	this.context;
	this.colorR;
	this.colorG;
	this.colorB;
	this.dirX;
	this.dirY;
	this.top;
	this.bottom;
	this.left;
	this.right;
}
Ball.prototype = {
	initialize: function(context) {
		messagelog("Ball.prototype initialize");
		this.context 	= game.map.getContext();
		this.x 			= game.map.getCanvas().width / 2;
		this.y 			= game.map.getCanvas().height / 2;
		this.speed 		= 5; //pixels per second
		this.colorR 	= Math.floor((Math.random()*250)+1);
		this.colorG 	= Math.floor((Math.random()*250)+1);
		this.colorB 	= Math.floor((Math.random()*250)+1);
		this.color = "rgb("+this.colorR+","+this.colorG+","+this.colorB+")";
		this.radius 	= 5;
		this.top		= 0 + this.radius;
		this.bottom		= game.map.getCanvas().width - this.radius;
		this.left		= 0 + this.radius;
		this.right		= game.map.getCanvas().height - this.radius;
		this.spawn();
	},
	spawn: 			function() {
		this.context.fillStyle = this.color;
		this.context.beginPath();
		this.context.arc(this.x, this.y, 5, 0, Math.PI*2, false);
		this.context.fill();
     	this.context.closePath();
		this.start();
	},
	start: 		function() {
		//decides if the ball is going up or down
		this.dirX = Math.floor((Math.random()*20)-10); // random angle 1- 10
		this.dirY = Math.floor((Math.random()*20)-10); // random angle 1- 10 
		//wrap your head around this

		

	},
	update: 		function(incMod) {
		this.x = this.x + (this.dirX * incMod);
    	this.y = this.y + (this.dirY * incMod);

		if((this.dirX > 0) && (this.x > this.bottom)) {
		this.x = this.bottom;
		this.dirX = -this.dirX;
		}
		else if ((this.dirX < 0) && (this.x < this.top)) {
		this.x = this.top;
		this.dirX = -this.dirX;
		}

		if ((this.dirY > 0) && (this.y > this.right)) {
		this.y = this.right;
		this.dirY = -this.dirY;
		}
		else if ((this.dirY < 0) && (this.y < this.left)) {
		this.y = this.left;
		this.dirY = -this.dirY;
		}
	},
	render: 		function() {
		this.context.fillStyle = this.color ;
		this.context.beginPath();
		this.context.arc(this.x, this.y, 5, 0, Math.PI*2, false);
		this.context.fill();
     	this.context.closePath();
	}
}

//+------------------------------------------------+
//| 		Map  	 			   |
//+------------------------------------------------+
function Map(inccanvas){
	this.canvas;
	this.context;
}
Map.prototype = {
	initialize: function(context) {
		messagelog("Map.prototype initialize");
	
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
	spawn: 			function(ix, iy) {

	},
	render: 		function() {
		
	}
}


//+------------------------------------------------+
//| 		Player  	 			   |
//+------------------------------------------------+
function Player(inccanvas){
	this.width = 32;
	this.height = 10;
	
}
Player.prototype = {
	initialize: function(context) {
		messagelog("Player.prototype initialize");

	},
	spawn: 			function(ix, iy) {

	},
	render: 		function() {
		
	}
}

