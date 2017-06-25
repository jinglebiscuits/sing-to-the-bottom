var game = new Phaser.Game(480, 640, Phaser.CANVAS, 'game');
        game.state.add('Boot', Sing.Boot);
        game.state.add('Preloader', Sing.Preloader);
        game.state.add('MainMenu', Sing.MainMenu);
        game.state.add('Game', Sing.Game);
        game.state.start('Boot');