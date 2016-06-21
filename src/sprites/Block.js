import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    //this.anchor.setTo(0.5)
    game.physics.arcade.enable(this)
    //game.physics.arcade.enable(this.wall)
    this.enableBody = true
    this.game.physics.arcade.enable(this)
    this.physicsBodyType = Phaser.Physics.ARCADE
    //this.collideWorldBounds = true
    this.body.bounce.setTo(1, 1)
    
  }
  update () {
    
    this.game.physics.arcade.collide(this.game.player, this)
    this.game.physics.arcade.collide(this.game.enemies, this)
    //this.game.physics.arcade.collide(this, this.border)
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