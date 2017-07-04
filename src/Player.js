Sing.Player = function(game) {
	this.game = game;
	this.isShowing = false;
	this.isMoving = false;
	this.moveTween;
	this.floatTween;
	this.circle;
	this._centerY = 0;
	this._centerX = 0;
	this._currentColumn = 1;

	this.getScreenLocationFromColumn = function(column) {
		column = Math.min(column, Sing.COLUMN_COUNT);
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
		
		this.circle.beginFill(Sing.PLAYER_COLOR, 1);
		diameter = Sing.COLUMN_SIZE * 0.75;
		center = Sing.COLUMN_SIZE / 2;
		this._centerY = diameter / 2 + 30;
		this._cetnerX = center;
		this.circle.drawCircle(center, this._centerY, diameter);
		this.circle.endFill();
		isShowing = true;
	},

	startFloating: function(direction = 1) {
		var dir = -1 * direction;
		var newY = dir * (5 + (2 * Math.random()));
		this.floatTween = game.add.tween(this.circle);
		this.floatTween.to({
			centerY: this._centerY + newY
		}, 1000, Phaser.Easing.Sinusoidal.InOut);
		this.floatTween.onComplete.add(function() {
			this.startFloating(dir);
		}, this);
		this.floatTween.start();
	},

	moveTo: function(x = 4, smooth = true) {
		if (isShowing) {
			if (smooth) {
				if (!this.isMoving) {
					if (this.floatTween) {
						this.floatTween.stop();
					}
					this.isMoving = true;
					this.moveTween = game.add.tween(this.circle);
					this.moveTween.to({
						centerX: this.getScreenLocationFromColumn(x),
						centerY: this._centerY
					}, 450, Phaser.Easing.Cubic.InOut);
					this.moveTween.onComplete.add(function(circle, tween, column) {
						console.log("cheese balls");
						this.currentColumn = column;
						this.centerX = circle.centerX;
						this.isMoving = false;
						this.startFloating();
					}, this, 0, x);
					this.moveTween.start();
				}
			} else {
				this.circle.centerX = this.getScreenLocationFromColumn(x);
			}
		}
	},

	moveRight: function() {
		if (this._currentColumn < Sing.COLUMN_COUNT) {
			this.moveTo(this._currentColumn + 1);
		}
	},

	moveLeft: function() {
		if (this._currentColumn > 1) {
			this.moveTo(this._currentColumn - 1);
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
		this._centerX = centerX;
	},
	get centerX() {
		return this._centerX;
	},
	set currentColumn(column) {
		this._currentColumn = column;
	},
	get currentColumn() {
		return this._currentColumn;
	}
}

Sing.Player.prototype.constructor = Sing.Player;