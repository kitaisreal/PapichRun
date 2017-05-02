var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
var star;
var player;

game.state.add('boot',bootState,false);
game.state.add('load',loadState,false);
game.state.add('menu',menuState,false);
game.state.add('play',playState,false);
game.state.add('lose',loseState,false);
game.state.add('settings',settingsState,false);
game.state.add('leaderboard',leaderboardState,false);

game.state.start('boot');