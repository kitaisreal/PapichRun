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
    game.load.image('background_menu','assets/background_menu.jpg')
    game.load.spritesheet('button_big', 'assets/button_big.png', 430, 134);
    game.load.spritesheet('button_small','assets/button_small.png',292,105);
    game.load.image('flyblock_1','assets/flyblock_1.png');
    game.load.image('flyblock_2','assets/flyblock_2.png');
    game.load.image('waterBottom','assets/waterBottom.png');
    },
    create:function(){
        game.state.start('menu');
    }
}
var menuState = {
    create:function(){
        game.add.sprite(0,0,'background_menu')
        PlayButton = game.add.button(426, 168, 'button_big', this.play, this, 1, 1, 0);
        SettingsButton = game.add.button(495,318.41,'button_small',this.settings,this,1,1,0);
        LeaderboardButton = game.add.button(495,438.35,'button_small',this.leaderboard,this,1,1,0);
    },
    update:function(){
    },
    play:function(){
        game.state.start('play')
    },
    leaderboard:function(){
        alert("LEADERBOARD")
    },
    settings:function(){
        alert("SETTINGS")
    }
}
//CONSTANTS
var spaceKey;
var blocks;
var lava;
var platforms;
var hitPlatform;
var waterPlatforms;
var hitWater;
var flyBlockSpanInterval = 12000;
var timer;
var platformsSpeed=0.5;

var playState = {
create:function() {

    game.add.sprite(0,0,'background');
    

    platforms = game.add.group();

    platforms.enableBody = true;

    var block = platforms.create(0,200,'flyblock_1');
    block.body.immovable = true;
    var block = platforms.create(800,500,'flyblock_1');
    block.body.immovable = true;
    var block = platforms.create(300,400,'flyblock_1');
    block.body.immovable = true;

    waterPlatforms = game.add.group();
    waterPlatforms.enableBody=true;

    var block = waterPlatforms.create(0,650,'waterBottom');
    block.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 600, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    createFlyBlock();
    //Create Fly Blocks in Range
    timer = game.time.create(false);
    timer.loop(flyBlockSpanInterval, createFlyBlock, this);
    timer.start();
},
update:function() {
    player.body.velocity.x = 0;

    cursors = game.input.keyboard.createCursorKeys();
    movePlatforms();
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
    console.log("PLAYER X " + player.x + "    PLAYER Y " + player.y)
    this.spaceKey.onDown.add(prepareToJump,this)

}
}
function movePlatforms(){
    platforms.forEach(function(item) {
    item.body.velocity.x = -30;}, this);
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
var block;
function createFlyBlock(){
    var blockNumber = game.rnd.integerInRange(1,2);
    var y = game.rnd.integerInRange(100,500);
    block = game.add.sprite(1300+platforms.x,y,'flyblock_'+blockNumber)
    game.physics.enable(block);
    block.body.immovable = true;
    platforms.add(block);
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