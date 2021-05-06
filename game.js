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

var stars;
var platforms;

var battle=0;
var lose=0;

var player;
var EnemyHPText;
var PlayerHPText;
var playerHP=100;
var playerMAXHP=100;
var damage=10;
var armour=0;//пока негде не юзаю




var mHood;

var game = new Phaser.Game(config);



var items;
var hp_flask_small_Text;
var hp_flask_large_Text;
var dmg_boost_Text;
var invincible_Text;
var parry_shield_Text;

var items_button;


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
    //items
    this.load.image('invibcible_shield', 'assets/items/invibcible_shield.png');
    this.load.image('blade_mail', 'assets/items/blade_mail.png');
    this.load.image('dmg_boost', 'assets/items/dmg_boost.png');
    this.load.image('s_heal', 'assets/items/s_heal.png');
    this.load.image('l_heal', 'assets/items/l_heal.png');
    //buttons
    this.load.image('l_heal_button', 'assets/buttons/l_heal_button.png');
    this.load.image('s_heal_button', 'assets/buttons/s_heal_button.png');
    this.load.image('dmg_boost_button', 'assets/buttons/dmg_boost_button.png');
    this.load.image('invincible_shield_button', 'assets/buttons/invincible_shield_button.png');
    this.load.image('blade_mail_button', 'assets/buttons/blade_mail_button.png');


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
function itemCreator(type,x,y,scene){

    if(type==1) var concreteItem= scene.physics.add.sprite(x, y, 's_heal').setData({type: 1});
    if(type==2) var concreteItem= scene.physics.add.sprite(x, y, 'l_heal').setData({type: 2});
    if(type==3) var concreteItem= scene.physics.add.sprite(x, y, 'dmg_boost').setData({type: 3});
    if(type==4) var concreteItem= scene.physics.add.sprite(x, y, 'invibcible_shield').setData({type: 4});
    if(type==5) var concreteItem= scene.physics.add.sprite(x, y, 'blade_mail').setData({type: 5});
    items.add(concreteItem);
}
function itemButtonCreator(scene){
    
    items_button.create(931, 120, 's_heal_button').setData({type: 1}).setInteractive();
    items_button.create(990, 120, 'l_heal_button').setData({type: 2}).setInteractive();
    items_button.create(1050, 120, 'dmg_boost_button').setData({type: 3}).setInteractive();
    items_button.create(1110, 120, 'invincible_shield_button').setData({type: 4}).setInteractive();
    items_button.create(1170, 120, 'blade_mail_button').setData({type: 5}).setInteractive();

    items_button.children.iterate(function (child) {


        child.on('pointerdown',function(){
            var type=child.data.list.type;
            if(battle==0){
                if(type==1){
                    if(player.data.list.hp_flask_small>0){
                        player.data.list.hp_flask_small-=1;
                        playerHP+=20;
                        if(playerHP>playerMAXHP) playerHP=playerMAXHP;
                        PlayerHPText.setText('Your HP:  '+playerHP);
                        hp_flask_small_Text.setText(player.data.list.hp_flask_small);
                    }
                }    
                if(type==2){
                    if(player.data.list.hp_flask_large>0){
                        player.data.list.hp_flask_large-=1;
                        playerHP+=50;
                        if(playerHP>playerMAXHP) playerHP=playerMAXHP;
                        PlayerHPText.setText('Your HP:  '+playerHP);
                        hp_flask_large_Text.setText(player.data.list.hp_flask_large);
                    }
                }
                if(type==3){
                    if(player.data.list.dmg_boost>0){
                        player.data.list.dmg_boost-=1;
                        player.data.list.dmg_boost_active=true
                        dmg_boost_Text.setText(player.data.list.dmg_boost+'|A');
                    }
                }
                if(type==4){
                    if(player.data.list.invincible>0){
                        player.data.list.invincible-=1;
                        player.data.list.invincible_active=5;
                        invincible_Text.setText(player.data.list.invincible+'|'+player.data.list.invincible_active);
                    }
                }
                if(type==5){
                    if(player.data.list.parry_shield>0){
                        player.data.list.parry_shield-=1;
                        player.data.list.parry_shield_active=true;
                        parry_shield_Text.setText(player.data.list.parry_shield+'|A');
                    }
                }
            }
        });
    });
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
    
 
    
    platforms = this.physics.add.staticGroup();
    platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();
    
    //текст
    EnemyHPText = this.add.text(930, 16, 'Enemy HP:  0', { fontSize: '32px', fill: '#000' });
    PlayerHPText = this.add.text(930, 50, 'Your HP:  100', { fontSize: '32px', fill: '#000' });

    hp_flask_small_Text = this.add.text(930, 150, '0', { fontSize: '32px', fill: '#000' });
    hp_flask_large_Text = this.add.text(980, 150, '0', { fontSize: '32px', fill: '#000' });
    dmg_boost_Text = this.add.text(1010, 150, '0|D', { fontSize: '32px', fill: '#000' });
    invincible_Text = this.add.text(1075, 150, '0|0', { fontSize: '32px', fill: '#000' });
    parry_shield_Text = this.add.text(1133, 150, '0|D', { fontSize: '32px', fill: '#000' });
 

    //игрок
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setData({hp_flask_small: 0, hp_flask_large: 0, dmg_boost: 0, invincible: 0, parry_shield: 0, dmg_boost_active: false,invincible_active: 0, parry_shield_active: false})
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
    items_button = this.physics.add.group();

    //черновая отрисовкак противников
    enemyCreator(1,250,250,this);
    enemyCreator(2,200,650,this);
    enemyCreator(3,400,650,this);
    enemyCreator(4,600,650,this);
    enemyCreator(5,400,400,this);

    enemyCreator(6,400,100,this);//test


    //черновая отрисовкак прeдметов
    itemCreator(1,100,800,this);
    itemCreator(2,200,800,this);
    itemCreator(3,400,800,this);
    itemCreator(4,600,800,this);
    itemCreator(5,700,800,this);
    itemButtonCreator(this);

    //коллайдеры и оверлапы
    this.physics.add.collider(player, mHood);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, enemy, BattleStart, null, this);
    this.physics.add.overlap(player, items, ItemPickup, null, this);
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
                    if(keyD.isDown) GetDamage(10);
                    else if(keyA.isDown) makeDamage(damage,enemyinfo)

                    
                    if(enemyinfo.hp<=0){
                        music.mute=true;
                        battle=0;
                        player.data.list.parry_shield_active==false;
                        player.data.list.dmg_boost_active==false;
                        parry_shield_Text.setText(player.data.list.parry_shield+'|D');
                        dmg_boost_Text.setText(player.data.list.dmg_boost+'|D');
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
                    if(keyA.isDown) GetDamage(10);
                    if(keyD.isDown&&player.data.list.parry_shield_active==true) makeDamage(damage,enemyinfo);
                    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);

                    
                    if(enemyinfo.hp<=0){
                        music.mute=true;
                        battle=0;
                        player.data.list.parry_shield_active==false;
                        player.data.list.dmg_boost_active==false;
                        parry_shield_Text.setText(player.data.list.parry_shield+'|D');
                        dmg_boost_Text.setText(player.data.list.dmg_boost+'|D');
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
        
                    GetDamage(10);
                    
                   

                    star1.disableBody(true, true);

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


    var damage_now=damage;
    if (player.data.list.dmg_boost_active==true) damage_now*=2;


    var enemyinfo=enemy.data.list;
    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
    var music = this.sound.add(enemyinfo.music);
    Battle(enemyinfo,music,this,keyA,keyD);
    
    
    enemy.disableBody(true, true);
}

function ItemPickup (player, items)
{

    
    if(items.data.list.type==1){
        player.data.list.hp_flask_small+=1;
        hp_flask_small_Text.setText(player.data.list.hp_flask_small);
    }
    if(items.data.list.type==2){
        player.data.list.hp_flask_large+=1;
        hp_flask_large_Text.setText(player.data.list.hp_flask_large);
    }
    if(items.data.list.type==3){
        player.data.list.dmg_boost+=1;
        if(player.data.list.dmg_boost_active) dmg_boost_Text.setText(player.data.list.dmg_boost+'|A');
        else dmg_boost_Text.setText(player.data.list.dmg_boost+'|D');
    }
    if(items.data.list.type==4){
        player.data.list.invincible+=1;
        invincible_Text.setText(player.data.list.invincible+'|'+player.data.list.invincible_active);
    }
    if(items.data.list.type==5){
        player.data.list.parry_shield+=1;
        if(player.data.list.parry_shield_active) parry_shield_Text.setText(player.data.list.parry_shield+'|A');
        else parry_shield_Text.setText(player.data.list.parry_shield+'|D');
    }
    
    
    items.disableBody(true, true);
}


function Star_hit_the_ground (platforms, star)
{
    if(star.data.list.type==1){
        GetDamage(10)
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

function GetDamage(dmg){
    if(player.data.list.invincible_active>0){
        player.data.list.invincible_active-=1;
        invincible_Text.setText(player.data.list.invincible+'|'+player.data.list.invincible_active);
    }
    else{
        playerHP-=dmg;
        PlayerHPText.setText('Your HP: ' + playerHP);
    }
}
function makeDamage(dmg,enemyinfo){
    if(player.data.list.dmg_boost_active) dmg*=2
    enemyinfo.hp-=dmg;
    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp)
}