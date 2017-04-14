var bootState = {
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
}

function loadAssets() {
};

var loadState = {
    preload:function(){
    var loadingLabel = game.add.text(game.world.width / 3, game.world.height / 2, 'loading...', {
            font: '32px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
    loadAssets();
    },
    create:function(){
        game.state.start('menu');
    }
}
var menuState = {
    create:function(){
        var loadingLabel = game.add.text(game.world.width / 3, game.world.height / 2, 'Press Spase to Start Game', {
            font: '32px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update:function(){
         if (this.spaceKey.isDown)
    {
        this.start()
    }
    },
    start:function(){
        game.state.start('play')
    }
}

var spaceKey;
var playState = {
create:function() {
},
update:function() {
}
}

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('boot',bootState,false);
game.state.add('load',loadState,false);
game.state.add('menu',menuState,false);
game.state.add('play',playState,false);

game.state.start('boot');