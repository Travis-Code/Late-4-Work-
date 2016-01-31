var game;
var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
var titleColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a];
var tunnelWidth = 256;
var shipHorizonalSpeed = 100;
//shipMoveDelay: stop movement of ship while in tween.
var shipMoveDelay = 0;
var shipVerticalSpeed = 15000;
//swipeDistance tells us any swipe movement greater than 10 pixels will be
//considered a swipe.
var swipeDistance = 10;

window.onload = function() {	
	game = new Phaser.Game(640, 960, Phaser.AUTO, ""); 
	//add states
	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TitleScreen", titleScreen);
	game.state.add("PlayGame", playGame);
	game.state.add("GameOverScreen", gameOverScreen);
	game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
	preload: function(){
		this.game.load.image("loading","assets/sprites/loading.png");
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		console.log("game started");
		game.state.start("Preload");
	}
}

var preload = function(game){};
preload.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(game.width/2, game.height/2,"loading");
		loadingBar.anchor.setTo(0.5);
		//setPreloadSprite(loadingBar);" turns an image into a 
		//loading bar which grows as assets are being loaded.
		game.load.setPreloadSprite(loadingBar); 
		game.load.image("title","assets/sprites/title.png");
		game.load.image("playbutton", "assets/sprites/playbutton.png");
		game.load.image("backsplash", "assets/sprites/backsplash.png");
		game.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
		game.load.image("wall","assets/sprites/wall.png");
		game.load.image("ship", "assets/sprites/ship.png");
		game.load.image("smoke", "assets/sprites/smoke.png");
	},
	create: function(){
		game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {
	create: function(){
		//tileSprite method tiles a background.
		var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
		//tint property tints an image.
		titleBG.tint = bgColors[game.rnd.between(0,bgColors.length-1)];
		//set random background color.
		//game.stage.backgroundColor = bgColors[game.rnd.between(0,bgColors.length-1)];
		var title = game.add.image(game.width/2, 210, "title");
		title.tint = titleColors[game.rnd.between(0,titleColors.length-1)];
		title.anchor.set(0.5);
		// button method uses callback usually in context with this to specified method.
		var playButton = game.add.button(game.width/2, game.height-150,"playbutton", this.startGame);
		playButton.anchor.set(0.5);
		//tween(target).to(properties, ease, autoStart, delay, repeat)
		var playButtonTween = game.add.tween(playButton).to({
			width:220,
			height:220
		}, 1500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
		playButtonTween.yoyo(true);
		
	},
	startGame: function(){
		game.state.start("PlayGame");
	}
}

var playGame = function(game){};
playGame.prototype = {
	create: function(){
		// make random color array for tunnelBG and walls.
		var tintColor = bgColors[game.rnd.between(0, bgColors.length-1)];
		//add tunnelbg to the game. make it cover the entire canvas.
		//add.TileSprite(x,y,width,height,key)
		var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
		//add tint to tunnelBG.	
			tunnelBG.tint = tintColor;
		//add and position left wall to the game.  
		//add.TileSprite(x,y,width,height,key)
		var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "wall");
			leftWallBG.tint = tintColor;
		//add and position right wall to the game.
		var rightWallBG = game.add.tileSprite((game.width+tunnelWidth)/2,0,game.width/2,game.height,"wall");
			rightWallBG.tint = tintColor;
		//flip rightWalls x axis horizontally using -1.
			rightWallBG.tileScale.x = -1;
		//make array of possible ship positions in relation to left and right walls.
		this.shipPositions = [(game.width-tunnelWidth) / 2 + 32,(game.width+tunnelWidth) / 2 - 32];
		//add the ship to the game and make its position left of the wall.
		this.ship = game.add.sprite(this.shipPositions[0], 860,"ship");
		//make a custom variable that keeps track of which side the ship will be on
		//since the ship will begin at 0 set the side variable to 0.
		this.ship.side = 0;
		//variable that regulates if the ship can move or not.
		this.ship.canMove = true;
		//variable that regualtes if user can swipe
		this.ship.canSwipe = false;
		this.ship.anchor.set(0.5);
		//enable physics on ship.
		this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
		//add a onDown touch event that fires a callback method called moveShip.
		game.input.onDown.add(this.moveShip, this);
		//add a onUp touch event that will change canSwipe to true.
		game.input.onUp.add(function(){
			this.ship.canSwipe = true;
		},this);
	
		//add smoke emitter add.emitter(x, y, max) x/y are for placement of emitter and the max amount of particles value.
		this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20);
		//set the image for the particle effect. 
		this.smokeEmitter.makeParticles("smoke");
		//each particle should have a horizontal and vertical speed.
		//set the x speed at a random value between setXSpeed(min, max) by seconds
		this.smokeEmitter.setXSpeed(-15, 15);
		//set the y speed at a random value between setYSpeed(min, max) by seconds
		this.smokeEmitter.setYSpeed(50, 150);
		//ramdomize transparency of each smoke particle. setAlpha(min, max)
		//0 is completely transparent, 1 is completely opaque.
		this.smokeEmitter.setAlpha(0.5, 1);
		//start the emitter
		//start(explode, lifespan, frequency)
		//explode is a boolean which bursts out all at once (true) or at a frequency (false).
		//lifespan is the life time the particle will last for in milliseconds.
		//frequency of the emittion in milliseconds, if explode is set to false
		this.smokeEmitter.start(false, 1000,40);

		//adds vertical movement to the ship using a Tween.
		//goes from current ship location to y=0 top of the canvas.
		this.verticalTween = game.add.tween(this.ship).to({
			y:0
		}, shipVerticalSpeed, Phaser.Easing.Linear.None, true);

	},


	//this method deals with movement of the ship.
	moveShip: function(){
		this.ship.canSwipe = true;
		if(this.ship.canMove){
			//set canMove to false so to stop the method from repeat firing while moveShip method is executing.
			this.ship.canMove = false;
			//if ship.side is 1 then turns to 0, if ship.side is 0 then turns to 1.
			this.ship.side = 1 - this.ship.side;
			//make tween on ship that moves it from the current side to the opposite side.
			var horizontalTween = game.add.tween(this.ship).to({
				x:this.shipPositions[this.ship.side]
			}, 
			shipHorizonalSpeed, Phaser.Easing.Linear.None, true);
			//when the tween is complete, the horizontalTween.onComplete Method is called it sets off a 
			//method called time.events which will delay 0ms that then makes it so we can fire off 
			//another touch event moveShip Method.
			horizontalTween.onComplete.add(function(){
				game.time.events.add(shipMoveDelay, function(){
					this.ship.canMove = true;
			//"this" refers to playGame object.
				}, this);
			}, this);
			//add a shadow fade effect by using a copy of the ship image and tween
			//then destory the ship copy after the tween completes with onComplete Method.
			var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
			ghostShip.alpha = 0.5;
			ghostShip.anchor.set(0.5);
			var ghostTween = game.add.tween(ghostShip).to({
				alpha: 0
			}, 350, Phaser.Easing.Linear.None, true);
			ghostTween.onComplete.add(function(){
				ghostShip.destroy();
			});
		}
	},

		update: function(){
		this.smokeEmitter.x = this.ship.x;
		this.smokeEmitter.y = this.ship.y;
		//if canSwipe is true check to see if the activePointer input is greater
		//than the swipeDistance global variable.  if true call restartShip() method
		if(this.ship.canSwipe){
			if(Phaser.Point.distance(game.input.activePointer.positionDown,
				game.input.activePointer.position) > swipeDistance){
			this.restartShip();
			}
		}
	},


	//restartShip method will switch stop any interaction with user until it is completed.
	//it will stop the current verticalTween tween.
	//and change the value of the ships verticalTween from y: 0 to y: 860 (back to the original y: origin of the ship)
	//then once the change to the position of 860 to y is complete it will start
	//the tween of the ship back to y: 0 again.
	restartShip: function(){
		this.ship.canSwipe = false;
		this.verticalTween.stop();
		this.verticalTween = game.add.tween(this.ship).to({
			y: 860
		}, 100, Phaser.Easing.Linear.None, true);
		this.verticalTween.onComplete.add(function(){
			this.verticalTween = game.add.tween(this.ship).to({
				y: 0
			}, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
		}, this)
	}
}







var gameOverScreen = function(game){};
gameOverScreen.prototype = {
	create: function(){
	}
}