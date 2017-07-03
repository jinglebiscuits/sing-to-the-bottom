Sing.MainMenu = function(game) {
	this.player;
	this.pitchDetect;
	this.usePitchDetect = false;
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

		// SW - this is just a test to see stuff happen.
		game.stage.backgroundColor = "#4488AA";
		Sing.COLUMN_SIZE = game.width / 10;
		this.player = new Sing.Player(this.game);
		this.player.show();

		for (var i = 0; i < 10; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFFFF00, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i, 0, 2, game.height);
			circle.endFill();
		}
		for (var i = 0; i < 10; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFF00FF, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i + Sing.COLUMN_SIZE / 2, 0, 1, game.height);
			circle.endFill();
		}

		if (this.usePitchDetect) {
			this.pitchDetect = new PitchDetect(this.game, this.player);
			this.pitchDetect.onCreate();
			this.pitchDetect.toggleLiveInput();
		}
	},

	update: function() {
		// console.log("updating the main menu: " + myPitch);
		// document.body.style.backgroundColor = 'rgb(' + Math.floor(myPitch/2) + ',' + 0 + ',' + 0 + ')';
		if (this.usePitchDetect) {
			this.pitchDetect.updatePitch();
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
	},

	startGame: function(pointer) {

		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	hasGetUserMedia: function() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
};