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
    game.load.image('background_menu','assets/background_menu.png')
    game.load.spritesheet('button_big', 'assets/button_big.png', 430, 134);
    game.load.spritesheet('button_small','assets/button_small.png',292,105);
    game.load.spritesheet('button_highscores','assets/highscores_button.png',272,96);
    game.load.spritesheet('button_play','assets/play_button.png',272,94);
    game.load.spritesheet('button_settings','assets/options_button.png',272,95)
    game.load.image('flyblock_1','assets/flyblock_1.png');
    game.load.image('flyblock_2','assets/flyblock_2.png');
    game.load.image('waterBottom','assets/waterBottom.png');
        // settings
//-------------------------------------------------------------

    game.load.spritesheet('back_button','assets/settings/back.png',229,99);
    game.load.image('speaker', 'assets/settings/speaker.png');
    game.load.spritesheet('plus','assets/settings/plus.png',59,59);
    game.load.spritesheet('minus','assets/settings/minus.png',59,59);
    game.load.image('bg_settings','assets/settings/bg_22.png');
    
//  --------------highscores --------------------------
    game.load.image('bg_highscores','assets/highscores/bg_highscores.png');
  },  
    create:function(){
        game.state.start('menu');
    }
}