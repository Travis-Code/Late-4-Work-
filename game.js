var game;
var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
var titleColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a];
var tunnelWidth = 256;

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
		//setPreloadSprite(loadingBar);" turns and image into a 
		//loading bar which grows as assets are being loaded.
		game.load.setPreloadSprite(loadingBar); 
		game.load.image("title","assets/sprites/title.png");
		game.load.image("playbutton", "assets/sprites/playbutton.png");
		game.load.image("backsplash", "assets/sprites/backsplash.png");
		game.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
		game.load.image("wall","assets/sprites/wall.png");
		game.load.image("ship", "assets/sprites/ship.png");
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
		//add tunnelbg to the game.
		var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
		//add tint to tunnelBG.	
			tunnelBG.tint = tintColor;
		//add and position left wall to the game.
		var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width / 2, game.height, "wall");
			leftWallBG.tint = tintColor;
		//add and position right wall to the game.
		var rightWallBG = game.add.tileSprite((game.width+tunnelWidth)/2,0,game.width/2,game.height,"wall");
			rightWallBG.tint = tintColor;
		//flip rightWalls x axis horizontally using -1.
			rightWallBG.tileScale.x = -1;
		//make array of possible ship positions.
		this.shipPositions = [(game.width-tunnelWidth) / 2 + 32,(game.width+tunnelWidth) / 2 - 32];
		//add the ship to the game
		this.ship = game.add.sprite(this.shipPositions[0], 860,"ship");
		this.ship.side = 0;
		this.ship.anchor.set(0.5);
		this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

			//game.state.start("GameOverScreen");
	}
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
	create: function(){
	}
}