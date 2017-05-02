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

