Sing.UI = function(game) {
	this.game = game;
	this.bracketWidth = 10;
	this.bracketThickness = 4;
};

Sing.UI.prototype = {
	getZone: function(startPoint, columns, height) {
		const zone = game.add.sprite((columns - 1) * Sing.COLUMN_SIZE, 0, new Phaser.RenderTexture(game, Sing.COLUMN_SIZE, height), "zone");
		// zone.right = columns * Sing.COLUMN_SIZE;
		game.physics.arcade.enable(zone);
		// startPoint = Phaser.Point.add(startPoint, new Phaser.Point(-Sing.COLUMN_SIZE / 2, -height / 2));
		const topLeftPoly = new Phaser.Polygon(this.getTopLeftArray(startPoint));
		const topRightPoly = new Phaser.Polygon(this.getTopRightArray(Phaser.Point.add(startPoint, new Phaser.Point(Sing.COLUMN_SIZE, 0))));
		const bottomLeftPoly = new Phaser.Polygon(this.getBottomLeftArray(Phaser.Point.add(startPoint, new Phaser.Point(0, height))));
		const bottomRightPoly = new Phaser.Polygon(this.getBottomRightArray(Phaser.Point.add(startPoint, new Phaser.Point(Sing.COLUMN_SIZE, height))));
		const topLeftGraphic = this.getGraphic(topLeftPoly);
		const topRightGraphic = this.getGraphic(topRightPoly);
		const bottomLeftGraphic = this.getGraphic(bottomLeftPoly);
		const bottomRightGraphic = this.getGraphic(bottomRightPoly);
		zone.addChild(topLeftGraphic);
		zone.addChild(topRightGraphic);
		zone.addChild(bottomLeftGraphic);
		zone.addChild(bottomRightGraphic);
		zone.triggered = false;
		return zone;
	},

	getTopLeftArray: function(startPoint) {
		const points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, this.bracketWidth)));
		points.push(startPoint);
		return points;
	},

	getTopRightArray: function(startPoint) {
		const points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, this.bracketWidth)));
		points.push(startPoint);
		return points;
	},

	getBottomLeftArray: function(startPoint) {
		const points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, -this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, -this.bracketWidth)));
		points.push(startPoint);
		return points;
	},

	getBottomRightArray: function(startPoint) {
		const points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, -this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, -this.bracketWidth)));
		points.push(startPoint);
		return points;
	},

	getGraphic: function(poly) {
		const graphic = this.game.add.graphics(0, 0);
		graphic.beginFill(Sing.BRACKET_COLOR, 1);
		graphic.drawPolygon(poly);
		graphic.endFill();
		return graphic;
	}
}