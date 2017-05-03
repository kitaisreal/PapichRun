var settingsState = {
    create:function(){
        
        game.add.sprite(0,0,'background');
        game.add.sprite(311.68,97,'bg_settings');
        BackButton =game.add.button(525.68,518.55,'back_button',this.back_button, this,1,0,2);
        PlusButton = game.add.button(726.65,287.73,'plus',this.plus_button,this,1,0,2);
        MinusButton = game.add.button(792.84,287.73,'minus',this.minus_button,this,1,0,2);
       game.add.sprite(414.84,242.05,'speaker');
        
},
    back_button: function(){
        game.state.start('menu')
    }
}

// no func for + - buttons!!