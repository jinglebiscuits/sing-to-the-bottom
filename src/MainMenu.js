Sing.MainMenu = function(game) {
	var circle;
	var COLUMN_SIZE
	this.player;
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
		this.player = new Sing.Player(this.game);
		this.player.show();

		this.player.moveTo();
	},

	update: function() {
		// console.log("updating the main menu: " + myPitch);
		// document.body.style.backgroundColor = 'rgb(' + Math.floor(myPitch/2) + ',' + 0 + ',' + 0 + ')';
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