var bootState = {
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
}

var loadState = {
    preload:function(){
    var loadingLabel = game.add.text(game.world.width / 3, game.world.height / 2, 'loading...', {
            font: '32px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
    this.loadAssets();
    },
    loadAssets:function(){
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('sky','assets/sky.png');
    game.load.image('powerbar','assets/powerbar.png')
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
    game.add.sprite(0,0,'sky');
    star = game.add.sprite(500, 550, 'star');
    star.checkWorldBounds = true;
     star.events.onOutOfBounds.add(function(star) {
        alert("EBAL")
                    pipe.kill();
                });
    game.physics.arcade.enable(star);

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
},
update:function() {
    cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    var hitStar = game.physics.arcade.collide(player, star);

    if (cursors.right.isDown)
    {
        player.body.velocity.x = 50;
        player.animations.play('right');
    }
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -50;
        player.animations.play('left');
    }
    if (hitStar){
        game.state.start('lose')
    }
    this.spaceKey.onDown.add(prepareToJump,this)
}
}
var PlayerJumpPower=0;
function prepareToJump(){
              powerBar = game.add.sprite(player.x,player.y-50,"powerbar");
              powerBar.width = 0;
              powerTween = game.add.tween(powerBar).to({
               width:100
            }, 1000, "Linear",true); 
              this.spaceKey.onDown.remove(prepareToJump, this);
              this.spaceKey.onUp.add(jump, this);
          }       
function jump(){
    PlayerJumpPower= -powerBar.width*2-100
    powerBar.destroy();
    game.tweens.removeAll();
    player.body.velocity.y = PlayerJumpPower*1.5;
    powerTween.stop();
    this.spaceKey.onUp.remove(jump, this);
}       
var loseState = {
    create:function(){
        var loadingLabel = game.add.text(game.world.width / 3, game.world.height / 2, 'You lost (Restart - Space)', {
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

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
var star;
var player;

game.state.add('boot',bootState,false);
game.state.add('load',loadState,false);
game.state.add('menu',menuState,false);
game.state.add('play',playState,false);
game.state.add('lose',loseState,false);

game.state.start('boot');