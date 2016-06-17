import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.scale.setTo(2, 2)
    this.animations.add('left', [0,1,2], 15)
    this.animations.add('right', [3,4,5], 15)
    this.animations.add('up', [6,7,8], 15)
    this.animations.add('down', [9,10,11], 15)
    this.direction = 'left'
    this.health = 10
    this.moveSpeed = 225
    this.game.physics.arcade.enable(this)
    this.enableBody = true
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.collideWorldBounds = true
    this.body.setSize(6, 6, 10, 10)
    
    this.pressLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.pressRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.pressUp = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.pressShift = game.input.keyboard.addKey(Phaser.KeyCode.SHIFT)
    this.pressDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  }

  update () {
    this.game.debug.body(this)
    
    if (this.pressShift.isDown) {
      this.moveSpeed = 350
      console.log('speed change!')
    } else {
      this.moveSpeed = 225
    }
    if (this.pressLeft.isDown) {
      this.body.velocity.x = -this.moveSpeed
      this.body.velocity.y = 0
      this.animations.play('left')
      if (this.direction !== 'left') {
        //this.scale.setTo(2, 2);
        this.direction = 'left' 
      }
    } else if (this.pressRight.isDown) {
      this.body.velocity.x = this.moveSpeed
      this.body.velocity.y = 0
      this.animations.play('right')
      if (this.direction !== 'right') {
        //this.scale.setTo(-2, 2); 
        this.direction = 'right'
      }
    } else {
      this.body.velocity.x = 0
      this.body.velocity.y = 0
      //this.animations.stop()
    } 
    if (this.pressUp.isDown) {
      this.body.velocity.y = -this.moveSpeed
      this.body.velocity.x = 0
      this.animations.play('up')
      if (this.direction !== 'up') {
        this.direction = 'up'
      }
    } else if (this.pressDown.isDown) {
      this.body.velocity.y = this.moveSpeed
      this.body.velocity.x = 0
      this.animations.play('down')
      if (this.direction !== 'down') {
        this.direction = 'down'
      }
    } else  {
      this.body.velocity.y = 0
      //this.animations.stop()
    }
  }

}
