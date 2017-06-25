Sing.Game = function (game) {

}

Sing.Game.prototype = {
	create: function() {

	},

	update: function() {

	},

	quitGame: function() {
		this.state.start('MainMenu');
	}
};