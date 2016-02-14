//created by TRAVIS. H (BOOM)

var game;
var barrierVehicles = ["barrier","barrier2","barrier3","barrier4","barrier5","barrier6"];
var trees = ["trees2"];
var curse = ["HOPE YOU GOT\nINSURANCE","OUCH!", "Doh!", "Whoops,\nMY BAD!", "AHHHH!","Not My fault...","Chee Hee!","MY RIMS!","Outta My Way,\nU Donkey!"];
var endCurse = ["why u 2 bad"];
var bgColors = [ 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
var titleColors = [0xF16745, 0xFCBE12, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a];
var tunnelWidth = 256;
var shipHorizonalSpeed = 100;
var shipMoveDelay = 0;
var shipVerticalSpeed = 15000000;
//swipeDistance tells us any swipe movement greater than 10 pixels will be
//considered a swipe.
var swipeDistance = 10;
var barrierSpeed = 680;
var barrierGap = 192;
var shipHealth = 1;
var barrierIncreaseSpeed = 3.03;
var tunnelBGSpeed = 1200;

Barrier = function(game, speed, tintColor){
	var positions = [(game.width - tunnelWidth) /2+30, (game.width + tunnelWidth) / 2-30];
	var position = game.rnd.between(0, 1);
	Phaser.Sprite.call(this, game, positions[position], -190, barrierVehicles[game.rnd.between(0,barrierVehicles.length-1)]);
	var cropRect = new Phaser.Rectangle(0,0, tunnelWidth / 2, 170);
	this.crop(cropRect);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(position, 0.5);
	this.body.velocity.y = speed;
	this.body.immovable = false;
	this.placeBarrier = true;
	this.collideCar = false;

	Barrier.prototype.update = function(){
		if(this.placeBarrier && this.y > barrierGap){
			this.placeBarrier = false;
			playGame.prototype.addBarrier(this.parent, this.tint);
		}
		if(this.y > game.height){
			this.destroy();
		} 
	}
};

//this is the blueprint of the creation of a class which extends the
//Phaser Sprite class
//Barrier.prototype is extending Phasers Sprite class.
//Barrier.prototype.constructor is the constructor function that is called to
//create an object which belongs to the class.
Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

window.onload = function() {	
	game = new Phaser.Game(640, 960, Phaser.AUTO, ""); 
	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TitleScreen", titleScreen);
	game.state.add("PlayGame", playGame);
	game.state.add("GameOverScreen", gameOverScreen);
	game.state.add("Win", winStateScreen);
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
		game.load.setPreloadSprite(loadingBar); 
		game.load.image("title","assets/sprites/titleLate4Work.png");
		game.load.image("barrier6","assets/sprites/motorcycle.png");
		game.load.image("titleRage","assets/sprites/honoluluRage.png");
		game.load.image("ragetitle","assets/sprites/roadRageTitle.png");
		game.load.image("closedToday","assets/sprites/closedToday.png");
		game.load.image("grassB","assets/sprites/grassB.png");
		game.load.image("railB","assets/sprites/railB.png");
		game.load.image("playbutton", "assets/sprites/playbutton.png");
		game.load.image("backsplash", "assets/sprites/backsplash.png");
		game.load.image("tunnelbg", "assets/sprites/roadSpriteSide.png");
		game.load.image("wall","assets/sprites/grassTile.png");
		game.load.image("pileUp","assets/sprites/pileUp.png");
		game.load.image("ship", "assets/sprites/mainCar.png");
		game.load.image("smoke", "assets/sprites/smoke2.png");
		game.load.image("Sand", "assets/sprites/Sand.png");
		game.load.image("barrier", "assets/sprites/greyCar.png");
		game.load.image("barrier2", "assets/sprites/police.png");
		game.load.image("barrier3", "assets/sprites/fancyCar.png");
		game.load.image("barrier4", "assets/sprites/coolCar.png");
		game.load.image("barrier5", "assets/sprites/orangeCar.png");
		game.load.audio("bgmusic", ["assets/sounds/oldSchoolBG.mp3","assets/sounds/oldSchoolBG.ogg"]);
		game.load.audio("explosion", ["assets/sounds/explosion.mp3","assets/sounds/explosion.ogg"]);
		game.load.audio("carStart", ["assets/sounds/carStart.mp3","assets/sounds/carStart.ogg"]);
		game.load.audio("carStart", ["assets/sounds/carStart.mp3","assets/sounds/carStart.ogg"]);
		game.load.audio("carCrash", ["assets/sounds/Crash.mp3","assets/sounds/Crash.ogg"]);
		game.load.audio("honk", ["assets/sounds/honk.mp3","assets/sounds/honk.ogg"]);
		game.load.audio("screech", ["assets/sounds/screech.mp3","assets/sounds/screech.ogg"]);
		game.load.audio("AstonButton", ["assets/sounds/Aston.mp3","assets/sounds/Aston.ogg"]);
	},
	create: function(){

		game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {
	create: function(){
		//var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
		//titleBG.tint = bgColors[game.rnd.between(0,bgColors.length-1)];
		var titleRoadPic = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
		var titlePic = game.add.image(game.width.centerX, game.height-650, "titleRage");
		var title = game.add.image(game.width/2, 200, "title");
		title.tint = titleColors[game.rnd.between(0,titleColors.length-1)];
		title.anchor.set(0.5);
		var titleTween = game.add.tween(title).to({
			width:420,
			height:420
		}, 1500, "Linear", true, 0, -1);
			var nameStyle = {font: "20px Helvetica", fill: "#ffffff", align: "center"}
			var nametext = game.add.text(game.width/2+200, game.height-150, "PROGRAMMING \n& GRAPHICS \nby Travis.Jorel.H.", nameStyle);
			nametext.anchor.set(0.5);
			nametext.stroke = '#000000';
			nametext.strokeThickness = 0;
		titleTween.yoyo(true);
		this.startCar = game.add.audio("carStart");
		this.startCar.play();
		var playButton = game.add.button(game.width/2, game.height-150,"playbutton", this.startGame, this);
		playButton.anchor.set(0.5);
		playButton.tint = 0xFCBE12;
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
				var doorCloseSound = game.add.audio("AstonButton");
				doorCloseSound.play();
				game.time.events.add(Phaser.Timer.SECOND * 0.4, function(){
					console.log("it werks");
					this.fade("PlayGame");
				}, this);
		
	},

	//fade state method.
		fade: function (nextState){
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 0;        
		spr_bg.endFill();        
		this.nextState = nextState;        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 1 }, 500, null)        
		s.onComplete.add(this.changeState, this)        
		s.start();    
	},   

	changeState: function (){        
		this.game.state.start(this.nextState);        
		this.fadeOut();    
	},    
	fadeOut: function (){        
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 1;        
		spr_bg.endFill();        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 0 }, 600, null)        
		s.start();    
	},
}

var playGame = function(game){};
playGame.prototype = {
	create: function(){
		this.bgMusic = game.add.audio("bgmusic");
		this.bgMusic.loopFull(1);
		tintColor = bgColors[game.rnd.between(0,bgColors.length-1)];
		var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
			tunnelBG.autoScroll(0, tunnelBGSpeed+= 200);
		//tunnelBG.anchor.set(0.0);
		//add and position left wall to the game.  
		//add.TileSprite(x,y,width,height,key)
		var leftWallBG = game.add.tileSprite( -tunnelWidth / 2, 0, game.width / 2, game.height, "wall");
			leftWallBG.tint = tintColor;
			leftWallBG.autoScroll(0, 800);
		var rightWallBG = game.add.tileSprite((game.width + tunnelWidth)/2,0,game.width/2,game.height,"wall");
			rightWallBG.tint = tintColor;
			rightWallBG.autoScroll(0, 800);
		//flip rightWalls x axis horizontally using -1.
			rightWallBG.tileScale.x = -1;
		var sandLeftWallBG = game.add.tileSprite( -tunnelWidth / 2, 0, game.width / 2, game.height, "Sand");
			sandLeftWallBG.autoScroll(0, 800);
		var sandRightWallBG = game.add.tileSprite((game.width + tunnelWidth)/2,0,game.width/2,game.height,"Sand");
			sandRightWallBG.autoScroll(0, 800);
		//flip rightWalls x axis horizontally using -1.
			sandRightWallBG.tileScale.x = -1;
			sandLeftWallBG.alpha = 0.2;
			sandRightWallBG.alpha = 0.2;

		var grassLeftWallBG = game.add.tileSprite(-tunnelWidth/2, 0, 160, game.height, "grassB");
			grassLeftWallBG.tint = tintColor;
			grassLeftWallBG.autoScroll(0, 500);
		//add and position right wall to the game.
		var grassRightWallBG = game.add.tileSprite((game.width -60), 0, 60, game.height,"grassB");
			grassRightWallBG.tint = tintColor;
			grassRightWallBG.autoScroll(0, 500);
		//flip rightWalls x axis horizontally using -1.
			grassRightWallBG.tileScale.x = -1;
			grassRightWallBG.alpha = 1;
			grassLeftWallBG.alpha = 1;

		var railLeftWallBG = game.add.tileSprite(tunnelWidth-80, 0, 15, game.height, "railB");
			//sandLeftWallBG.tint = tintColor;
			railLeftWallBG.autoScroll(0, 500);
		//add and position right wall to the game.
		var railRightWallBG = game.add.tileSprite((game.width -200), 0, 15, game.height,"railB");
			//sandRightWallBG.tint = tintColor;
			railRightWallBG.autoScroll(0, 500);
		//flip rightWalls x axis horizontally using -1.
			railRightWallBG.tileScale.x = -1;
			
		//make array of possible ship positions in relation to left and right walls.
		this.shipPositions = [(game.width-tunnelWidth) / 2 + 52,(game.width+tunnelWidth) / 2 - 52]; 
		//add the ship to the game and make its position left of the wall.
		this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
		//make a custom variable that keeps track of which side the ship will be on
		//since the ship will begin at 0 set the side variable to 0.
		this.ship.side = 0;
		//initially start ship not destroyed.
		this.ship.destroyed = false;
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
		this.smokeEmitter = game.add.emitter(this.ship.x+20, this.ship.y + 30, 20);
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
			y:-200
		}, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
		/*this.treeGroup = game.add.group();
		var tree = new Tree(game, barrierSpeed, tintColor, this.ship);
		game.add.existing(tree);
		this.treeGroup.add(tree);*/
		//barrierGroup is a container for all barriers.
		this.barrierGroup = game.add.group();
		//Barrier (line:16) is a new custom class that we made and we can pass thru our own arguments.
		var barrier = new Barrier(game, barrierSpeed, tintColor, this.ship);
		//add.existing(displayObject) method adds an existing displayObject to the game world 
		game.add.existing(barrier);
		//tell phaser we want the new barrier object to be part of the barrierGroup.
		this.barrierGroup.add(barrier);
		//BUG wth is going on here it breaks code when uncommented.
		//it looks like this is adding an extra barrier that is unnecessary since
		//the Barrier.prototype.update method is already adding
		//this.addBarrier(this.barrierGroup, tintColor);
		this.counter = 25;
		this.text = 0;
		this.text = game.add.text(game.width/2, game.height-700, 'READY GO!', { font: "34px helvetica", fill: "#FFDC00", align: "center" });
	    this.text.anchor.setTo(0.5);
	    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
		//Earthquake effect
		//we needto add margin tot he world, so the camera can move
		var margin = 50;
		//and set the world's bounds according to the given margin
		var x = -margin;
		var y = -margin;
		var w = game.world.width + margin*2;
		var h = game.world.height +margin*2;
		//it's not necessary to increase height, we do it to keep uniformity
		game.world.setBounds(x,y,w,h);
		//we make sure camera is at position(0,0)
		game.world.camera.position.set(0);
		this.countDownTimer = game.time.events.loop(Phaser.Timer.SECOND * 25, this.winCounter, this);
	},

	winCounter:function(){
		this.fade("Win");
		this.bgMusic.stop();

	},

	updateCounter: function(){
	    this.counter--;
	    this.text.setText('Get to Work in \n' + this.counter + ' Seconds!');
	},

	//this method deals with movement of the ship.
	moveShip: function(){
		this.ship.canSwipe = true;
		if(this.ship.canMove && shipHealth <= 3){
			var explosionSound = game.add.audio("screech");
				explosionSound.play();
			//set canMove to false so to stop the method from repeat firing while moveShip method is executing.
			this.ship.canMove = false;
			//if ship.side is 1 then turns to 0, if ship.side is 0 then turns to 1.
			this.ship.side = 1 - this.ship.side;
			if(this.ship.side ==1){
				this.ship.angle = 30;
			}
			else
			{			
			this.ship.angle = -30;
			}
			//this.ship.angle = 0;
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
					this.ship.angle = 0;
			//"this" refers to playGame object.
				}, this);
			}, this);
			//add a shadow fade effect by using a copy of the ship image and tween
			//then destory the ship copy after the tween completes with onComplete Method.
		/*	var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
			ghostShip.alpha = 0.5;
			ghostShip.anchor.set(0.5);
			var ghostTween = game.add.tween(ghostShip).to({
				alpha: 0
			}, 350, Phaser.Easing.Linear.None, true);
			ghostTween.onComplete.add(function(){
				ghostShip.destroy();
			});*/
		}
	},

	update: function(){
		this.smokeEmitter.x = this.ship.x+9;
		this.smokeEmitter.y = this.ship.y+60;
		//if canSwipe is true check to see if the activePointer input is greater
		//than the swipeDistance global variable.  if true call restartShip() method
		
		// I DON'T LIKE THIS STATEMENT.
		/*if(this.ship.canSwipe){
			if(Phaser.Point.distance(game.input.activePointer.positionDown,
				game.input.activePointer.position) > swipeDistance){
				//game.input.activePointer.position) > swipeDistance){
			//this.restartShip();
				barrierSpeed += 2000; 
			}
		}*/
		//update method that checks to see if this.ship.destroyed = false.
		//if so it checks to see if this.ship and this.barrierGroup are colliding.
		//I implemented a shipHealth property that gives x amount of health/life to the ship.
		//if shipHealth is greater than or equal to 4
		//it will set the ship to be destroyed. which will lock the game into this method,
		//and not call the initial ship.destoryed = true variable.
		//it will then call destroy() on the smokeEmitter element.
		//next we create a var that will hold a tween which will destroy the ship.  
		//The destroyTween will cause the ship to randomly spin the ship.
		//after the tween is complete we will call the destroyTween.onComplete.add()
		//which will add an explosion emitter to the ship.
		//after the explosion the ship will call game.state.start("GameOverScreen");
		// and will switch to the game over state.
		//fix this!
		//game.physics.arcade.overlap(this.ship, this.barrierGroup, killBarrier, null, this);
	
		if(!this.ship.destroyed){

			game.physics.arcade.collide(this.ship, this.barrierGroup, null, function(s,b)
			{
						
						game.time.events.remove(this.countDownTimer);
						this.counter = 25;

				var destroyB = game.add.tween(b).to({
							x: b.x + game.rnd.between(-100, 100),
							y: b.y + game.rnd.between(-500, 800),
							rotation: 5
						}, 1000, Phaser.Easing.Linear.None, true);
						destroyB.onComplete.add(function(){
							var explosionEmitter = game.add.emitter(b.x, b.y, 200);
							explosionEmitter.makeParticles("smoke");
							explosionEmitter.setAlpha(0.5, 1);
							explosionEmitter.minParticleScale = 0.5;
							explosionEmitter.maxParticleScale = 2;
							explosionEmitter.start(true, 2000, null, 200);
							var bCrash = game.add.audio("carCrash");
							bCrash.play();
							b.destroy();
						}, this);

				var explosionSound = game.add.audio("explosion");
				explosionSound.play();
				this.addQuake();
				var curser = curse[game.rnd.between(0,curse.length-1)];
				var style = {font: "75px Impact", fill: "#ffffff", align: "center"}
				var curseText = game.add.text(game.width/2, game.height/2, curser, style);
				curseText.anchor.set(0.5);
				curseText.stroke = '#000000';
				curseText.strokeThickness = 8;

				var carHonk = game.add.audio("honk");
				carHonk.play();
				this.ship.destroyed = true;
				this.smokeEmitter.destroy();
				var destroyTween = game.add.tween(this.ship).to({
					x: this.ship.x + game.rnd.between(-100, 100),
					y: this.ship.y + game.rnd.between(-500, 800),
					rotation: 20
				}, 1000, Phaser.Easing.Linear.None, true);
				destroyTween.onComplete.add(function(){
					this.bgMusic.stop();
					explosionSound.play();
					var explosionEmitter = game.add.emitter(this.ship.x, this.ship.y, 200);
					explosionEmitter.makeParticles("smoke");
					explosionEmitter.setAlpha(0.5, 1);
					explosionEmitter.minParticleScale = 0.5;
					explosionEmitter.maxParticleScale = 2;
					explosionEmitter.start(true, 2000, null, 200);
					var carCrash = game.add.audio("carCrash");
					carCrash.play();
					this.ship.destroy();
					game.time.events.add(Phaser.Timer.SECOND * 2, function(){
					this.ship.destroy();
					this.fade("GameOverScreen");
					}, this);
				}, this);
			
		}, this)
		}

	},


	//fade state method.
	fade: function (nextState){
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 0;        
		spr_bg.endFill();        
		this.nextState = nextState;        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 1 }, 500, null)        
		s.onComplete.add(this.changeState, this)        
		s.start();    
	},   

	changeState: function (){        
		this.game.state.start(this.nextState);        
		this.fadeOut();    
	},    
	fadeOut: function (){        
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 1;        
		spr_bg.endFill();        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 0 }, 600, null)        
		s.start();    
	},

	//restartShip method will switch stop any interaction with user until it is completed.
	//it will stop the current verticalTween tween.
	//and change the value of the ships verticalTween from y: 0 to y: 860 (back to the original y: origin of the ship)
	//then once the change to the position of 860 to y is complete it will start
	//the tween of the ship back to y: 0 again.
	restartShip: function(){
		if(!this.ship.destroyed && this.ship.alpha ==1){
			barrierSpeed *= barrierIncreaseSpeed;
			for(var i = 0; i < this.barrierGroup.length; i++){
				this.barrierGroup.getChildAt(i).body.velocity.y = barrierSpeed;
			}
			if (barrierSpeed >= 3000){
				barrierSpeed = 1090;
			}
		}

		this.ship.canSwipe = false;
		this.verticalTween.stop();
		this.verticalTween = game.add.tween(this.ship).to({
			y: 860
		}, 
		100, Phaser.Easing.Linear.None, true);
		this.verticalTween.onComplete.add(function(){
			this.verticalTween = game.add.tween(this.ship).to({
				y: 0
			}, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
		}, this)
	},

	addBarrier: function(group, tintColor){
		var barrier = new Barrier(game, barrierSpeed, tintColor);
		game.add.existing(barrier);
		group.add(barrier);
	},



	addQuake: function(){
		// define the camera offset for the quake
		var rumbleOffset = 10;
		// we need to move according to the camera's current position
		var properties = {
		  x: game.camera.x - rumbleOffset
		};
		// we make it a relly fast movement
		var duration = 100;
		// because it will repeat
		var repeat = 4;
		// we use bounce in-out to soften it a little bit
		var ease = Phaser.Easing.Bounce.InOut;
		var autoStart = false;
		// a little delay because we will run it indefinitely
		var delay = 0;
		// we want to go back to the original position
		var yoyo = true;
		var quake = game.add.tween(game.camera)
		  .to(properties, duration, ease, autoStart, delay, 4, yoyo);
		// we're using this line for the example to run indefinitely
		//quake.onComplete.addOnce(addQuake);
		// let the earthquake begins
		quake.start();
},
addCarShake: function(){
		// define the camera offset for the quake
		var rumbleOffset = 10;
		// we need to move according to the camera's current position
		var properties = {
		  x: ship.x - rumbleOffset
		};
		// we make it a relly fast movement
		var duration = 100;
		// because it will repeat
		var repeat = 4;
		// we use bounce in-out to soften it a little bit
		var ease = Phaser.Easing.Bounce.InOut;
		var autoStart = false;
		// a little delay because we will run it indefinitely
		var delay = 0;
		// we want to go back to the original position
		var yoyo = true;
		var quake = game.add.tween(ship.x)
		  .to(properties, duration, ease, autoStart, delay, 4, yoyo);
		// we're using this line for the example to run indefinitely
		//quake.onComplete.addOnce(addQuake);
		// let the earthquake begins
		quake.start();
	}
}
var winStateScreen = function(game){};
winStateScreen.prototype ={
	create:function(){
		console.log("YOU WIN!");

		var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
		titleBG.tint = bgColors[game.rnd.between(0,bgColors.length-1)];
		var closedSign = game.add.image(game.width/2, game.height/2+25, "closedToday");
		var signStyle = {font: "50px Impact", fill: "#ffffff", align: "center", fontWeight: "bold"}
		var closedText = game.add.text(game.width/2, game.height/2-300, "CONGRATULATIONS!\nYOU MADE IT TO WORK \n BUT IT WAS YOUR\nDAY OFF...", signStyle);
		closedSign.anchor.set(0.5);
		closedText.anchor.set(0.5);
		closedText.stroke = '#000000';
		closedText.strokeThickness = 6;
		var playButton = game.add.button(game.width/2, game.height-150,"playbutton", this.startGame, this);
		playButton.anchor.set(0.5);
		//tween(target).to(properties, ease, autoStart, delay, repeat)
		var playButtonTween = game.add.tween(playButton).to({
			width:220,
			height:220
		}, 1500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
		playButtonTween.yoyo(true);
		game.world.camera.position.set(0);
},		

	startGame: function(){
		var doorCloseSound = game.add.audio("AstonButton");
		doorCloseSound.play();
		//reset barrierSpeed back to 280 for next game.
		//barrierSpeed = 480;
		this.fade("TitleScreen");
		//game.state.start("PlayGame");
	},

	fade: function (nextState){
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 0;        
		spr_bg.endFill();        
		this.nextState = nextState;        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 1 }, 500, null)        
		s.onComplete.add(this.changeState, this)        
		s.start();    
	},   
	changeState: function (){        
		this.game.state.start(this.nextState);        
		this.fadeOut();    
	},    
	fadeOut: function (){        
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 1;        
		spr_bg.endFill();        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 0 }, 600, null)        
		s.start();    
	},
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
	create: function(){
		barrierSpeed = 680;
		shipHealth = 1;

		var titleRoadPic = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");

		//var gameOverBG = bgColors[game.rnd.between(0,bgColors.length-1)];
		//var style = {font: "65px Helvetica", fill: "#ff0044", align: "center"}
		//game.stage.backgroundColor = gameOverBG;
		//var text = game.add.text(game.width/2, game.world.centerY+100, "Again?", style);
		//text.anchor.set(0.5);
		//set random background color.
		//game.stage.backgroundColor = bgColors[game.rnd.between(0,bgColors.length-1)];
		var pileUp = game.add.image(game.width.centerX, 400, "pileUp");
		var title = game.add.image(game.width/2, game.height-760, "ragetitle");
		var endStyle = {font: "75px Impact", fill: "#ffffff", align: "center"}
			var endtext = game.add.text(game.width/2, game.height-390, "WRECKED!", endStyle);
			endtext.stroke = '#000000';
			endtext.strokeThickness = 8;
			endtext.anchor.set(0.5);	
	

		title.tint = titleColors[game.rnd.between(0,titleColors.length-1)];
		title.anchor.set(0.5);


		var titleTween = game.add.tween(title).to({
			width:420,
			height:420
		}, 1500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
		titleTween.yoyo(true);
		console.log("game over!");
		var playButton = game.add.button(game.width/2, game.height-150,"playbutton", this.startGame, this);
		playButton.anchor.set(0.5);
		playButton.tint = 0xFCBE12;
		//tween(target).to(properties, ease, autoStart, delay, repeat)
		var playButtonTween = game.add.tween(playButton).to({
			width:220,
			height:220
		}, 1500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
		playButtonTween.yoyo(true);
		game.world.camera.position.set(0);

},		
	startGame: function(){
		var carHonk = game.add.audio("honk");
		carHonk.play();
		//reset barrierSpeed back to 280 for next game.
		//barrierSpeed = 480;
		this.fade("PlayGame");
		//game.state.start("PlayGame");
	},
		//fade to a different state method.
	fade: function (nextState){
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 0;        
		spr_bg.endFill();        
		this.nextState = nextState;        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 1 }, 500, null)        
		s.onComplete.add(this.changeState, this)        
		s.start();    
	},   
	changeState: function (){        
		this.game.state.start(this.nextState);        
		this.fadeOut();    
	},    
	fadeOut: function (){        
		var spr_bg = this.game.add.graphics(0, 0);        
		spr_bg.beginFill(this.fadeColor, 1);        
		spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
		spr_bg.alpha = 1;        
		spr_bg.endFill();        
		s = this.game.add.tween(spr_bg)        
		s.to({ alpha: 0 }, 600, null)        
		s.start();    
	},
}