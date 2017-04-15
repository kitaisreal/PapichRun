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
    game.load.image('block', 'assets/block.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('sky','assets/sky.png');
    game.load.image('powerbar','assets/powerbar.png')
    game.load.image('lava','assets/lava.png')
    game.load.image('background','assets/background.png');
    game.load.image('water','assets/water.png');
    },
    create:function(){
        game.state.start('menu');
    }
}
var menuState = {
    create:function(){
        game.add.sprite(0,0,'sky')
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
var blocks;
var lava;
var platforms;
var hitPlatform;
var waterPlatforms;
var hitWater;
var playState = {
create:function() {

    game.add.sprite(0,0,'background');
    

    platforms = game.add.group();

    platforms.enableBody = true;

    var block = platforms.create(0,640,'block');
    block.body.immovable = true;
    var block = platforms.create(100,640,'block');
    block.body.immovable = true;
    var block = platforms.create(200,640,'block');
    block.body.immovable = true;
    var block = platforms.create(300,640,'block');
    block.body.immovable = true;
    var block = platforms.create(700,380,'block');
    block.body.immovable = true;
    var block = platforms.create(1000,440,'block');
    block.body.immovable = true;
    var block = platforms.create(400,380,'block');
    block.body.immovable = true;

    waterPlatforms = game.add.group();
    waterPlatforms.enableBody=true;

    var block = waterPlatforms.create(428,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(500,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(600,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(700,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(800,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(900,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(1000,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(1100,640,'water');
    block.body.immovable = true;
    var block = waterPlatforms.create(1200,640,'water');
    block.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 500, 'dude');
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

    hitPlatform = game.physics.arcade.collide(player, platforms);
    hitWater = game.physics.arcade.collide(player,waterPlatforms);
    if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    if (hitWater){
        game.state.start('lose')
    }
    this.spaceKey.onDown.add(prepareToJump,this)
}
}
var PlayerJumpPower=0;
function prepareToJump(){
    if (hitPlatform){
              powerBar = game.add.sprite(player.x,player.y-50,"powerbar");
              powerBar.width = 0;
              powerTween = game.add.tween(powerBar).to({
               width:100
            }, 1000, "Linear",true); 
              this.spaceKey.onDown.remove(prepareToJump, this);
              this.spaceKey.onUp.add(jump, this);
          }
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
        
        game.add.sprite(0,0,'sky')
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

var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
var star;
var player;

game.state.add('boot',bootState,false);
game.state.add('load',loadState,false);
game.state.add('menu',menuState,false);
game.state.add('play',playState,false);
game.state.add('lose',loseState,false);

game.state.start('boot');