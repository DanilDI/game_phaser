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
var lvlUP=0;
var player;
var EnemyHPText;
var PlayerHPText;
var playerHP=100;
var playerMAXHP=100;
var damage=10;
var damageText;
var armour=0;
var armorText;
var player_exp=0;
var expText
var lvlUPexp=100;
var lvlUPexpText
var mHood;
var wall;



var game = new Phaser.Game(config);



var items;
var hp_flask_small_Text;
var hp_flask_large_Text;
var dmg_boost_Text;
var invincible_Text;
var parry_shield_Text;

var items_button;
var lvl_UP_button;

function preload ()
{
	this.load.image('tiles', 'assets/map/tileset_dungeon.png');
	this.load.tilemapTiledJSON('map', 'assets/map/map1.json');
	this.load.image('longStraight', 'assets/map/long_wall_straight.png');
	this.load.image('longWide', 'assets/map/long_wall_wide.png');
	this.load.image('shortWide', 'assets/map/short_wall_wide.png');
	this.load.image('shortStraight', 'assets/map/short_wall_straight.png');


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

	this.load.audio('90_ADNDA', 'assets/90_ADNDA.wav');
	this.load.audio('120_DDDAAAND', 'assets/120_DDDAAAND.wav');
	this.load.audio('180_ADNDDANDDA', 'assets/180_ADNDDANDDA.wav');
	this.load.audio('60_AAAADNDD', 'assets/60_AAAADNDD.wav');
	this.load.audio('150_AADDA', 'assets/150_AADDA.wav');
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

	this.load.audio('120_ADNNDA', 'assets/120_ADNNDA.wav');
	this.load.audio('120_AANNANNANDD', 'assets/120_AANNANNANDD.wav');

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


	//лес
	if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'worm').setData({damage: 10,exp: 20,animation:'worm-idle', hp: 70, music: '120_ADNNDA', speed:300, pattern: [9,255,510,755,1105,1255],satrnumber: 6,pause:1700 ,attacks: [0,1,2,2,1,0]});
	if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'huntress').setData({damage: 12,exp: 20,animation:'huntress-idle', hp: 70, music: '120_AANNANNANDD', speed:300, pattern: [3,10,250,370,495,628,870,990,1125,1250,1385],satrnumber: 11,pause:1800 ,attacks: [0,0,2,2,0,2,2,0,2,1,1]});


	//подземелье

	//ад
	
	if(type==11) var concreteEnemy= scene.physics.add.sprite(x, y, 'ghost').setData({damage: 15,exp: 20,animation:'ghost-idle', hp: 50, music: '120_DDDAAAND', speed:300, pattern: [35,535,1035,1510,1770,2020,2270,2510],satrnumber: 8,pause:3000 ,attacks: [1,1,1,0,0,0,2,1]});
	if(type==12) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-beast').setData({damage: 13,exp: 20,animation:'hell-beast-idle', hp: 80, music: '60_AAAADNDD', speed:300, pattern: [30,770,1270,1525,1780,2020,2215,2530],satrnumber: 8,pause:3000 ,attacks: [0,0,0,0,1,2,1,1]});
	if(type==13) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-hound').setData({damage: 13,exp: 20,animation:'hell-hound-idle', hp: 60, music: '150_AADDA', speed:330, pattern: [10,110,215,515,810],satrnumber: 5,pause:1500 ,attacks: [0,0,1,1,0]});
	if(type==14) var concreteEnemy= scene.physics.add.sprite(x, y, 'nightmare').setData({damage: 18,exp: 100,animation:'nightmare-idle', hp: 70, music: '90_ADNDA', speed:350, pattern: [10,350,675,835,1005],satrnumber: 5,pause:1400 ,attacks: [0,1,2,1,0]});
	if(type==15) var concreteEnemy= scene.physics.add.sprite(x, y, 'demon').setData({damage: 20,exp: 20,animation:'demon-idle', hp: 40, music: '180_ADNDDANDDA', speed:300, pattern: [28,210,365,540,710,855,1030,1190,1370,1530],satrnumber: 10,pause:2000 ,attacks: [0,1,2,1,1,0,2,1,1,0]});
	enemy.add(concreteEnemy);
}

function wallCreator(type)
{
	if(type == 1)
	{
		wall.create(290, 55, 'shortStraight');
		wall.create(290, 255, 'shortStraight');
		wall.create(155, 290, 'longWide');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(455, 290, 'longWide');
		wall.create(640, 290, 'shortWide');
		wall.create(840, 290, 'shortWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');


		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');

		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}

	if(type == 2)
	{
		wall.create(290, 155, 'longStraight');
		wall.create(40, 290, 'shortWide');
		wall.create(240, 290, 'shortWide');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(755, 290, 'longWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');

		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');

	}
	if(type == 3)
	{
		wall.create(155, 290, 'longWide');
		wall.create(290, 55, 'shortStraight');
		wall.create(290, 255, 'shortStraight');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(755, 290, 'longWide');

		wall.create(290, 455, 'longStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 340, 'shortStraight');
		wall.create(590, 555, 'shortStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');
		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}
	if(type == 4)
	{
		wall.create(155, 290, 'longWide');
		wall.create(290, 55, 'shortStraight');
		wall.create(290, 255, 'shortStraight');
		wall.create(455, 290, 'longWide');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(640, 290, 'shortWide');
		wall.create(840, 290, 'shortWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(340, 590, 'shortWide');
		wall.create(540, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 755, 'longStraight');
		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}
	if(type == 5)
	{
		wall.create(155, 290, 'longWide');
		wall.create(290, 55, 'shortStraight');
		wall.create(290, 255, 'shortStraight');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(755, 290, 'longWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');

		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}
	if( type == 6)
	{
		wall.create(290, 155, 'longStraight');
		wall.create(40, 290, 'shortWide');
		wall.create(240, 290, 'shortWide');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(755, 290, 'longWide');

		wall.create(290, 455, 'longStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(455, 590, 'longWide');
		wall.create(590, 340, 'shortStraight');
		wall.create(590, 555, 'shortStraight');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');
		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}
	if( type == 7 ){
		wall.create(290, 55, 'shortStraight');
		wall.create(290, 255, 'shortStraight');
		wall.create(40, 290, 'shortWide');
		wall.create(240, 290, 'shortWide');
		wall.create(590, 155, 'longStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(640, 290, 'shortWide');
		wall.create(840, 290, 'shortWide');

		wall.create(290, 455, 'longStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');
		wall.create(590, 640, 'shortStraight');
		wall.create(590, 840, 'shortStraight');
	}
	if(type == 8)
	{
		wall.create(290, 155, 'longStraight');
		wall.create(40, 290, 'shortWide');
		wall.create(240, 290, 'shortWide');
		wall.create(590, 55, 'shortStraight');
		wall.create(590, 255, 'shortStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');
		wall.create(640, 290, 'shortWide');
		wall.create(840, 290, 'shortWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');
		wall.create(590, 455, 'longStraight');
		wall.create(455, 590, 'longWide');
		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 640, 'shortStraight');
		wall.create(290, 840, 'shortStraight');
		wall.create(590, 755, 'longStraight');
	}
	if(type == 9)
	{
		wall.create(290, 155, 'longStraight');
		wall.create(40, 290, 'shortWide');
		wall.create(240, 290, 'shortWide');
		wall.create(590, 155, 'longStraight');
		wall.create(340, 290, 'shortWide');
		wall.create(540, 290, 'shortWide');

		wall.create(640, 290, 'shortWide');
		wall.create(840, 290, 'shortWide');

		wall.create(290, 340, 'shortStraight');
		wall.create(290, 555, 'shortStraight');
		wall.create(40, 590, 'shortWide');
		wall.create(240, 590, 'shortWide');

		wall.create(590, 340, 'shortStraight');
		wall.create(590, 555, 'shortStraight');
		wall.create(340, 590, 'shortWide');
		wall.create(540, 590, 'shortWide');

		wall.create(640, 590, 'shortWide');
		wall.create(840, 590, 'shortWide');

		wall.create(290, 755, 'longStraight');
		wall.create(590, 755, 'longStraight');
	}
}

function itemCreator(type,x,y,scene){

	if(type==1) var concreteItem= scene.physics.add.sprite(x, y, 's_heal').setData({type: 1});
	if(type==2) var concreteItem= scene.physics.add.sprite(x, y, 'l_heal').setData({type: 2});
	if(type==3) var concreteItem= scene.physics.add.sprite(x, y, 'dmg_boost').setData({type: 3});
	if(type==4) var concreteItem= scene.physics.add.sprite(x, y, 'blade_mail').setData({type: 4});
	if(type==5) var concreteItem= scene.physics.add.sprite(x, y, 'invibcible_shield').setData({type: 5});
	items.add(concreteItem);
}
function itemButtonCreator(scene){

	items_button.create(931, 120, 's_heal_button').setData({type: 1}).setInteractive();
	items_button.create(990, 120, 'l_heal_button').setData({type: 2}).setInteractive();
	items_button.create(1050, 120, 'dmg_boost_button').setData({type: 3}).setInteractive();
	items_button.create(1110, 120, 'blade_mail_button').setData({type: 4}).setInteractive();
	items_button.create(1170, 120, 'invincible_shield_button').setData({type: 5}).setInteractive();


	items_button.children.iterate(function (child) {


		child.on('pointerdown',function(){
			var type=child.data.list.type;
			if(battle==0){
				if(type==1){
					if(player.data.list.hp_flask_small>0){
						player.data.list.hp_flask_small-=1;
						playerHP+=20;
						if(playerHP>playerMAXHP) playerHP=playerMAXHP;
						PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
						hp_flask_small_Text.setText(player.data.list.hp_flask_small);
					}
				}
				if(type==2){
					if(player.data.list.hp_flask_large>0){
						player.data.list.hp_flask_large-=1;
						playerHP+=50;
						if(playerHP>playerMAXHP) playerHP=playerMAXHP;
						PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
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
					if(player.data.list.parry_shield>0){
						player.data.list.parry_shield-=1;
						player.data.list.parry_shield_active=true;
						parry_shield_Text.setText(player.data.list.parry_shield+'|A');
					}
				}
				if(type==5){
					if(player.data.list.invincible>0){
						player.data.list.invincible-=1;
						player.data.list.invincible_active=5;
						invincible_Text.setText(player.data.list.invincible+'|'+player.data.list.invincible_active);
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

	wall = this.physics.add.staticGroup();

	platforms = this.physics.add.staticGroup();
	platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();

	//текст
	EnemyHPText = this.add.text(920, 10, 'Enemy HP:  0', { fontSize: '20px', fill: '#000' });
	PlayerHPText = this.add.text(920, 44, 'Your HP:  100/100', { fontSize: '20px', fill: '#000' });
	expText=this.add.text(910, 185, 'EXP:  0', { fontSize: '20px', fill: '#000' });
	lvlUPexpText =this.add.text(910, 210, 'EXP to level UP:  100', { fontSize: '20px', fill: '#000' });

	damageText=this.add.text(920, 70, 'dmg: 10', { fontSize: '20px', fill: '#000' });

	armorText=this.add.text(1030, 70, 'arm: 0', { fontSize: '20px', fill: '#000' });


	hp_flask_small_Text = this.add.text(920, 150, '0', { fontSize: '26px', fill: '#000' });
	hp_flask_large_Text = this.add.text(980, 150, '0', { fontSize: '26px', fill: '#000' });
	dmg_boost_Text = this.add.text(1024, 150, '0|D', { fontSize: '26px', fill: '#000' });
	parry_shield_Text = this.add.text(1084, 150, '0|D', { fontSize: '26px', fill: '#000' });
	invincible_Text = this.add.text(1143, 150, '0|0', { fontSize: '26px', fill: '#000' });



	//игрок
	player = this.physics.add.sprite(100, 450, 'dude');
	player.setData({hp_flask_small: 0, hp_flask_large: 0, dmg_boost: 0, invincible: 0, parry_shield: 0, dmg_boost_active: false,invincible_active: 0, parry_shield_active: false})
	player.setBounce(0.2);
	player.setSize(50,70,true);
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

	//создание физической группы для lvlup кнопок
	lvl_UP_button= this.physics.add.group();

	wallCreator(9);
	//черновая отрисовкак противников
	enemyCreator(1,250,250,this);
	enemyCreator(2,200,650,this);

	
	enemyCreator(11,600,650,this);
	enemyCreator(12,400,400,this);
	enemyCreator(13,400,100,this);
	enemyCreator(14,500,100,this);
	enemyCreator(15,400,650,this);


	//черновая отрисовкак прeдметов
	itemCreator(1,100,800,this);
	itemCreator(2,200,800,this);
	itemCreator(3,400,800,this);
	itemCreator(4,600,800,this);
	itemCreator(5,700,800,this);
	itemButtonCreator(this);

	//коллайдеры и оверлапы
	this.physics.add.collider(player, wall);
	this.physics.add.collider(player, mHood);
	this.physics.add.collider(player, platforms);
	this.physics.add.overlap(player, enemy, BattleStart, null, this);
	this.physics.add.overlap(player, items, ItemPickup, null, this);
	this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);
}

function update ()
{
	movement(player,battle,lose,lvlUP,this);
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
				if(keyD.isDown) GetDamage(enemyinfo.damage);
				else if(keyA.isDown) makeDamage(damage,enemyinfo)

			});
		}

		if(startype==1){
			var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star1');
			star1.setData({ type: 1});
			star1.setVelocityY(enemyinfo.speed);
			star1.setInteractive();


			star1.on('pointerdown',function(){
				if(keyA.isDown||keyD.isDown) star1.disableBody(true, true);
				if(keyA.isDown) GetDamage(enemyinfo.damage);
				if(keyD.isDown&&player.data.list.parry_shield_active==true) makeDamage(damage,enemyinfo);
			});
		}

		if(startype==2){
			var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star2');
			star1.setData({ type: 2});
			star1.setVelocityY(enemyinfo.speed);
			star1.setInteractive();
			star1.on('pointerdown',function(){
				GetDamage(enemyinfo.damage);
				star1.disableBody(true, true);
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
	EnemyHPText.setText('Enemy HP:  ' + enemyinfo.hp);
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
		playerHP-=(dmg-armour);
		PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
	}
	if(playerHP<=0){

		battle=0;
		stars.children.iterate(function (child) {

			child.disableBody(true, true);

		});
		lose=1;

	}
}
function makeDamage(dmg,enemyinfo){
	if(player.data.list.dmg_boost_active) dmg*=2
	enemyinfo.hp-=dmg;
	EnemyHPText.setText('Enemy HP:  ' + enemyinfo.hp)
	if(enemyinfo.hp<=0){
		GainEXP(enemyinfo.exp);
		battle=0;
		player.data.list.parry_shield_active=false;
		player.data.list.dmg_boost_active=false;
		parry_shield_Text.setText(player.data.list.parry_shield+'|D');
		dmg_boost_Text.setText(player.data.list.dmg_boost+'|D');
		stars.children.iterate(function (child) {

			child.disableBody(true, true);

		});

	}
}
function GainEXP(exp){
	player_exp+=exp;
	expText.setText('EXP:  '+player_exp);
	if(player_exp>=lvlUPexp){
		createlvlUPbuttun();
	}
}

function createlvlUPbuttun(){
	lvlUP=1;
	lvl_UP_button.create(1050, 500, 's_heal_button').setData({type: 1}).setInteractive();
	lvl_UP_button.create(1050, 600, 'l_heal_button').setData({type: 2}).setInteractive();
	lvl_UP_button.create(1050, 700, 'dmg_boost_button').setData({type: 3}).setInteractive();


	lvl_UP_button.children.iterate(function (child) {


		child.on('pointerdown',function(){
			var type=child.data.list.type;
			if(type==1){
				playerMAXHP+=10;
				playerHP+=10;
				PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
			}
			if(type==2){
				damage+=2;
				damageText.setText('dmg: '+damage)
			}
			if(type==3){
				armour+=1;
				damageText.setText('arm: '+armour)
			}
			player_exp-=lvlUPexp;
			lvlUPexp+=20;
			expText.setText('EXP:  '+player_exp);
			lvlUPexpText.setText('EXP to level UP:  '+lvlUPexp)
			lvlUP=0;

			lvl_UP_button.children.iterate(function (child) {

				child.disableBody(true, true);

			});
		});
	});
}