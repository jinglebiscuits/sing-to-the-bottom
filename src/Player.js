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
	this._playerSprite;

	this.getScreenLocationFromColumn = function(column) {
		column = Math.min(column, Sing.COLUMN_COUNT);
		colomn = Math.max(1, column);
		return Sing.COLUMN_SIZE * column - Sing.COLUMN_SIZE / 2;
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
		this._centerX = center;
		
		this.circle.drawCircle(diameter / 2, diameter / 2, diameter);
		this.circle.endFill();
		console.log("circle width: " + this.circle.getLocalBounds().width);
		this._playerSprite = game.add.sprite(0 , 0, new Phaser.RenderTexture(game, diameter, diameter));
		this._playerSprite.addChild(this.circle);
		console.log("spriteWidth: " + this._playerSprite.width);
		this._playerSprite.centerX = center;
		this._playerSprite.centerY = center + 30;
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
					this.moveTween = game.add.tween(this._playerSprite);
					this.moveTween.to({
						centerX: this.getScreenLocationFromColumn(x),
						centerY: this._centerY
					}, 450, Phaser.Easing.Cubic.InOut);
					this.moveTween.onComplete.add(function(player, tween, column) {
						console.log("cheese balls");
						this.currentColumn = column;
						this.centerX = player.x;
						this.isMoving = false;
						this.startFloating();
					}, this, 0, x);
					this.moveTween.start();
				}
			} else {
				this._playerSprite.x = this.getScreenLocationFromColumn(x);
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
	},
	get playerSprite() {
		return this._playerSprite;
	}
}

Sing.Player.prototype.constructor = Sing.Player;