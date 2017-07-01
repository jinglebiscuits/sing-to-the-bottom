Sing.Player = function(game) {
	this.game = game;
	this.isShowing = false;
	var circle;

	this.show = function() {
		COLUMN_SIZE = game.width / 10;
		circle = game.add.graphics(0, 0);
		circle.beginFill(0xFF0000, 1);
		circle.drawCircle(COLUMN_SIZE / 2, COLUMN_SIZE / 2, COLUMN_SIZE * 0.75);
		circle.endFill();
		isShowing = true;
	};

	this.moveTo = function() {
		if (isShowing) {
			var slideTween = game.add.tween(circle);
			slideTween.to({
				centerX: 300
			}, 1000, Phaser.Easing.Cubic.InOut);
			slideTween.onComplete.add(function() {
				console.log("cheese balls");
			});
			slideTween.start();
		}
	}
}

Sing.Player.prototype.constructor = Sing.Player;