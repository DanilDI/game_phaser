import  movement from 'http://127.0.0.1:8080/utils/movement.mjs'; 

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('theme', 'assets/60_bpm_sample.wav');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    var img = this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    
    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group();

    enemy = this.physics.add.group({
        key: 'bomb',
        repeat: 6,
        setXY: { x: 350, y: 300, stepX: 20 },
        
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, enemy, BattleStart, null, this);
    this.physics.add.overlap(platforms, stars, Star_hit_the_ground, null, this);
}

function update ()
{
    movement(cursors,player,battle);
    
}
function dropStar(spead,music,hp){
    if(score<hp){
      
    var star1=stars.create(Phaser.Math.Between(50, 250), 0, 'star');
    star1.setVelocityY(spead);
    star1.setInteractive();
    star1.on('pointerdown',function(){
            score += 10;
            scoreText.setText('Score: ' + score);

            star1.disableBody(true, true);
            if(score>=hp){
                music.mute=true;
                battle=0;
            }

        });
    }

     
 }

function BattleStart (player, enemy)
{
    var music = this.sound.add('theme');

    battle=1;
    for (let i = 1;i<=16 ; i++) { 
        var timedEvent1 =this.time.delayedCall(1000*i, dropStar,[ 200,music,40]);
        
        
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
