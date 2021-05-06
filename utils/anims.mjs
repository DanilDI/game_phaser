export default function createAnims(focus){
    focus.anims.create({
        key: 'left',
        frames: focus.anims.generateFrameNumbers('run_left', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    
    focus.anims.create({
        key: 'idle',
        frames: focus.anims.generateFrameNumbers('idle', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 1
    });
    
    focus.anims.create({
        key: 'right',
        frames: focus.anims.generateFrameNumbers('run_right', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    
    focus.anims.create({
        key: 'demon-idle',
        frames: focus.anims.generateFrameNumbers('demon', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 1
    });
    
    focus.anims.create({
        key: 'ghost-idle',
        frames: focus.anims.generateFrameNumbers('ghost', { start: 0, end: 6 }),
        frameRate: 5,
        repeat: 1
    });
    focus.anims.create({
        key: 'hell-beast-idle',
        frames: focus.anims.generateFrameNumbers('hell-beast', { start: 0, end: 5 }),
        frameRate: 7,
        repeat: 1
    });
    focus.anims.create({
        key: 'hell-hound-idle',
        frames: focus.anims.generateFrameNumbers('hell-hound', { start: 0, end: 5 }),
        frameRate: 4,
        repeat: 1
    });
    
    focus.anims.create({
        key: 'nightmare-idle',
        frames: focus.anims.generateFrameNumbers('nightmare', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 1
    });
}
