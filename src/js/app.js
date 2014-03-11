

game = new Game();
game.initialize();
		addEventListener("keydown", function (e) {
				game.keyStroke[e.keyCode] = true;
			}, false);
		addEventListener("keyup", function (e) {
				delete game.keyStroke[e.keyCode];
			}, false);

			
//setInterval(function(){game.main()},1);


window.webkitRequestAnimationFrame(game.main);
