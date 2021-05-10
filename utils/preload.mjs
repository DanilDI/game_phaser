export default function loadAssets(focus)
{
	focus.load.image('tiles', 'assets/map/tileset_dungeon.png');
	focus.load.tilemapTiledJSON('map', 'assets/map/map1.json');
	focus.load.image('longStraight', 'assets/map/long_wall_straight.png');
	focus.load.image('longWide', 'assets/map/long_wall_wide.png');
	focus.load.image('shortWide', 'assets/map/short_wall_wide.png');
	focus.load.image('shortStraight', 'assets/map/short_wall_straight.png');


	focus.load.image('background', 'assets/temporary_background.png');
	focus.load.image('hood','assets/hood.png')
	focus.load.image('ground', 'assets/platform.png');

	focus.load.image('star0', 'assets/starA.png');
	focus.load.image('star1', 'assets/starD.png');
	focus.load.image('star2', 'assets/starB.png');

	focus.load.spritesheet('run_right', 'assets/main_char_anims/run.png', { frameWidth: 184, frameHeight: 137 });
	focus.load.spritesheet('idle', 'assets/main_char_anims/idle.png', { frameWidth: 184, frameHeight: 137 });
	focus.load.spritesheet('run_left', 'assets/main_char_anims/run_left.png', { frameWidth: 184, frameHeight: 137 });
	//hell
	focus.load.spritesheet('demon', 'assets/hell_anims/demon-idle.png', { frameWidth: 160, frameHeight: 144 });
	focus.load.spritesheet('ghost', 'assets/hell_anims/ghost-idle.png', { frameWidth: 64, frameHeight: 80 });
	focus.load.spritesheet('hell-beast', 'assets/hell_anims/hell-beast-idle.png', { frameWidth: 55, frameHeight: 67 });
	focus.load.spritesheet('hell-hound', 'assets/hell_anims/hell-hound-idle.png', { frameWidth: 64, frameHeight: 32 });
	focus.load.spritesheet('nightmare', 'assets/hell_anims/nightmare-idle.png', { frameWidth: 128, frameHeight: 96 });

	focus.load.audio('90_ADNDA', 'assets/90_ADNDA.wav');
	focus.load.audio('120_DDDAAAND', 'assets/120_DDDAAAND.wav');
	focus.load.audio('180_ADNDDANDDA', 'assets/180_ADNDDANDDA.wav');
	focus.load.audio('60_AAAADNDD', 'assets/60_AAAADNDD.wav');
	focus.load.audio('150_AADDA', 'assets/150_AADDA.wav');
	//dungeon
	focus.load.spritesheet('skeleton', 'assets/dungeon_anims/skeleton-idle.png', { frameWidth: 150, frameHeight: 150 });
	focus.load.spritesheet('goblin', 'assets/dungeon_anims/goblin-idle.png', { frameWidth: 150, frameHeight: 150 });
	focus.load.spritesheet('eye', 'assets/dungeon_anims/eye-idle.png', { frameWidth: 150, frameHeight: 150 });
	focus.load.spritesheet('zombie', 'assets/dungeon_anims/zombie-idle.png', { frameWidth: 64, frameHeight: 64 });
	focus.load.spritesheet('bat', 'assets/dungeon_anims/bat-idle.png', { frameWidth: 16, frameHeight: 24 }); //setScale(1.5)
	//forest
	focus.load.spritesheet('mushroom', 'assets/forest_anims/mushroom-idle.png', { frameWidth: 150, frameHeight: 150 });
	focus.load.spritesheet('huntress', 'assets/forest_anims/huntress-idle.png', { frameWidth: 150, frameHeight: 100 });
	focus.load.spritesheet('cyclop', 'assets/forest_anims/cyclop-idle.png', { frameWidth: 64, frameHeight: 64 });
	focus.load.spritesheet('worm', 'assets/forest_anims/worm-idle.png', { frameWidth: 64, frameHeight: 64 });
	focus.load.spritesheet('tree', 'assets/forest_anims/tree-idle.png', { frameWidth: 44, frameHeight: 45 });

	focus.load.audio('120_ADNNDA', 'assets/120_ADNNDA.wav');
	focus.load.audio('120_AANNANNANDD', 'assets/120_AANNANNANDD.wav');

	//items
	focus.load.image('invibcible_shield', 'assets/items/invibcible_shield.png');
	focus.load.image('blade_mail', 'assets/items/blade_mail.png');
	focus.load.image('dmg_boost', 'assets/items/dmg_boost.png');
	focus.load.image('s_heal', 'assets/items/s_heal.png');
	focus.load.image('l_heal', 'assets/items/l_heal.png');
	//buttons
	focus.load.image('l_heal_button', 'assets/buttons/l_heal_button.png');
	focus.load.image('s_heal_button', 'assets/buttons/s_heal_button.png');
	focus.load.image('dmg_boost_button', 'assets/buttons/dmg_boost_button.png');
	focus.load.image('invincible_shield_button', 'assets/buttons/invincible_shield_button.png');
	focus.load.image('blade_mail_button', 'assets/buttons/blade_mail_button.png');


}