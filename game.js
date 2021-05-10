import movement from './utils/movement.mjs';
import createAnims from './utils/anims.mjs';
import loadAssets from './utils/preload.mjs';
import {enemyCreator, wallCreator, itemCreator} from './utils/mapController.mjs';
//import start_battle from './utils/battleController.mjs';


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
    loadAssets(this);

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
	player = this.physics.add.sprite(100, 500, 'dude');
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

	wallCreator(9,wall);
	//черновая отрисовкак противников
	// enemyCreator(1,250,250,this,enemy);
	// enemyCreator(2,200,650,this,enemy);

	
	// enemyCreator(11,600,650,this,enemy);
	// enemyCreator(12,400,400,this,enemy);
	// enemyCreator(13,400,100,this,enemy);
	// enemyCreator(14,500,100,this,enemy);
	// enemyCreator(15,400,650,this,enemy);

	
	enemyCreator(1,1,100,650,this,enemy);
	enemyCreator(1,2,300,650,this,enemy);
	enemyCreator(1,3,500,650,this,enemy);
	enemyCreator(1,4,700,650,this,enemy);
	enemyCreator(1,5,880,650,this,enemy);
	
	enemyCreator(2,1,100,350,this,enemy);
	enemyCreator(2,2,300,350,this,enemy);
	enemyCreator(2,3,500,350,this,enemy);
	enemyCreator(2,4,700,350,this,enemy);
	enemyCreator(2,5,880,350,this,enemy);

	enemyCreator(3,1,100,150,this,enemy);
	enemyCreator(3,2,300,150,this,enemy);
	enemyCreator(3,3,500,150,this,enemy);
	enemyCreator(3,4,700,150,this,enemy);
	enemyCreator(3,5,880,150,this,enemy);


	//черновая отрисовкак прeдметов
	itemCreator(1,100,800,this,items);
	itemCreator(2,200,800,this,items);
	itemCreator(3,400,800,this,items);
	itemCreator(4,600,800,this,items);
	itemCreator(5,700,800,this,items);
	itemButtonCreator(this);
    var param = 1;
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
//////////////
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
			star1.setData({ type: 1,dmg:enemyinfo.damage});
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
////////////////
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
		GetDamage(star.data.list.dmg);

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
				playerMAXHP+=15;
				playerHP+=15;
				PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
			}
			if(type==2){
				damage+=3;
				damageText.setText('dmg: '+damage)
			}
			if(type==3){
				armour+=2;
				armorText.setText('arm: '+armour)
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