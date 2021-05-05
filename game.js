import movement from './utils/movement.mjs';

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var enemy;
var player;
var stars;
var platforms;
var cursors;
var battle=0;
var lose=0;
var EnemyHPText;
var PlayerHPText;
var playerHP=100;
var mHood;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('60bpm', 'assets/60_bpm_sample.wav');
    this.load.audio('120bpm', 'assets/120_bpm_sample.wav');
    this.load.audio('120_ADNDA', 'assets/120_ADNDA.wav');
    this.load.image('background', 'assets/temporary_background.png');
    this.load.image('hood','assets/hood.png')
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/starA.png');
    this.load.image('star0', 'assets/starA.png');
    this.load.image('star1', 'assets/starD.png');
    this.load.image('star2', 'assets/starB.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function enemyCreator(type,x,y,scene){
    //if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'bomb').setData({ hp: 50, music: '60bpm', pause: 1000,speed:200, green: 100, red: 100, black: 100 });
    //if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'star').setData({ hp: 70, music: '120bpm', pause: 500,speed:250, green: 100, red: 100, black: 100 });
    if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'bomb').setData({ hp: 70, music: '120_ADNDA', speed:350, pattern: [30,540,1040,1535,2010],pause:2500 ,attacks: [0,1,2,1,0]});
    enemy.add(concreteEnemy);
}
function create ()
{
    var img = this.add.image(600, 450, 'background');
    mHood = this.physics.add.staticGroup();
    mHood.create(1050,450,'hood').refreshBody();

    platforms = this.physics.add.staticGroup();
    platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();
    
    EnemyHPText = this.add.text(930, 16, 'Enemy HP:  0', { fontSize: '32px', fill: '#000' });
    PlayerHPText = this.add.text(930, 50, 'Your HP:  100', { fontSize: '32px', fill: '#000' });
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    
    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group();

    enemy = this.physics.add.group();
    
    enemyCreator(1,250,250,this);
    
    console.log(game);

    this.physics.add.collider(player, mHood);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, enemy, BattleStart, null, this);
    this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);
}

function update ()
{
    movement(cursors,player,battle,lose);
    if(lose==1){
        PlayerHPText.setText('GAME OVER' );
        
    }
    
}
function dropStar(music,enemyinfo,startype,keyA,keyD){
    if(battle==1){
        if(startype==0){
            var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star0');
            star1.setData({ type: 0});
            star1.setVelocityY(enemyinfo.speed);
            star1.setInteractive();
            star1.on('pointerdown',function(){
                    if(keyA.isDown||keyD.isDown) star1.disableBody(true, true);
                    if(keyD.isDown) playerHP=playerHP-10;
                    else if(keyA.isDown) enemyinfo.hp = enemyinfo.hp - 10;
                    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
                    PlayerHPText.setText('Your HP: ' + playerHP);
                    
                    if(enemyinfo.hp<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
        
                        });
            
                    }
                    if(playerHP<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
        
                        });
                        lose=1;
                    }
                

        });
    }
        if(startype==1){
            var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star1');
            star1.setData({ type: 1});
            star1.setVelocityY(enemyinfo.speed);
            star1.setInteractive();
            

            star1.on('pointerdown',function(){
                    if(keyA.isDown||keyD.isDown) star1.disableBody(true, true);
                    if(keyA.isDown) playerHP=playerHP-10;
                    
                    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
                    PlayerHPText.setText('Your HP: ' + playerHP);
                    
                    if(enemyinfo.hp<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
    
                        });
        
                    }
                    if(playerHP<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
    
                        });
                        lose=1;      
                    }
            

            });
        }
        if(startype==2){
            var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star2');
            star1.setData({ type: 2});
            star1.setVelocityY(enemyinfo.speed);
            star1.setInteractive();
            star1.on('pointerdown',function(){
        
                    playerHP=playerHP-10;
                    
                    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
                    PlayerHPText.setText('Your HP: ' + playerHP);
                    star1.disableBody(true, true);
                    if(enemyinfo.hp<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
    
                        });
        
                    }
                    if(playerHP<=0){
                        music.mute=true;
                        battle=0;
                        stars.children.iterate(function (child) {

                            child.disableBody(true, true);
    
                        });
                        lose=1;
        
                    }
            

            });
        }



    }
    else music.mute=true;


     
}
function Battle(enemyinfo,music,scene,keyA,keyD){
    
   
    
    
    
    battle=1;
    
    for (let i = 0;i<5 ; i++) { 
        var timedEvent1 =scene.time.delayedCall(enemyinfo.pattern[i], dropStar,[music,enemyinfo,enemyinfo.attacks[i],keyA,keyD]);
        
        
    }
    var timedEvent1 =scene.time.delayedCall(enemyinfo.pause,BattleContinue,[enemyinfo,music,scene,keyA,keyD] );
    
    music.play({
    loop: false
    });
}
function BattleContinue(enemyinfo,music,scene,keyA,keyD){
    if(battle==1) { Battle (enemyinfo,music,scene,keyA,keyD)};

}
function BattleStart (player, enemy)
{
    var keyA = this.input.keyboard.addKey('A'); 
    var keyD = this.input.keyboard.addKey('D');
    var enemyinfo=enemy.data.list;
    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
    var music = this.sound.add(enemyinfo.music);
    Battle(enemyinfo,music,this,keyA,keyD);
    
    
    enemy.disableBody(true, true);
}

function Star_hit_the_ground (platforms, star)
{
    if(star.data.list.type==1){
        playerHP=playerHP-10;
        PlayerHPText.setText('Your HP: ' + playerHP);
        if(playerHP<=0){
            battle=0;
            stars.children.iterate(function (child) {

                child.disableBody(true, true);

            });
            lose=1;
        } 
    }
    star.disableBody(true, true);
}
