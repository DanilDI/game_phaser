import movement from './utils/movement.mjs';
import createAnims from './utils/anims.mjs';
import loadAssets from './utils/preload.mjs';
import {enemyCreator,wallCreatorForest, wallCreatorDungeon,wallCreatorHell, itemCreator} from './utils/mapController.mjs';



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


var stage_ender;

var stages =[0,0,0]

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
	




	//?????? ?? ?????????????????? ?????? ??????????
	mHood = this.physics.add.staticGroup();
	mHood.create(1050,450,'hood').refreshBody();

	wall = this.physics.add.staticGroup();

	platforms = this.physics.add.staticGroup();
	platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();





	//??????????
	player = this.physics.add.sprite(100, 500, 'dude');
	player.setData({hp_flask_small: 0, hp_flask_large: 0, dmg_boost: 0, invincible: 0, parry_shield: 0, dmg_boost_active: false,invincible_active: 0, parry_shield_active: false})
	player.setBounce(0.2);
	player.setSize(50,70,true);
	player.setCollideWorldBounds(true);

	//???????????????? ????????????????
	createAnims(this);


	//??????????
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


	//???????????????? ???????????????????? ???????????? ?????? ??????????
	stars = this.physics.add.group();

	//???????????????? ???????????????????? ???????????? ?????? ??????????????????????
	enemy = this.physics.add.group();


	//???????????????? ???????????????????? ???????????? ?????? ??????????????????
	items = this.physics.add.group();
	items_button = this.physics.add.group();

	//???????????????? ???????????????????? ???????????? ?????? lvlup ????????????
	lvl_UP_button= this.physics.add.group();

	//???????????????? ???????????????????? ???????????? ?????? ?????????? ????????????
	stage_ender=this.physics.add.group();



	itemButtonCreator(this);
	startNewGame(this);
	//???????????????????? ?? ????????????????
	this.physics.add.collider(player, wall);
	this.physics.add.collider(player, mHood);
	this.physics.add.collider(player, platforms);
	this.physics.add.overlap(player, enemy, BattleStart, null, this);   
	
	this.physics.add.overlap(player, items, ItemPickup, null, this);
	this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);

	this.physics.add.overlap(player, stage_ender, stage_end, null, this);
	

}

function update ()
{
	movement(player,battle,lose,lvlUP,this);

	enemy.children.iterate(function (child) {

		child.anims.play(child.data.list.animation,true);

	});
	
	lvl_UP_button.children.iterate(function (child) {

		child.anims.play(child.data.list.animation,true);

	});

	stage_ender.children.iterate(function (child) {
		if(child.data.list.type==2) child.anims.play('hell-door-pulse',true);
		if(child.data.list.type==3) child.anims.play('end-game-pulse',true);
		

	});

}

function dropStar(music,enemyinfo,startype,keyA,keyD,scene){

	if(battle==1&&enemyinfo.hp>0){
		if(startype==0){
			var star1=stars.create(Phaser.Math.Between(953, 1147), 258, 'star0');
			star1.setData({ type: 0});
			star1.setVelocityY(enemyinfo.speed);
			star1.setInteractive();
			star1.on('pointerdown',function(){
				if(keyA.isDown||keyD.isDown) star1.disableBody(true, true);
				if(keyD.isDown) GetDamage(enemyinfo.damage,scene);
				else if(keyA.isDown) makeDamage(damage,enemyinfo,scene)

			});
		}

		if(startype==1){
			var star1=stars.create(Phaser.Math.Between(953, 1147), 258, 'star1');
			star1.setData({ type: 1,dmg:enemyinfo.damage});
			star1.setVelocityY(enemyinfo.speed);
			star1.setInteractive();


			star1.on('pointerdown',function(){
				if(keyA.isDown||keyD.isDown) star1.disableBody(true, true);
				if(keyA.isDown) GetDamage(enemyinfo.damage,scene);
				if(keyD.isDown&&player.data.list.parry_shield_active==true) makeDamage(damage,enemyinfo,scene);
			});
		}

		if(startype==2){
			var star1=stars.create(Phaser.Math.Between(953, 1147), 258, 'star2');
			star1.setData({ type: 2});
			star1.setVelocityY(enemyinfo.speed);
			star1.setInteractive();
			star1.on('pointerdown',function(){
				GetDamage(enemyinfo.damage,scene);
				star1.disableBody(true, true);
			});
		}



	}
	else music.mute=true;



}
function Battle(enemyinfo,music,scene,keyA,keyD){

	battle=1;

	for (let i = 0;i<enemyinfo.satrnumber ; i++) {
		var timedEvent1 =scene.time.delayedCall(enemyinfo.pattern[i], dropStar,[music,enemyinfo,enemyinfo.attacks[i],keyA,keyD,scene]);


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
		player.data.list.parry_shield+=1;
		if(player.data.list.parry_shield_active) parry_shield_Text.setText(player.data.list.parry_shield+'|A');
		else parry_shield_Text.setText(player.data.list.parry_shield+'|D');
	}

	if(items.data.list.type==5){
		player.data.list.invincible+=1;
		invincible_Text.setText(player.data.list.invincible+'|'+player.data.list.invincible_active);
	}


	items.disableBody(true, true);
}


function Star_hit_the_ground (platforms, star)
{
	if(star.data.list.type==1){
		GetDamage(star.data.list.dmg,this);

	}
	star.disableBody(true, true);
}

function GetDamage(dmg,scene){
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
		GameEnd(scene,'lose')
	}
}
function makeDamage(dmg,enemyinfo,scene){
	if(player.data.list.dmg_boost_active) dmg*=2
	enemyinfo.hp-=dmg;
	EnemyHPText.setText('Enemy HP:  ' + enemyinfo.hp)
	if(enemyinfo.hp<=0){
		GainEXP(enemyinfo.exp,scene);
		battle=0;
		player.data.list.parry_shield_active=false;
		player.data.list.dmg_boost_active=false;
		parry_shield_Text.setText(player.data.list.parry_shield+'|D');
		dmg_boost_Text.setText(player.data.list.dmg_boost+'|D');
		stars.clear(true,true);

	}
}
function GainEXP(exp,scene){
	player_exp+=exp;
	expText.setText('EXP:  '+player_exp);
	if(player_exp>=lvlUPexp){
		lvlUP=1;
		scene.time.delayedCall(1000, createlvlUPbuttun);
		
	}
}

function createlvlUPbuttun(){
	lvl_UP_button.create(1050, 500, 's_heal_button').setData({type: 1,animation: 'hp-lvl-up'}).setInteractive().anims.play('hp-lvl-up',true);
	lvl_UP_button.create(1050, 600, 'armour_lvl_up').setData({type: 2,animation: 'armour-lvl-up'}).setInteractive().anims.play('armour-lvl-up',true);
	lvl_UP_button.create(1050, 700, 'dmg_lvl_up').setData({type: 3,animation: 'lvl-up-dmg'}).setInteractive().anims.play('lvl-up-dmg',true);
	

	lvl_UP_button.children.iterate(function (child) {
		

		child.on('pointerdown',function(){
			var type=child.data.list.type;
			if(type==1){
				playerMAXHP+=15;
				playerHP+=15;
				PlayerHPText.setText('Your HP:  ' + playerHP+'/'+playerMAXHP);
			}
			if(type==2){
				armour+=2;
				armorText.setText('arm: '+armour)
			}
			if(type==3){
				damage+=3;
				damageText.setText('dmg: '+damage)
			}
			
			player_exp-=lvlUPexp;
			lvlUPexp+=50;
			expText.setText('EXP:  '+player_exp);
			lvlUPexpText.setText('EXP to level UP:  '+lvlUPexp)
			lvlUP=0;

			lvl_UP_button.children.iterate(function (child) {

				child.disableBody(true, true);

			});
		});
	});
}

function stage_end(player, stage_ender){
	
	stage_ender.disableBody(true, true);
	if(stage_ender.data.list.type==3) GameEnd(this,'win');
	else create_stage(stage_ender.data.list.type,this);
	
}

function create_stage(stage,scene){
	stage_ender.children.iterate(function (child) {
		child.disableBody(true, true);
		
	});
	enemy.children.iterate(function (child) {
		
		child.disableBody(true, true);
		
	});
	items.children.iterate(function (child) {
		
		child.disableBody(true, true);
		
	});
	wall.children.iterate(function (child) {
		child.disableBody(true, true);
		
	});
	items.clear( true, true);
	stars.clear( true, true);
	enemy.clear( true, true);
	stage_ender.clear( true, true);

	var walltype=stages[stage];
	//walltype=100;//?????? ????????????
	stage++;
	//???????????????? ??????????
	if(walltype==100){
		if (stage==1) stage_ender.create(735, 435, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(735, 435, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(735, 435, '3_stage_end').setData({type: 3});
		player.setPosition(450,430);

		enemyCreator(stage,Phaser.Math.Between(1, 3),140,290,scene,enemy);
		
		itemCreator(Phaser.Math.Between(2, 4),840,820,scene,items);
		enemyCreator(stage,Phaser.Math.Between(1, 3),286,450,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),288,740,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),733,286,scene,enemy);

		enemyCreator(stage,Phaser.Math.Between(4, 5),290,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),590,150,scene,enemy);
		itemCreator(5,123,213,scene,items);
		itemCreator(5,600,800,scene,items);
		itemCreator(5,600,850,scene,items);
		
	}
	if(stage==1){
		var img = scene.add.image(600, 450, 'background_forest');
		img.setDepth(-1);
		let map = scene.make.tilemap({key: 'map_forest'})

		let tileset = map.addTilesetImage('dark_forest', 'tiles_forest', 32, 32, 0, 0);
		let layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		layer1.setDepth(-1);
		wallCreatorForest(walltype,wall);
	}
	if(stage==2){
		var img = scene.add.image(600, 450, 'background_dungeon');
		img.setDepth(-1);
		let map = scene.make.tilemap({key: 'map_dungeon'})
		let tileset = map.addTilesetImage('Dungeon tileset', 'tiles_dungeon', 16, 16, 0, 0);
		let layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		layer1.setDepth(-1);
		wallCreatorDungeon(walltype,wall);
	}
	if(stage==3){
	
		var img = scene.add.image(600, 450, 'background_hell');
		img.setDepth(-1);
		let map = scene.make.tilemap({key: 'map_hell'})
		let tileset = map.addTilesetImage('tiles_tiny_sample_2', 'tiles_hell', 32, 32, 0, 0);
		let layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		layer1.setDepth(-1);
		wallCreatorHell(walltype,wall);
	}
	
	if(walltype==1){
		if (stage==1) stage_ender.create(150, 150, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(150, 150, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(150, 150, '3_stage_end').setData({type: 3});
		player.setPosition(100,450);

		enemyCreator(stage,Phaser.Math.Between(1, 3),286,450,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),288,740,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),733,286,scene,enemy);

		enemyCreator(stage,Phaser.Math.Between(4, 5),290,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),590,150,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),730,730,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),730,430,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),750,600,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),600,750,scene,enemy);

		itemCreator(Phaser.Math.Between(3, 4),450,450,scene,items);
		itemCreator(Phaser.Math.Between(2, 5),540,50,scene,items);

		if(Phaser.Math.Between(1, 2)==1){
			itemCreator(2,800,800,scene,items)
			itemCreator(Phaser.Math.Between(3, 4),843,86,scene,items);
		}
		else{
			itemCreator(1,180,340,scene,items);
			itemCreator(1,843,86,scene,items);
			itemCreator(Phaser.Math.Between(3, 4),800,800,scene,items);
		}
	}
	if(walltype==2){
		if (stage==1) stage_ender.create(750, 450, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(750, 450, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(750, 450, '3_stage_end').setData({type: 3});
		player.setPosition(450,430);

		enemyCreator(stage,Phaser.Math.Between(1, 3),140,290,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),440,290,scene,enemy);
		
		enemyCreator(stage,Phaser.Math.Between(4, 5),590,735,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),590,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),740,595,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),140,590,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),280,740,scene,enemy);

		enemyCreator(stage,Phaser.Math.Between(1, 5),790,780,scene,enemy);

		itemCreator(Phaser.Math.Between(3, 4),150,150,scene,items);
		itemCreator(1,345,40,scene,items);
		itemCreator(5,750,150,scene,items);
		itemCreator(Phaser.Math.Between(2, 4),840,820,scene,items);

		
	}
	if(walltype==3){
		if (stage==1) stage_ender.create(150, 150, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(150, 150, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(150, 150, '3_stage_end').setData({type: 3});
		player.setPosition(150,730);

		enemyCreator(stage,Phaser.Math.Between(1, 3),140,590,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),600,450,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),300,730,scene,enemy);

		enemyCreator(stage,Phaser.Math.Between(4, 5),450,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),590,140,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),290,140,scene,enemy);
		

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),600,750,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),750,590,scene,enemy);

		enemyCreator(stage,Phaser.Math.Between(1, 5),750,750,scene,enemy);

		itemCreator(Phaser.Math.Between(3, 4),150,450,scene,items);
		itemCreator(1,850,850,scene,items);
		itemCreator(1,850,150,scene,items);
		itemCreator(Phaser.Math.Between(2, 4),450,450,scene,items);
		itemCreator(Phaser.Math.Between(2, 5),550,50,scene,items);
		
	}
	if(walltype==4){
		if (stage==1) stage_ender.create(150, 750, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(150, 750, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(150, 750, '3_stage_end').setData({type: 3});
		player.setPosition(780,120);

		enemyCreator(stage,Phaser.Math.Between(1, 3),740,590,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),750,300,scene,enemy);
		

		
		enemyCreator(stage,Phaser.Math.Between(4, 5),300,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),150,600,scene,enemy);
		

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),440,590,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),600,730,scene,enemy);


		enemyCreator(stage,Phaser.Math.Between(1, 5),600,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),300,450,scene,enemy);

		itemCreator(Phaser.Math.Between(3, 5),150,150,scene,items);
		
		itemCreator(Phaser.Math.Between(2, 5),450,450,scene,items);
		itemCreator(1,450,750,scene,items);

		if(Phaser.Math.Between(1, 2)==1) itemCreator(1,380,250,scene,items)
		else itemCreator(1,250,360,scene,items);

		
		
	}
	if(walltype==5){
		if (stage==1) stage_ender.create(750, 450, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(750, 450, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(750, 450, '3_stage_end').setData({type: 3});
		player.setPosition(450,150);

		enemyCreator(stage,Phaser.Math.Between(1, 3),300,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),300,450,scene,enemy);
		

		
		enemyCreator(stage,Phaser.Math.Between(4, 5),600,150,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),600,750,scene,enemy);
		

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),150,590,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),300,730,scene,enemy);


		enemyCreator(stage,Phaser.Math.Between(1, 5),750,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),500,500,scene,enemy);



		itemCreator(Phaser.Math.Between(2, 4),750,150,scene,items);
		
		itemCreator(Phaser.Math.Between(1, 5),100,400,scene,items);
		itemCreator(1,150,150,scene,items);

		if(Phaser.Math.Between(1, 2)==1) itemCreator(Phaser.Math.Between(3, 4),800,800,scene,items)
		else itemCreator(Phaser.Math.Between(3, 4),500,800,scene,items);

		
		
	}
	if(walltype==6){
		if (stage==1) stage_ender.create(750, 150, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(750, 150, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(750, 150, '3_stage_end').setData({type: 3});
		player.setPosition(450,750);

		enemyCreator(stage,Phaser.Math.Between(1, 3),300,730,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),600,730,scene,enemy);
		

		
		enemyCreator(stage,Phaser.Math.Between(4, 5),150,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),450,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),600,130,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),600,430,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),400,150,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),400,450,scene,enemy);


		enemyCreator(stage,Phaser.Math.Between(1, 5),150,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),750,600,scene,enemy);



		itemCreator(1,250,650,scene,items);
		
		itemCreator(Phaser.Math.Between(3, 4),550,50,scene,items);
		itemCreator(Phaser.Math.Between(3, 4),250,350,scene,items);
		itemCreator(Phaser.Math.Between(2, 4),200,150,scene,items);
		itemCreator(5,100,150,scene,items);
		if(Phaser.Math.Between(1, 2)==1) itemCreator(1,850,850,scene,items)
		else itemCreator(1,850,350,scene,items);

		
		
	}
	if(walltype==7){
		if (stage==1) stage_ender.create(450, 450, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(450, 450, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(450, 450, '3_stage_end').setData({type: 3});
		player.setPosition(150,750);

		enemyCreator(stage,Phaser.Math.Between(1, 3),150,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),150,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),600,730,scene,enemy);

		
		enemyCreator(stage,Phaser.Math.Between(4, 5),450,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),750,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),750,600,scene,enemy);
		

		enemyCreator(stage,Phaser.Math.Between(1, 5),300,130,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),450,820,scene,enemy);



		itemCreator(1,850,850,scene,items);
		
		itemCreator(1,150,450,scene,items);
		itemCreator(2,750,150,scene,items);
		itemCreator(Phaser.Math.Between(3, 5),750,450,scene,items);
		

		
		
	}
	if(walltype==8){
		if (stage==1) stage_ender.create(450, 750, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(450, 750, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(450, 750, '3_stage_end').setData({type: 3});
		player.setPosition(750,750);

		enemyCreator(stage,Phaser.Math.Between(1, 3),750,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),450,150,scene,enemy);
		
		
		enemyCreator(stage,Phaser.Math.Between(4, 5),150,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),300,750,scene,enemy);
		
		

		enemyCreator(stage,Phaser.Math.Between(1, 5),750,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),150,600,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),450,300,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),300,450,scene,enemy);

		itemCreator(1,450,450,scene,items);
		
		
		itemCreator(Phaser.Math.Between(3, 5),150,150,scene,items);
		itemCreator(Phaser.Math.Between(2, 4),150,750,scene,items);
		itemCreator(Phaser.Math.Between(3, 4),750,450,scene,items);
		

		
		
	}
	if(walltype==9){
		if (stage==1) stage_ender.create(750, 750, '1_stage_end').setData({type: 1});
		if (stage==2) stage_ender.create(750, 750, '2_stage_end').setData({type: 2});
		if (stage==3) stage_ender.create(750, 750, '3_stage_end').setData({type: 3});
		player.setPosition(150,150);

		enemyCreator(stage,Phaser.Math.Between(1, 3),150,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),300,450,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 3),750,300,scene,enemy);
		
		enemyCreator(stage,Phaser.Math.Between(4, 5),150,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),450,600,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(4, 5),600,450,scene,enemy);
		

		enemyCreator(stage,Phaser.Math.Between(1, 5),450,300,scene,enemy);
		enemyCreator(stage,Phaser.Math.Between(1, 5),750,600,scene,enemy);

		if(Phaser.Math.Between(1, 2)==1) enemyCreator(stage,Phaser.Math.Between(1, 5),150,750,scene,enemy);
		else enemyCreator(stage,Phaser.Math.Between(1, 5),750,150,scene,enemy);

		itemCreator(1,240,850,scene,items);
		
		
		itemCreator(Phaser.Math.Between(1, 4),450,150,scene,items);
		itemCreator(Phaser.Math.Between(2, 5),450,750,scene,items);
		itemCreator(Phaser.Math.Between(3, 4),850,50,scene,items);
		itemCreator(Phaser.Math.Between(3, 4),850,550,scene,items);

		
		
	}
}


function startNewGame(scene){
	
	EnemyHPText.setText('Enemy HP:  0');
	PlayerHPText.setText('Your HP:  100/100');
	expText.setText('EXP:  0');
	lvlUPexpText.setText('EXP to level UP:  100');

	damageText.setText('dmg: 10');

	armorText.setText('arm: 0');


	hp_flask_small_Text.setText('0');
	hp_flask_large_Text.setText('0');
	dmg_boost_Text.setText('0|D');
	parry_shield_Text.setText('0|D');
	invincible_Text.setText('0|0');

	player.setData({hp_flask_small: 0, hp_flask_large: 0, dmg_boost: 0, invincible: 0, parry_shield: 0, dmg_boost_active: false,invincible_active: 0, parry_shield_active: false})



	playerHP=100;
	playerMAXHP=100;
	damage=10;

	armour=0;

	player_exp=0;

	lvlUPexp=100;

	battle=0;
	lose=0;
	lvlUP=0;
	stageRand();
	create_stage(0,scene);

}

function GameEnd(scene,status){
	lose=1
	if(status=='win') var Text=scene.add.text(910, 400, 'You win! Wanna play again?', { fontSize: '18px', fill: '000' });
	else var Text=scene.add.text(910, 400, 'You LOSE :(  Wanna try again?', { fontSize: '16px', fill: '000' });
	
	var newGameButton= scene.physics.add.sprite(1050, 500, 'retry').setData({test: Phaser.Math.Between(1,100000)});
	newGameButton.setInteractive();
	newGameButton.on('pointerdown',function(){
		newGameButton.disableBody(true, true);
		Text.setText('');
		lose=0
		startNewGame(scene);
		newGameButton.destroy();
	});
	
}

function stageRand(){
	stages[0]=Phaser.Math.Between(1, 9)
	stages[1]=Phaser.Math.Between(1, 9)
	stages[2]=Phaser.Math.Between(1, 9)
	while(stages[0]==stages[1]) stages[1]=Phaser.Math.Between(1, 9)
	while(stages[1]==stages[2]||stages[0]==stages[2]) stages[2]=Phaser.Math.Between(1, 9)
}