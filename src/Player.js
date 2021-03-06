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
		offset = (Sing.COLUMN_SIZE - this._playerSprite.width) * 1.5;
		console.log("offset: " + offset);
		return Sing.COLUMN_SIZE * column - Sing.COLUMN_SIZE / 2 - offset
	};
	this._pitch = 0;
	return this;
}

Sing.Player.prototype = {
	show: function() {
		diameter = Sing.COLUMN_SIZE * 0.75;
		center = Sing.COLUMN_SIZE / 2;
		this._centerY = diameter / 2 + 30;
		this._centerX = center;

		this.circle = game.add.graphics(0, 0);
		this.circle.beginFill(Sing.PLAYER_COLOR, 1);
		this.circle.drawCircle(diameter / 2, diameter / 2, diameter);
		this.circle.endFill();
		this.circle.tint = 0xFF0000

		console.log("circle width: " + this.circle.getLocalBounds().width + "\nColumn width: " + Sing.COLUMN_SIZE);
		this._playerSprite = game.add.sprite(game.width/2, this._centerY, new Phaser.RenderTexture(game, diameter, diameter), "player");
		game.physics.arcade.enable(this._playerSprite);
		this._playerSprite.body.setCircle(diameter / 2);
		this._playerSprite.addChild(this.circle);
		// this._playerSprite.addChild(this.circle);
		console.log("spriteWidth: " + this._playerSprite.width);
		this._centerX = this._playerSprite.centerX;
		// this._playerSprite.centerY = center + 30;
		isShowing = true;
		this.moveTo(5);
		console.log(this.getScreenLocationFromColumn(5));
		// this.moveTo(5);
	},

	startFloating: function(direction = 1) {
		const dir = -1 * direction;
		const newY = dir * (5 + (2 * Math.random()));
		this.floatTween = game.add.tween(this._playerSprite.body);
		this.floatTween.to({
			y: this._centerY + newY
		}, 1000, Phaser.Easing.Sinusoidal.InOut);
		this.floatTween.onComplete.add(function() {
			this.startFloating(dir);
		}, this);
		this.floatTween.start();
	},

	moveTo: function(x = 4, smooth = true, time = 450, callBack) {
		if (isShowing) {
			if (smooth) {
				if (!this.isMoving) {
					console.log("before x is " + this._playerSprite.body.x);
					if (this.floatTween) {
						this.floatTween.stop();
					}
					this.isMoving = true;
					this.moveTween = game.add.tween(this._playerSprite.body);
					this.moveTween.to({
						x: this.getScreenLocationFromColumn(x),
						y: this._centerY
					}, time, Phaser.Easing.Cubic.InOut);
					this.moveTween.onComplete.add(function(player, tween, column, callback) {
						console.log("cheese balls");
						console.log("after x is " + this._playerSprite.body.x);
						this.currentColumn = column;
						this.centerX = player.x;
						this.isMoving = false;
						this.startFloating();
						if (callback) {
							callback();
						}
					}, this, 0, x, callBack);
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