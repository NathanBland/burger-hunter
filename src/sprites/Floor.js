import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    //this.anchor.setTo(0.5)
    // game.physics.arcade.enable(this)
    //game.physics.arcade.enable(this.wall)
    // this.enableBody = true
    // this.game.physics.arcade.enable(this)
    // this.physicsBodyType = Phaser.Physics.ARCADE
    //this.collideWorldBounds = true
    // this.body.bounce.setTo(1, 1)
    
  }
  update () {
    
  }
}