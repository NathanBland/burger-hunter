// Create our 'main' state that will contain the game
var mainState = {
  preload: function() { 
      // This function will be executed at the beginning     
      // That's where we load the images and sounds
    //game.load.spritesheet('tileset', 'assets/tiny-rpg-town-files/tileset/tileset.png', 16, 16)
    game.load.spritesheet('hero', 'assets/tiny-rpg-town-files/spritesheets/hero.png', 16, 16)
    game.load.audio('timer', 'assets/sounds/timer-first-half-loop.wav')
    //game.load.atlas('assets', 'assets/assets.png','assets/assets.json')
  },

  create: function() { 
    // This function is called after the preload function     
    // Here we set up the game, display sprites, etc.
    game.stage.backgroundColor = 'black'

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true;
    
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    
    this.player = game.add.sprite(64, 64, 'hero', 1)
    
    this.player.scale.setTo(2, 2)
    this.player.anchor.setTo(.5, 1)
    this.player.animations.add('left', [0,1,2], 5)
    this.player.animations.add('up', [3,4,5], 5)
    this.player.animations.add('down', [6,7,8], 5)
    //this.asset1 = game.add.sprite(0, 0, 'tileset', 0)
    //this.asset1.scale.setTo(2, 2)
    this.soundTimer = game.add.audio('timer')
    this.soundTimer.loop = true
    this.soundTimer.play()
    //let backgroundMusic =this.soundTimer 
    
  },

  update: function() {
      // This function is called 60 times per second    
      // It contains the game's logic   
    const moveSpeed = 150
    if (this.left.isDown) {
      this.player.body.velocity.x = -moveSpeed
      this.player.animations.play('left')
      this.player.scale.x =2;
    } else if (this.right.isDown) {
      this.player.body.velocity.x = moveSpeed
      this.player.scale.x =-2
      this.player.animations.play('left')
    } else  {
      this.player.body.velocity.x = 0
      //this.player.animations.stop()
    }
    
    if (this.up.isDown) {
      this.player.body.velocity.y = -moveSpeed
      this.player.animations.play('up')
    } else if (this.down.isDown) {
      this.player.body.velocity.y = moveSpeed
      this.player.animations.play('down')
    } else  {
      this.player.body.velocity.y = 0
      //this.player.animations.stop()
    }  
  },
};

// Initialize Phaser, and create a 400px by 490px game
const baseSize = {
  width: Math.floor(window.innerWidth / 16) * 16,
  height: Math.floor(window.innerHeight / 16) * 16,
}
console.log('width mod:', (window.innerWidth % 16) * 32)
console.log('height mod:', (window.innerWidth % 16) * 32)
var game = new Phaser.Game(baseSize.width, baseSize.height);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');