import Phaser from 'phaser'
import BasicMagic from './Magic/Basic'

function fireInDirection (player, projectile) {
  switch (player.direction) {
    case 'left':
      projectile.body.velocity.x = -projectile.moveSpeed
      break
    case 'right':
      projectile.body.velocity.x = projectile.moveSpeed
      break
    case 'up':
      projectile.body.velocity.y = -projectile.moveSpeed
      break
    case 'down':
      projectile.body.velocity.y = projectile.moveSpeed
      break
    default: 
      console.log('player direction:', player.direction)
      projectile.body.velocity.x = -projectile.moveSpeed
  }
}

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
    this.moveSpeed = 224
    this.energy = 10
    this.maxEnergy = 10
    this.game.physics.arcade.enable(this)
    this.enableBody = true
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.collideWorldBounds = true
    this.body.setSize(11, 11, 3, 3)
    this.lastAttack = Date.now()
    this.pressLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.pressRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.pressUp = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.pressShift = game.input.keyboard.addKey(Phaser.KeyCode.SHIFT)
    this.pressSpace = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    this.pressDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    
    //this.addChild(this.emitter)
  }

  update () {
    //this.game.debug.body(this)
    if (this.attack) {
      //this.game.debug.body(this.attack)
      //this.game.debug.bodyInfo(this.attack)
      //game.world.bringToTop(this.attack)
    }
    let current = Date.now()  
    if (this.pressSpace.isDown) {
      if (current-this.lastAttack > 100 && this.energy > 0) { 
        this.attack = new BasicMagic({
          game: this.game,
          x: this.x,
          y: this.y,
          asset: 'basicMagic'
        })
        this.energy -= 1
        //console.log('firing towards:', this.direction)
        fireInDirection(this, this.attack)
        this.game.add.existing(this.attack)
        //console.log(current-this.lastAttack, 'made magic!', this.attack)
        this.lastAttack = current
        //this.emitter.gravity = -200;
      } 
    } else {
      if (current-this.lastAttack > 1000) {
        if (this.energy < this.maxEnergy) {
          this.energy += 1
          this.lastAttack = current
        }
      }
    }
    if (this.pressShift.isDown) {
      this.moveSpeed = 256
      //console.log('speed change!')
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
