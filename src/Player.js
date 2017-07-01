Sing.Player = function(game) {
	this.game = game;
	this.isShowing = false;
	var circle;

	this.show = function() {
		circle = game.add.graphics(0, 0);
		circle.beginFill(0xFF0000, 1);
		diameter = Sing.COLUMN_SIZE * 0.75;
		center = Sing.COLUMN_SIZE / 2;
		circle.drawCircle(center, diameter/2, diameter);
		circle.endFill();
		isShowing = true;
	};

	this.moveTo = function(x = 4) {
		if (isShowing) {
			var slideTween = game.add.tween(circle);
			slideTween.to({
				centerX: getScreenLocationFromColumn(x)
			}, 450, Phaser.Easing.Cubic.InOut);
			slideTween.onComplete.add(function() {
				console.log("cheese balls");
			});
			slideTween.start();
		}
	}

	var getScreenLocationFromColumn = function(column) {
		column = Math.min(column, 10);
		colomn = Math.max(0, column);
		offset = (Sing.COLUMN_SIZE - circle.getLocalBounds().width)/2;
		return Sing.COLUMN_SIZE * column - Sing.COLUMN_SIZE / 2 - offset};
}

Sing.Player.prototype.constructor = Sing.Player;