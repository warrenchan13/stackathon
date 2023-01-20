// window.onload = function () {
//  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
//  Although it will work fine with this tutorial, it's almost certainly not the most current version.
//  Be sure to replace it with an updated version before you start experimenting with adding your own code.

let game = new Phaser.Game(1280, 720, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update,
});

let score = 0;
let scoreText;
let facing = "right";
let hozMove = 100;
let vertMove = -200;
let jumpTimer = 0;
let walk;
let move;

function preload() {
  game.load.image("wall", "assets/wall.png");
  game.load.image("ground", "assets/platform.png");
  game.load.image("house", "assets/aotHouses.jpg");
  game.load.image("key", "assets/key.png");
  game.load.image("diamond", "assets/diamond.png");
  game.load.spritesheet("eren", "assets/eren.png", 57, 57);
  game.load.spritesheet("reiner", "assets/reiner.png", 80, 80);
  // game.load.spritesheet("woof", "assets/woof.png", 32, 32);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, "house");

  platforms = game.add.group();
  platforms.enableBody = true;

  let ground = platforms.create(0, game.world.height - 30, "ground");
  ground.scale.setTo(4, 4);
  ground.body.immovable = true;
  // ground.backgroundColor = "rgb(100,155,200)";

  keys = game.add.group();
  keys.enableBody = true;
  for (let i = 0; i < 20; i++) {
    let key = keys.create(i * 70, 0, "key");
    key.body.gravity.y = 1000;
    key.body.bounce.y = 0.3 + Math.random() * 0.2;
  }

  scoreText = game.add.text(16, 16, "", { fontSize: "32px", fill: "#000" });

  //eren
  playerEren = game.add.sprite(200, game.world.height - 400, "eren");
  playerEren.scale.set(1.5);
  game.physics.arcade.enable(playerEren);
  playerEren.body.bounce.y = 0.2;
  playerEren.body.gravity.y = 800;
  playerEren.body.collideWorldBounds = true;
  playerEren.animations.add("left", [3, 2], 13, true);
  playerEren.animations.add("right", [2, 3], 13, true);

  // walk = playerEren.animations.add("walk");
  // move = playerEren.animations.play("walk", 5, true);
  // playerEren.anchor.setTo(0.2, 0.2);
  // move.enableUpdate = true;

  //reiner
  playerReiner = game.add.sprite(800, game.world.height - 400, "reiner");
  playerReiner.scale.set(2);
  game.physics.arcade.enable(playerReiner);
  playerReiner.body.bounce.y = 0.2;
  playerReiner.body.gravity.y = 800;
  playerReiner.body.collideWorldBounds = true;
  playerReiner.animations.add("left", [3, 2], 13, true);
  playerReiner.animations.add("right", [2, 3], 13, true);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(playerEren, platforms);
  game.physics.arcade.collide(playerReiner, platforms);
  game.physics.arcade.collide(keys, platforms);
  game.physics.arcade.overlap(playerEren, keys, collectKey, null, this);
  // game.physics.arcade.collide(playerEren, playerReiner);

  if (score === 120) {
    alert("You found the basement and the secrets to the Titans");
    score = 0;
  }

  function collectKey(playerEren, key) {
    key.kill();
    score += 10;
    scoreText.text = "Score: " + score;
  }

  playerEren.body.velocity.x = 0;

  // if (cursors.left.isDown) {
  //   playerEren.body.velocity.x = -150;
  //   playerEren.animations.play("left");
  // } else if (cursors.right.isDown) {
  //   playerEren.body.velocity.x = 150;
  //   playerEren.animations.play("right");
  // } else {
  //   playerEren.animations.stop();
  // }
  // if (cursors.up.isDown) {
  //   //&& player.body.touching.down
  //   playerEren.body.velocity.y = -400;
  // }

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    playerEren.body.velocity.x = -hozMove;
    if (facing !== "left") {
      facing = "left";
      playerEren.scale.x *= -1;
    }
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    playerEren.body.velocity.x = hozMove;
    if (facing !== "right") {
      facing = "right";
      playerEren.scale.x *= -1;
    }
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    playerEren.body.velocity.y = vertMove;
    jumpTimer = game.time.now + 625;
  }
}
