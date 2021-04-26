export default function movement(cursors,player){
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
    
        player.anims.play('right', true);
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
        player.anims.play('turn');
    }
}
