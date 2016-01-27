var game;
var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];

window.onload = function() {	
	game = new Phaser.Game(640, 960, Phaser.AUTO, ""); // add Game object
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
	},
	create: function(){
		game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {
	create: function(){
		var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
		titleBG.tint = bgColors[game.rnd.between(0,bgColors.length-1)];
		//set random background color.
		//game.stage.backgroundColor = bgColors[game.rnd.between(0,bgColors.length-1)];
		var title = game.add.image(game.width/2, 210, "title");
		//title.tint = bgColors[game.rnd.between(0,bgColors.length-1)];
		title.anchor.set(0.5);
		var playButton = game.add.button(game.width/2, game.height-150,"playbutton", this.startGame);
		playButton.anchor.set(0.5);
		var playButtonTween = game.add.tween(playButton).to({
			width:220,
			height:220
		}, 1500, "Linear", true, 0, -1);
		playButtonTween.yoyo(true);
		
	},
	startGame: function(){
		game.state.start("PlayGame");
	}
}

var playGame = function(game){};
playGame.prototype = {
	create: function(){
		console.log("play the game");
	}
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
	create: function(){
	}
}