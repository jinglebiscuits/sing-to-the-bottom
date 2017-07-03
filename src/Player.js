Sing.Player = function(game) {
	this.game = game;
	this.isShowing = false;
	this.circle;
	this._centerY = 0;
	this._centerX = 0;
	
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
		this.circle.owner = this;
		this.circle.beginFill(0xFF0000, 1);
		diameter = Sing.COLUMN_SIZE * 0.75;
		center = Sing.COLUMN_SIZE / 2;
		this._centerY = diameter / 2 + 30;
		this._cetnerX = center;
		this.circle.drawCircle(center, this._centerY, diameter);
		this.circle.endFill();
		isShowing = true;
	},

	startFloating: function() {
		console.log("float baby");
		
	},

	moveTo: function(x = 4, smooth = true) {
		if (isShowing) {
			if (smooth) {
				var slideTween = game.add.tween(this.circle);
				slideTween.to({
					centerX: this.getScreenLocationFromColumn(x),
					centerY: this._centerY
				}, 450, Phaser.Easing.Cubic.InOut);
				slideTween.onComplete.add(function(circle, tween) {
					console.log("cheese balls");
					console.log("centerX = " + circle.owner.centerX);
					circle.owner.centerX = circle.centerX;
					circle.owner.startFloating();
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
	},
	set centerX(centerX) {
		console.log("setting x: " + centerX);
		this._centerX = centerX;
	},
	get centerX() {
		console.log("returning x: " + this._centerX);
		return this._centerX;
	}
}

Sing.Player.prototype.constructor = Sing.Player;