import Phaser from 'phaser'

function moveSelf () {
  let direction = Math.random() < 0.5 ? -1 : 1
  
  this.body.velocity.x = direction * (Math.random() * ((this.moveSpeed) - (this.moveSpeed-50)) + (this.moveSpeed-50))
  direction = Math.random() < 0.5 ? -1 : 1
  this.body.velocity.y = direction * (Math.random() * (this.moveSpeed - (this.moveSpeed-50)) + (this.moveSpeed-50))
  //console.log('move')
}

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.moveSpeed = 150
    this.animations.add('walk', [0,1,2,3,4,5,6], 15)
    this.direction = 'left'
    this.health = 10
    this.game.physics.arcade.enable(this)
    this.enableBody = true
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.collideWorldBounds = true
    this.animations.play('walk')
    this.timer = game.time.create(false)
    this.timer.loop(500, moveSelf, this)
    this.timer.start() 
    
    this.body.setSize(25, 25, 4, 4)
  }

  update () {
    //this.game.debug.body(this)
    this.animations.play('walk')
    if (Math.abs(this.body.velocity.x) > 0) {
      if (this.body.velocity.x > 0) {
        this.body.velocity.x -= 5
      } else {
        this.body.velocity.x += 5
      }
    } else { 
      this.body.velocity.x = 0
    }
    if (Math.abs(this.body.velocity.y) > 0) {
      if (this.body.velocity.y > 0) {
        this.body.velocity.y -= 5
      } else {
        this.body.velocity.y += 5
      }
    } else {
      this.body.velocity.y = 0
    }
  }
}
