Sing.MainMenu = function(game) {
	this.player;
	this.pitchDetect;
	this.myPoly;
	this.myGraphicPoly;
	this.zone1;
	this.zone2;
	this.ui = new Sing.UI(game);
};

Sing.MainMenu.prototype = {

	create: function() {

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

		// this.add.sprite(0, 51, 'titlepage');

		// this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

		// this.input.onDown.addOnce(this.startGame, this);

		// if (this.hasGetUserMedia) {
		// 	alert('we got the mic');
		// 	navigator.getUserMedia({
		// 		audio: true
		// 	});
		// } else {
		// 	alert('getUserMedia() is not supported in your browser');
		// }
		for (var i = 0; i < Sing.COLUMN_COUNT; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFFFF00, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i, 0, 2, game.height);
			circle.endFill();
		}
		for (var i = 0; i < Sing.COLUMN_COUNT; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFF00FF, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i + Sing.COLUMN_SIZE / 2, 0, 1, game.height);
			circle.endFill();
		}

		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.zone1 = this.ui.getZone(new Phaser.Point(0, 0), 1, Sing.COLUMN_SIZE * 2);
		this.zone2 = this.ui.getZone(new Phaser.Point(0, 0), 9, Sing.COLUMN_SIZE * 2);
		// this.zone1.x = Sing.COLUMN_SIZE * 3;

		game.stage.backgroundColor = Sing.BACKGROUND_COLOR;
		this.player = new Sing.Player(this.game);
		this.player.show();

		if (Sing.usePitchDetect) {
			this.pitchDetect = new PitchDetect(this.game, this.player);
			this.pitchDetect.onCreate();
			this.pitchDetect.toggleLiveInput();
		} else {
			// this.player.moveTo(5);
		}
		var playerSprite = this.player.playerSprite;
	},

	overlapHandler: function(obj1, obj2) {
		obj1.getChildAt(0).tint = 0xFFFFFF;
		if (this.isContainedBy(obj1, obj2)){
			obj1.getChildAt(0).tint = 0x00FFFF;
			obj2.triggered = true;
		} else {
			obj1.getChildAt(0).tint = 0xFF0000;
		}
	},

	isContainedBy: function(obj, container) {
		return obj.x > container.x && container.width > (obj.x - container.x + obj.width);
	},

	update: function() {
		game.physics.arcade.overlap(this.player.playerSprite, [this.zone1, this.zone2], this.overlapHandler, null, this);
		// console.log("updating the main menu: " + myPitch);
		// document.body.style.backgroundColor = 'rgb(' + Math.floor(myPitch/2) + ',' + 0 + ',' + 0 + ')';
		if (Sing.usePitchDetect) {
			this.pitchDetect.updatePitch();
		}
		if (this.zone1.triggered && this.zone2.triggered) {
			console.log("go on and win");
			this.startGame();
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.ZERO)) {
			this.player.moveTo(10);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.ONE)) {
			this.player.moveTo(1);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.TWO)) {
			this.player.moveTo(2);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.THREE)) {
			this.player.moveTo(3);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.FOUR)) {
			this.player.moveTo(4);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.FIVE)) {
			this.player.moveTo(5);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.SIX)) {
			this.player.moveTo(6);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.SEVEN)) {
			this.player.moveTo(7);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.EIGHT)) {
			this.player.moveTo(8);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.NINE)) {
			this.player.moveTo(9);
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
			this.player.moveRight();
		}
		if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
			this.player.moveLeft();
		}
	},

	render: function() {
		// game.debug.body(this.player.playerSprite);
		// game.debug.body(this.zone1);
	},

	startGame: function(pointer) {

		// var centerPlayerTween = game.add.tween
		this.player.moveTo(5, true, 2000, function() {
			game.state.start('Game');
		})

		//	And start the actual game
		// this.state.start('Game');

	},

	hasGetUserMedia: function() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
};