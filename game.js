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

var EnemyHPText;
var mHood;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('60bpm', 'assets/60_bpm_sample.wav');
    this.load.audio('120bpm', 'assets/120_bpm_sample.wav');
    this.load.image('background', 'assets/temporary_background.png');
    this.load.image('hood','assets/hood.png')
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function enemyCreator(type,x,y,scene){
    if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'bomb').setData({ hp: 50, music: '60bpm', pause: 1000,speed:200, green: 100, red: 100, black: 100 });
    if(type==2) var concreteEnemy= scene.physics.add.sprite(x, y, 'star').setData({ hp: 70, music: '120bpm', pause: 500,speed:250, green: 100, red: 100, black: 100 });
    enemy.add(concreteEnemy);
}
function create ()
{
    var img = this.add.image(600, 450, 'background');
    mHood = this.physics.add.staticGroup();
    mHood.create(1050,450,'hood').refreshBody();

    platforms = this.physics.add.staticGroup();
    platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();
    
    EnemyHPText = this.add.text(950, 16, 'Enemy HP:  0', { fontSize: '32px', fill: '#000' });
    
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    
    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group();

    enemy = this.physics.add.group();
    
    enemyCreator(1,250,250,this);
    enemyCreator(2,400,400,this);
    console.log(game);

    this.physics.add.collider(player, mHood);
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, enemy, BattleStart, null, this);
    this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);
}

function update ()
{
    movement(cursors,player,battle);
    
}
function dropStar(music,enemyinfo){
    if(enemyinfo.hp>0){

    var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star');
    star1.setVelocityY(enemyinfo.speed);
    star1.setInteractive();
    star1.on('pointerdown',function(){
            
            
            enemyinfo.hp = enemyinfo.hp - 10;
            EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
            console.log(enemyinfo.hp);
            star1.disableBody(true, true);
            if(enemyinfo.hp<=0){
                music.mute=true;
                battle=0;
                stars.children.iterate(function (child) {

                    child.disableBody(true, true);
        
                });
            }

        });
    }

     
 }
function Battle(enemyinfo,music,scene){
    
   
    
    
    
    battle=1;
    for (let i = 1;i<=5 ; i++) { 
        var timedEvent1 =scene.time.delayedCall(enemyinfo.pause*i, dropStar,[music,enemyinfo]);
        
        
    }
    var timedEvent1 =scene.time.delayedCall(enemyinfo.pause*5.1,BattleContinue,[enemyinfo,music,scene] );
    
    music.play({
    loop: false
    });
}
function BattleContinue(enemyinfo,music,scene){
    if(enemyinfo.hp>0) { Battle (enemyinfo,music,scene)};

}
function BattleStart (player, enemy)
{
    
    var enemyinfo=enemy.data.list;
    EnemyHPText.setText('Enemy HP: ' + enemyinfo.hp);
    var music = this.sound.add(enemyinfo.music);
    Battle(enemyinfo,music,this);
    
    
    enemy.disableBody(true, true);
}

function Star_hit_the_ground (platforms, star)
{
    star.disableBody(true, true);
}
