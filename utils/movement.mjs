export default function movement(cursors,player,battle,lose){

    if(battle==0&&lose==0){
        if (cursors.left.isDown)
        {
          player.setVelocityX(-160);
          player.anims.play('left', true);
        
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(160);
            player.anims.play('left', true);
    
        
        }
        else if (cursors.up.isDown)
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
