var leaderboardState = {
    create:function(){
        
        game.add.sprite(0,0,'sky')
        var loadingLabel = game.add.text(game.world.width / 3, game.world.height / 2, 'LEADERBOARD!!!', {
            font: '32px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        var BackButton = game.add.button(426, 500, 'button_small', this.back, this, 1, 1, 0);
    },
    back:function(){
        game.state.start('menu') 
    }
}
