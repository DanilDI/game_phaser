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
var score = 0;
var scoreText;
var mHood;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('theme', 'assets/60_bpm_sample.wav');
    this.load.image('background', 'assets/temporary_background.png');
    this.load.image('hood','assets/hood.png')
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function enemyCreator(type,x,y,scene){
    if(type==1) var concreteEnemy= scene.physics.add.sprite(x, y, 'bomb').setData({ hp: 50, music: 'theme', speed: 1000, green: 100, red: 100, black: 100 });
    enemy.add(concreteEnemy);
}
function create ()
{
    var img = this.add.image(600, 450, 'background');
    mHood = this.physics.add.staticGroup();
    mHood.create(1050,450,'hood').refreshBody();

    platforms = this.physics.add.staticGroup();
    platforms.create(1050, 881, 'ground').setScale(0.71).refreshBody();
    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    
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
    movement(cursors,player,battle);
    
}
function dropStar(speed,music,maxScore,enemy){
    if(score<maxScore){

    var star1=stars.create(Phaser.Math.Between(920, 1180), 258, 'star');
    star1.setVelocityY(speed);
    star1.setInteractive();
    star1.on('pointerdown',function(){
            score += 10;
            scoreText.setText('Score: ' + score);
            enemy.data.list.hp = enemy.data.list.hp - 10; 
            console.log(enemy.data.list.hp);
            star1.disableBody(true, true);
            if(score>=maxScore){
                music.mute=true;
                battle=0;
            }

        });
    }

     
 }

function BattleStart (player, enemy)
{
    
    console.log(enemy.data.list.hp);
    var music = this.sound.add(enemy.data.list.music);

    battle=1;
    for (let i = 1;i<=16 ; i++) { 
        var timedEvent1 =this.time.delayedCall(1000*i, dropStar,[ 200,music,40,enemy]);
        
        
    }

    
    music.play({
    loop: true
    });
    
    enemy.disableBody(true, true);
}

function Star_hit_the_ground (platforms, star)
{
    star.disableBody(true, true);
}
