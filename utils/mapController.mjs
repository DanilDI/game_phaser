export function enemyCreator(lvl,type,x,y,scene,enemy){
	
	
	//лес
	if (lvl==1){
		if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'worm').setData({damage: 8,exp: 20,animation:'worm-idle', hp: 70, music: '120_ADNNDA', speed:370, pattern: [9,255,510,755,1105,1255],satrnumber: 6,pause:1700 ,attacks: [0,1,2,2,1,0]});
		if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'huntress').setData({damage: 10,exp: 20,animation:'huntress-idle', hp: 70, music: '120_AANNANNANDD', speed:320, pattern: [3,10,250,370,495,628,870,990,1125,1250,1385],satrnumber: 11,pause:1800 ,attacks: [0,0,2,2,0,2,2,0,2,1,1]});
	/*временно*/ 	if(type==3) var concreteEnemy= scene.physics.add.sprite(x, y, 'huntress').setData({damage: 10,exp: 20,animation:'huntress-idle', hp: 70, music: '120_AANNANNANDD', speed:320, pattern: [3,10,250,370,495,628,870,990,1125,1250,1385],satrnumber: 11,pause:1800 ,attacks: [0,0,2,2,0,2,2,0,2,1,1]});
		if(type==4) var concreteEnemy= scene.physics.add.sprite(x, y, 'mushroom').setData({damage: 8,exp: 30,animation:'mushroom-idle', hp: 70, music: '120_AADDAANDDD', speed:280, pattern: [10,147,278,400,510,635,760,890,1010,1150],satrnumber: 10,pause:1500 ,attacks: [0,0,1,1,0,0,2,1,1,1]});
		if(type==5) var concreteEnemy= scene.physics.add.sprite(x, y, 'cyclop').setData({damage: 12,exp: 30,animation:'cyclop-idle', hp: 70, music: '90_ANDDDNNDAD', speed:250, pattern: [3,180,515,680,860,1025,1185,1350,1515,1690],satrnumber: 10,pause:2100 ,attacks: [0,2,1,1,1,2,2,1,0,1]});
	}	

	//подземелье
	if (lvl==2){
		if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'eye').setData({damage: 12,exp: 30,animation:'eye-idle', hp: 40, music: '180_NNDDAND', speed:370, pattern: [0,165,330,510,665,830,990],satrnumber: 7,pause:1300 ,attacks: [2,2,1,1,0,2,1]});
		if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'bat').setData({damage: 10,exp: 30,animation:'bat-idle', hp: 50, music: '180_ANDDDAAN', speed:320, pattern: [3,170,335,515,680,840,1005,1170],satrnumber: 11,pause:1500 ,attacks: [0,2,1,1,1,0,0,2]});
		if(type==3) var concreteEnemy= scene.physics.add.sprite(x, y, 'goblin').setData({damage: 14,exp: 30,animation:'goblin-idle', hp: 70, music: '120_ADNDNAD', speed:380, pattern: [10,260,515,765,890,1015,1140],satrnumber: 7,pause:1600 ,attacks: [0,1,2,1,2,0,1]});
		if(type==4) var concreteEnemy= scene.physics.add.sprite(x, y, 'zombie').setData({damage: 10,exp: 40,animation:'zombie-idle', hp: 70, music: '120_DADDAADDD', speed:280, pattern: [30,270,410,535,770,895,1040,1160,1280],satrnumber: 9,pause:1700 ,attacks: [1,0,1,1,0,0,1,1,1]});
		if(type==5) var concreteEnemy= scene.physics.add.sprite(x, y, 'skeleton').setData({damage: 12,exp: 40,animation:'skeleton-idle', hp: 60, music: '90_DDADDNAN', speed:300, pattern: [22,190,340,510,685,845,1005,1175],satrnumber: 8,pause:1550 ,attacks: [1,1,0,1,1,2,0,2]});
	}
	//ад
	if (lvl==3){
		if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'ghost').setData({damage: 18,exp: 40,animation:'ghost-idle', hp: 75, music: '120_DDDAAAND', speed:350, pattern: [35,535,1035,1510,1770,2020,2270,2510],satrnumber: 8,pause:3000 ,attacks: [1,1,1,0,0,0,2,1]});
		if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-beast').setData({damage: 16,exp: 40,animation:'hell-beast-idle', hp: 100, music: '60_AAAADNDD', speed:410, pattern: [30,770,1270,1525,1780,2020,2215,2530],satrnumber: 8,pause:3000 ,attacks: [0,0,0,0,1,2,1,1]});
		if(type==3) var concreteEnemy= scene.physics.add.sprite(x, y, 'hell-hound').setData({damage: 16,exp: 40,animation:'hell-hound-idle', hp: 80, music: '150_AADDA', speed:400, pattern: [10,110,215,515,810],satrnumber: 5,pause:1500 ,attacks: [0,0,1,1,0]});
		if(type==4) var concreteEnemy= scene.physics.add.sprite(x, y, 'nightmare').setData({damage: 20,exp: 50,animation:'nightmare-idle', hp: 120, music: '90_ADNDA', speed:380, pattern: [10,350,675,835,1005],satrnumber: 5,pause:1400 ,attacks: [0,1,2,1,0]});
		if(type==5) var concreteEnemy= scene.physics.add.sprite(x, y, 'demon').setData({damage: 22,exp: 50,animation:'demon-idle', hp: 50, music: '180_ADNDDANDDA', speed:330, pattern: [28,210,365,540,710,855,1030,1190,1370,1530],satrnumber: 10,pause:2000 ,attacks: [0,1,2,1,1,0,2,1,1,0]});
	}
	enemy.add(concreteEnemy);
}

export function wallCreator(type,wall)
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

export function itemCreator(type,x,y,scene,items){

	if(type==1) var concreteItem= scene.physics.add.sprite(x, y, 's_heal').setData({type: 1});
	if(type==2) var concreteItem= scene.physics.add.sprite(x, y, 'l_heal').setData({type: 2});
	if(type==3) var concreteItem= scene.physics.add.sprite(x, y, 'dmg_boost').setData({type: 3});
	if(type==4) var concreteItem= scene.physics.add.sprite(x, y, 'blade_mail').setData({type: 4});
	if(type==5) var concreteItem= scene.physics.add.sprite(x, y, 'invibcible_shield').setData({type: 5});
	items.add(concreteItem);
}
