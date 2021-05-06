export default function createAnims(focus){
    //main character 
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

    //hell
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

    //dungeon
    focus.anims.create({
        key: 'skeleton-idle',
        frames: focus.anims.generateFrameNumbers('skeleton', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'goblin-idle',
        frames: focus.anims.generateFrameNumbers('goblin', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'eye-idle',
        frames: focus.anims.generateFrameNumbers('eye', { start: 0, end: 4 }),
        frameRate: 7,
        repeat: 1
    });

    focus.anims.create({
        key: 'zombie-idle',
        frames: focus.anims.generateFrameNumbers('zombie', { start: 39, end: 42 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'bat-idle',
        frames: focus.anims.generateFrameNumbers('bat', { start: 0, end: 5 }),
        frameRate: 7,
        repeat: 1
    });

    //forest
    focus.anims.create({
        key: 'mushroom-idle',
        frames: focus.anims.generateFrameNumbers('mushroom', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'huntress-idle',
        frames: focus.anims.generateFrameNumbers('huntress', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'cyclop-idle',
        frames: focus.anims.generateFrameNumbers('cyclop', { start: 0, end: 14 }),
        frameRate: 5,
        repeat: 1
    });

    focus.anims.create({
        key: 'worm-idle',
        frames: focus.anims.generateFrameNumbers('worm', { start: 0, end: 9 }),
        frameRate: 5,
        repeat: 1
    });
    


}
