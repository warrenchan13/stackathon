// window.onload = function () {
//  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
//  Although it will work fine with this tutorial, it's almost certainly not the most current version.
//  Be sure to replace it with an updated version before you start experimenting with adding your own code.

let game = new Phaser.Game(1280, 720, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update,
});

let score = -20;
let scoreText;
let facing = "right";
let hozMove = 300;
let vertMove = -300;
let coin;
let platforms;
let keys;
let jumpTimer = 0;
let reiner;
let reiner2;
let female;
let attackTitan;

function preload() {
  // game.load.image("wall", "assets/wall.png");
  game.load.image("ground", "assets/platform.png");
  game.load.image("house", "assets/aotHouses.png");
  game.load.image("key", "assets/key.png");
  game.load.spritesheet("eren", "assets/eren.png", 50, 50);
  game.load.spritesheet("reiner", "assets/reiner.png", 65, 70);
  game.load.spritesheet("reiner2", "assets/reiner.png", 65, 70);
  game.load.spritesheet("female", "assets/female.png", 65, 70);
  game.load.spritesheet("attackTitan", "assets/attackTitan.png", 65, 70);
  game.load.audio("backgroundMusic", "assets/themeSong.mp3");
  game.load.audio("coin", "assets/coin.mp3");
}

function create() {
  game.stage.backgroundColor = "#FFFFFF";
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, "house");

  platforms = game.add.group();
  platforms.enableBody = true;

  //grounds
  let ground = platforms.create(0, game.world.height - 30, "ground");
  ground.scale.setTo(4, 4);
  ground.body.immovable = true;

  // ledges
  let ledge = platforms.create(-300, 175, "ground");
  ledge.scale.setTo(1, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(200, 350, "ground");
  ledge.scale.setTo(0.25, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(300, 90, "ground");
  ledge.scale.setTo(0.25, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(450, 500, "ground");
  ledge.scale.setTo(0.35, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(670, 250, "ground");
  ledge.scale.setTo(0.2, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(900, 150, "ground");
  ledge.scale.setTo(0.2, 0.25);
  ledge.body.immovable = true;

  ledge = platforms.create(1100, 350, "ground");
  ledge.scale.setTo(0.5, 0.25);
  ledge.body.immovable = true;

  keys = game.add.group();
  keys.enableBody = true;
  for (let i = 0; i < 30; i++) {
    // create a key inside of the keys group
    let key = keys.create(i * 50, 0, "key");
    key.body.gravity.y = 1000;
    // each key has a slightly random bounce value
    key.body.bounce.y = 0.3 + Math.random() * 0.2;
  }

  scoreText = game.add.text(game.world.width / 2, 16, "", {
    fontSize: "32px",
    fill: "#000",
  });
  // cursors = game.input.keyboard.createCursorKeys();

  //eren
  eren = game.add.sprite(20, 0, "eren");
  eren.scale.set(1.5);
  game.physics.arcade.enable(eren, Phaser.Physics.ARCADE);
  eren.body.bounce.y = 0.5;
  eren.body.gravity.y = 800;
  eren.body.collideWorldBounds = true;

  //reiner
  reiner = game.add.sprite(0, 250, "reiner");
  reiner.name = "reiner";
  game.physics.enable(reiner, Phaser.Physics.ARCADE);
  reiner.scale.set(2);

  reiner.body.collideWorldBounds = true;
  reiner.body.bounce.setTo(1, 1);
  reiner.body.velocity.x = 250;
  reiner.body.immovable = true;
  // reinerGroup = game.add.group();
  // for (let i = 0; i < 5; i++) {
  //   reinerGroup.create(game.world.randomX, game.world.randomY, "reiner");
  // }

  // game.physics.arcade.enable(reiner);
  // reiner = game.add.group();
  // reiner.enableBody = true;

  //reiner2
  reiner2 = game.add.sprite(1200, 800, "reiner2");
  reiner2.name = "reiner2";
  game.physics.enable(reiner2, Phaser.Physics.ARCADE);
  reiner2.scale.set(2);

  reiner2.body.collideWorldBounds = true;
  reiner2.body.bounce.setTo(1, 1);

  reiner2.body.velocity.x = 400;
  reiner2.body.immovable = true;

  //female
  female = game.add.sprite(800, 700, "female");
  female.name = "female";
  game.physics.enable(female, Phaser.Physics.ARCADE);
  female.scale.set(2);

  female.body.collideWorldBounds = true;
  female.body.bounce.setTo(1, 1);

  female.body.velocity.y = 200;
  female.body.immovable = true;

  //attack titan
  attackTitan = game.add.sprite(300, 0, "attackTitan");
  attackTitan.name = "attackTitan";
  game.physics.enable(attackTitan, Phaser.Physics.ARCADE);
  attackTitan.scale.set(2);

  attackTitan.body.collideWorldBounds = true;
  attackTitan.body.bounce.setTo(1, 1);

  attackTitan.body.velocity.y = 300;
  attackTitan.body.immovable = true;

  //music
  backgroundMusic = game.sound.add("backgroundMusic");
  coin = game.sound.add("coin");
  // backgroundMusic.play();
}

function update() {
  game.physics.arcade.collide(eren, platforms);
  game.physics.arcade.collide(keys, platforms);
  game.physics.arcade.collide(eren, reiner, lose, null, this);
  // game.physrics.add.collider(eren, reiner);
  game.physics.arcade.collide(eren, reiner2, lose, null, this);
  // game.physrics.add.collider(eren, reiner2);
  game.physics.arcade.collide(eren, female, lose, null, this);
  game.physics.arcade.collide(eren, attackTitan, lose, null, this);
  game.physics.arcade.overlap(eren, keys, collectKey, null, this);

  if (score === 100) {
    alert(
      "You found the basement and the secret of the Titans! SHINZO WO SASAGEYO! "
    );
    score = 0;
  }

  function collectKey(eren, key) {
    key.kill();
    coin.play();
    score += 10;
    scoreText.text = "Score: " + score;
  }

  function lose(eren) {
    // alert("You lose!");
    // score -= 5;
    // scoreText.text = "Score: " + score;
  }

  eren.body.velocity.x = 0;

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    eren.body.velocity.x = -hozMove;
    if (facing !== "left") {
      facing = "left";
      eren.scale.x *= -1;
    }
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    eren.body.velocity.x = hozMove;
    if (facing !== "right") {
      facing = "right";
      eren.scale.x *= -1;
    }
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    eren.body.velocity.y = vertMove;
    jumpTimer = game.time.now + 625;
  }

  // if (cursors.left.isDown) {
  //   eren.body.velocity.x = -150;
  //   eren.animations.play("left");
  // } else if (cursors.right.isDown) {
  //   eren.body.velocity.x = 150;
  //   eren.animations.play("right");
  // } else {
  //   eren.animations.stop();
  // }
  // if (cursors.up.isDown) {
  //   //&& player.body.touching.down
  //   eren.body.velocity.y = -400;
  // }
}
