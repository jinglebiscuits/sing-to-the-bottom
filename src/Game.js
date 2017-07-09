Sing.Game = function(game) {

}

Sing.Game.prototype = {
	create: function() {
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
	},

	update: function() {

	},

	quitGame: function() {
		this.state.start('MainMenu');
	}
};