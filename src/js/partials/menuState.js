var menuState = {
    create:function(){
        game.add.sprite(0,0,'background');
        game.add.sprite(0,0,'background_menu');
        PlayButton = game.add.button(510, 310, 'button_play', this.play, this, 1, 0, 2);
        SettingsButton = game.add.button(510,420.41,'button_settings',this.settings,this,1,0,2);
        LeaderboardButton = game.add.button(510,530.35,'button_highscores',this.leaderboard,this,1,0,2);
    },
    play:function(){
        game.state.start('play') 
    },
    leaderboard:function(){
        game.state.start('leaderboard');
    },
    settings:function(){
        game.state.start('settings') 
    }
}