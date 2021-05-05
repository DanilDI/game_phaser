export default function movement(cursors,player,battle,lose,focus){
    var keyW = focus.input.keyboard.addKey('W'); 
    var keyA = focus.input.keyboard.addKey('A');
    var keyS = focus.input.keyboard.addKey('S'); 
    var keyD = focus.input.keyboard.addKey('D');
    if(battle==0&&lose==0){
        if (keyA.isDown)
        {
          player.setVelocityX(-160);
          player.anims.play('left', true);
        
        }
        else if (keyD.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        
        }
        else if (keyS.isDown)
        {
            player.setVelocityY(160);
            player.anims.play('left', true);
    
        
        }
        else if (keyW.isDown)
        {
            player.setVelocityY(-160);
            player.anims.play('right', true);
        
        
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('idle',true);
        }
    }
    else{
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('idle',true);
    }
}
