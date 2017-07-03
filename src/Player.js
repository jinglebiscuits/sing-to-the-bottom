Sing.Player = function(game) {
	this.game = game;
	this.isShowing = false;
	this.circle;
	
	this.getScreenLocationFromColumn = function(column) {
		column = Math.min(column, 10);
		colomn = Math.max(1, column);
		offset = (Sing.COLUMN_SIZE - this.circle.getLocalBounds().width) / 2;
		return Sing.COLUMN_SIZE * column - Sing.COLUMN_SIZE / 2 - offset
	};
	this._pitch = 0;
	return this;
}

Sing.Player.prototype = {
	show: function() {
		this.circle = game.add.graphics(0, 0);
		this.circle.beginFill(0xFF0000, 1);
		diameter = Sing.COLUMN_SIZE * 0.75;
		center = Sing.COLUMN_SIZE / 2;
		this.circle.drawCircle(center, diameter / 2, diameter);
		this.circle.endFill();
		isShowing = true;
	},

	moveTo: function(x = 4, smooth) {
		if (isShowing) {
			if (smooth) {
				var slideTween = game.add.tween(this.circle);
				slideTween.to({
					centerX: this.getScreenLocationFromColumn(x)
				}, 450, Phaser.Easing.Cubic.InOut);
				slideTween.onComplete.add(function() {
					console.log("cheese balls");
				});
				slideTween.start();
			} else {
				this.circle.centerX = this.getScreenLocationFromColumn(x);
			}
		}
	},

	set pitch(pitch) {
		this._pitch = pitch;
		this.moveTo(pitch, false);
	},
	get pitch() {
		return this._pitch
	}
}

Sing.Player.prototype.constructor = Sing.Player;