export default function movement(player,battle,lose,lvlUP,focus){
    var keyW = focus.input.keyboard.addKey('W'); 
    var keyA = focus.input.keyboard.addKey('A');
    var keyS = focus.input.keyboard.addKey('S'); 
    var keyD = focus.input.keyboard.addKey('D');
    if(battle==0&&lose==0&&lvlUP==0){
        if (keyA.isDown)
        {
          player.setVelocityX(-130);
          player.anims.play('left', true);
        
        }
        else if (keyD.isDown)
        {
            player.setVelocityX(130);
            player.anims.play('right', true);
        
        }
        else if (keyS.isDown)
        {
            player.setVelocityY(130);
            player.anims.play('left', true);
    
        
        }
        else if (keyW.isDown)
        {
            player.setVelocityY(-130);
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