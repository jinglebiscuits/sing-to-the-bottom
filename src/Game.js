Sing.Game = function(game) {
	this.player;
	this.block;
}

Sing.Game.prototype = {
	create: function() {
		for (let i = 0; i < Sing.COLUMN_COUNT; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFFFF00, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i, 0, 2, game.height);
			circle.endFill();
		}
		for (let i = 0; i < Sing.COLUMN_COUNT; i++) {
			circle = game.add.graphics(0, 0);
			circle.beginFill(0xFF00FF, 1);
			circle.drawRect(Sing.COLUMN_SIZE * i + Sing.COLUMN_SIZE / 2, 0, 1, game.height);
			circle.endFill();
		}

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = new Sing.Player(this.game);
		this.player.show();

		this.block = new Sing.Block(this.game, this.player.playerSprite);
		this.block.startLevel(1);
	},

	update: function() {
		this.block.update();

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

	quitGame: function() {
		this.state.start('MainMenu');
	}
};