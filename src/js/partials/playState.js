var spaceKey;
var blocks;
var lava;
var platforms;
var hitPlatform;
var waterPlatforms;
var hitWater;
var flyBlockSpanInterval = 6000;
var timer;
var platformsSpeed=100;
var playerSpeed;
var player; 
var playerJump;
//
var gamePlatforms = {
    createBlock:function(){
        console.log(123);
    }
}
var playState = {
create:function() {

    game.add.sprite(0,0,'background');
    

    platforms = game.add.group(); 

    platforms.enableBody = true; 
    gamePlatforms.createBlock();
    var block = platforms.create(800,500,'flyblock_1');
    block.body.immovable = true;
    var block = platforms.create(300,400,'flyblock_1');
    block.body.immovable = true;
    var block = platforms.create(0,500,'flyblock_1');
    block.body.immovable=true;
    waterPlatforms = game.add.group();
    waterPlatforms.enableBody=true;

    var block = waterPlatforms.create(0,650,'waterBottom');
    block.body.immovable = true;

    player = game.add.sprite(200, game.world.height - 600, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    createFlyBlock();
    
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
    player.animations.play('right');
    player.body.velocity.x += platformsSpeed;
    if (hitWater){
        game.state.start('lose')
    }
    if (playerJump){
            platforms.forEach(function(item) {
                item.body.velocity.x = 0;           
            });
    }
    this.spaceKey.onDown.add(prepareToJump,this)

}
}
function movePlatforms(){
    platforms.forEach(function(item) {
    item.body.velocity.x =-platformsSpeed;}, this);
}
var PlayerJumpPower=0;
function prepareToJump(){
    if (hitPlatform){
              powerBar = game.add.sprite(player.x,player.y-50,"powerbar");
              powerBar.width = 0;
              powerTween = game.add.tween(powerBar).to({
               width:100
            }, 1000, "Linear",true); 
              playerJump=true;
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