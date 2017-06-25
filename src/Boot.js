Sing = {
	// global variables
	/* Your game can check Sing.orientated in internal loops to know if it should pause or not */
    orientated: false
};

Sing.Boot = function(game) {

};

Sing.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'images/preload.png');
	},

	create: function() {
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 240;
            this.scale.minHeight = 320;
            this.scale.maxWidth = 480;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.updateLayout(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 260;
            this.scale.minHeight = 480;
            // this.scale.maxWidth = 768;
            // this.scale.maxHeight = 1024;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.updateLayout(true);
        }

        this.state.start('Preloader');
	},

	gameResized: function(width, height) {

	},

	enterIncorrectOrientation: function() {
		Sing.orientated = false;
		document.getElementById('orientation').style.display = 'block';
	},

	leaveIncorrectOrientation: function () {
		Sing.orientated = true;
		document.getElementById('orientation').style.display = 'none';
	}
}