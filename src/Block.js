Sing.Block = function(game, playerSprite) {
	this.game = game;
	this.playerSprite = playerSprite;
	this.blockArray = [];
}

Sing.Block.prototype = {
	getBlock: function(startX, startY) {
		console.log("point: " + startX + " " + startY);
		const rect = new Phaser.Graphics(this.game);
		rect.beginFill(0xFFFFFF, 1);
		rect.drawRect(0, 0, Sing.COLUMN_SIZE, 56);
		rect.endFill();
		const block = this.game.add.sprite(startX, startY, rect.generateTexture());
		game.physics.arcade.enable(block);
		let destination = -1 * (block.height - 1);
		let speed = Math.abs(block.y - destination) * Sing.BLOCK_SPEED;
		game.add.tween(block.body).to({
			y: destination
		}, speed, Phaser.Easing.Linear.None, true);
		return block;
	},

	startLevel: function(level) {
		for (let i = 0; i < 5; i++) {
			this.blockArray.push(this.getBlock(Math.random() * 200, this.game.height + 1000 - Math.random() * 1000));
		}
		console.log(this.blockArray);
	},

	collisionHandler: function(obj1, obj2) {
		obj2.kill();
	},

	update: function() {
		for (let i = 0; i < this.blockArray.length; i ++) {
			game.physics.arcade.overlap(this.playerSprite, this.blockArray[i], this.collisionHandler, null, this);
		}
	}
}