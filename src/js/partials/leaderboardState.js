var leaderboardState = {
    create:function(){

        game.add.sprite(0,0,'background');
        game.add.sprite(311.68,97,'bg_highscores');
        BackButton =game.add.button(525.68,518.55,'back_button',this.back_button, this,1,0,2);
       
        
},
    back_button: function(){
        game.state.start('menu')
    }
}
