import movement from './utils/movement.mjs';
import createAnims from './utils/anims.mjs';

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

var battle=0;
var lose=0;
var EnemyHPText;
var PlayerHPText;
var playerHP=100;
var mHood;
var items;
var game = new Phaser.Game(config);

function preload ()
{
	this.load.image('tiles', 'assets/tileset_dungeon.png');
	this.load.tilemapTiledJSON('map', 'assets/map1.json')
    
    this.load.audio('90_ADNDA', 'assets/90_ADNDA.wav');
    this.load.audio('120_DDDAAAND', 'assets/120_DDDAAAND.wav');
    this.load.audio('180_ADNDDANDDA', 'assets/180_ADNDDANDDA.wav');
    this.load.audio('60_AAAADNDD', 'assets/60_AAAADNDD.wav');
    this.load.audio('150_AADDA', 'assets/150_AADDA.wav');
    

    this.load.image('background', 'assets/temporary_background.png');
    this.load.image('hood','assets/hood.png')
    this.load.image('ground', 'assets/platform.png');

    this.load.image('star0', 'assets/starA.png');
    this.load.image('star1', 'assets/starD.png');
    this.load.image('star2', 'assets/starB.png');

    this.load.spritesheet('run_right', 'assets/main_char_anims/run.png', { frameWidth: 184, frameHeight: 137 });
    this.load.spritesheet('idle', 'assets/main_char_anims/idle.png', { frameWidth: 184, frameHeight: 137 });
    this.load.spritesheet('run_left', 'assets/main_char_anims/run_left.png', { frameWidth: 184, frameHeight: 137 });
    //hell
    this.load.spritesheet('demon', 'assets/hell_anims/demon-idle.png', { frameWidth: 160, frameHeight: 144 });
    this.load.spritesheet('ghost', 'assets/hell_anims/ghost-idle.png', { frameWidth: 64, frameHeight: 80 });
    this.load.spritesheet('hell-beast', 'assets/hell_anims/hell-beast-idle.png', { frameWidth: 55, frameHeight: 67 });
    this.load.spritesheet('hell-hound', 'assets/hell_anims/hell-hound-idle.png', { frameWidth: 64, frameHeight: 32 });
    this.load.spritesheet('nightmare', 'assets/hell_anims/nightmare-idle.png', { frameWidth: 128, frameHeight: 96 });
    //dungeon
    this.load.spritesheet('skeleton', 'assets/dungeon_anims/skeleton-idle.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('goblin', 'assets/dungeon_anims/goblin-idle.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('eye', 'assets/dungeon_anims/eye-idle.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('zombie', 'assets/dungeon_anims/zombie-idle.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('bat', 'assets/dungeon_anims/bat-idle.png', { frameWidth: 16, frameHeight: 24 }); //setScale(1.5)
    //forest 
    this.load.spritesheet('mushroom', 'assets/forest_anims/mushroom-idle.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('huntress', 'assets/forest_anims/huntress-idle.png', { frameWidth: 150, frameHeight: 150 });
    this.load.spritesheet('cyclop', 'assets/forest_anims/cyclop-idle.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('worm', 'assets/forest_anims/worm-idle.png', { frameWidth: 64, frameHeight: 64 });

    this.load.image('invibcible_shield', 'assets/items/invibcible_shield.png');

}
function enemyCreator(type,x,y,scene){

    if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'nightmare').setData({animation:'nightmare-idle', hp: 70, music: '90_ADNDA', speed:350, pattern: [10,350,675,835,1005],satrnumber: 5,pause:1400 ,attacks: [0,1,2,1,0]});
 
    if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'demon').setData({animation:'demon-idle', hp: 40, music: '180_ADNDDANDDA', speed:300, pattern: [28,210,365,540,710,855,1030,1190,1370,1530],satrnumber: 10,pause:2000 ,attacks: [0,1,2,1,1,0,2,1,1,0]});
    if(type==3) var concreteEnemy= scene.physics.add.sprite(x, y, 'ghost').setData({animation:'ghost-idle', hp: 50, music: '120_DDDAAAND', speed:300, pattern: [35,535,1035,1510,1770,2020,2270,2510],satrnumber: 8,pause:3000 ,attacks: [1,1,1,0,0,0,2,1]});
    if(type==4) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-beast').setData({animation:'hell-beast-idle', hp: 80, music: '60_AAAADNDD', speed:300, pattern: [30,770,1270,1525,1780,2020,2215,2530],satrnumber: 8,pause:3000 ,attacks: [0,0,0,0,1,2,1,1]});
    if(type==5) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-hound').setData({animation:'hell-hound-idle', hp: 60, music: '150_AADDA', speed:330, pattern: [10,110,215,515,810],satrnumber: 5,pause:1500 ,attacks: [0,0,1,1,0]});
    
    if(type==6) var concreteEnemy= scene.physics.add.sprite(x, y, 'worm').setData({animation:'worm-idle', hp: 60, music: '150_AADDA', speed:330, pattern: [10,110,215,515,810],satrnumber: 5,pause:1500 ,attacks: [0,0,1,1,0]});
    //just 4 test ^
    enemy.add(concreteEnemy);
}
function create ()
{
     ///карта и окружение
    var img = this.add.image(600, 450, 'background');
	const map = this.make.tilemap({key: 'map'})
	const tileset = map.addTilesetImage('tileset_dungeon', 'tiles', 32, 32, 0, 0);
	const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    

    //худ и платформа для звёзд
    mHood = this.physics.add.staticGroup();
    mHood.create(1050,450,'hood').refreshBody();
    
    var shield = this.add.image(600, 450, 'invibcible_shield');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();
    
    //текст
    EnemyHPText = this.add.text(930, 16, 'Enemy HP:  0', { fontSize: '32px', fill: '#000' });
    PlayerHPText = this.add.text(930, 50, 'Your HP:  100', { fontSize: '32px', fill: '#000' });
    
    //игрок
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //создание анимаций
    createAnims(this);
    
   
    //создание физической группы для звёзд
    stars = this.physics.add.group();

    //создание физической группы для противников
    enemy = this.physics.add.group();


    //создание физической группы для предметов
    items = this.physics.add.group();

    //черновая отрисовкак противников
    enemyCreator(1,250,250,this);
    enemyCreator(2,200,650,this);
    enemyCreator(3,400,650,this);
    enemyCreator(4,600,650,this);
    enemyCreator(5,400,400,this);

    enemyCreator(6,400,100,this);//test

    //коллайдеры и оверлапы
    this.physics.add.collider(player, mHood);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, enemy, BattleStart, null, this);
    this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);
}

function update ()
{
    movement(player,battle,lose,this);
    if(lose==1){
        PlayerHPText.setText('GAME OVER' );
        
    }
    enemy.children.iterate(function (child) {

        child.anims.play(child.data.list.animation,true);

    });
    
}
function dropStar(music,enemyinfo,startype,keyA,keyD){
    if(battle==1&&enemyinfo.hp>0){
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
    
    for (let i = 0;i<enemyinfo.satrnumber ; i++) { 
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
