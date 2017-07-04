Sing.UI = function(game) {
	this.game = game;
	this.bracketWidth = 10;
	this.bracketThickness = 4;
};

Sing.UI.prototype = {
	getZone: function(startPoint, columns, height) {
		var topLeftPoly = new Phaser.Polygon(this.getTopLeftArray(startPoint));
		var topRightPoly = new Phaser.Polygon(this.getTopRightArray(Phaser.Point.add(startPoint, new Phaser.Point(Sing.COLUMN_SIZE * columns, 0))));
		var bottomLeftPoly = new Phaser.Polygon(this.getBottomLeftArray(Phaser.Point.add(startPoint, new Phaser.Point(0, height))));
		var bottomRightPoly = new Phaser.Polygon(this.getBottomRightArray(Phaser.Point.add(startPoint, new Phaser.Point(Sing.COLUMN_SIZE * columns, height))));
		var topLeftGraphic = this.getGraphic(topLeftPoly);
		var topRightGraphic = this.getGraphic(topRightPoly);
		var bottomLeftGraphic = this.getGraphic(bottomLeftPoly);
		var bottomRightGraphic = this.getGraphic(bottomRightPoly);
	},

	getTopLeftArray: function(startPoint) {
		var points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, this.bracketWidth)));
		points.push(startPoint);
		console.log(points);
		return points;
	},

	getTopRightArray: function(startPoint) {
		var points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, this.bracketWidth)));
		points.push(startPoint);
		console.log(points);
		return points;
	},

	getBottomLeftArray: function(startPoint) {
		var points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketWidth, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(this.bracketThickness, -this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, -this.bracketWidth)));
		points.push(startPoint);
		console.log(points);
		return points;
	},

	getBottomRightArray: function(startPoint) {
		var points = [];
		points.push(startPoint);
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, 0)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketWidth, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, -this.bracketThickness)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(-this.bracketThickness, -this.bracketWidth)));
		points.push(Phaser.Point.add(startPoint, new Phaser.Point(0, -this.bracketWidth)));
		points.push(startPoint);
		console.log(points);
		return points;
	},

	getGraphic: function(poly) {
		var graphic = this.game.add.graphics(0, 0);
		graphic.beginFill(Sing.BRACKET_COLOR, 1);
		graphic.drawPolygon(poly);
		graphic.endFill();
		return graphic;
	}
}