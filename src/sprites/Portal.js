import Phaser from 'phaser'

function teleport(portal, player) {
  // projectile.kill()
  if (portal.target) {
    player.moves = false
    player.x = portal.target.x
    player.y = portal.target.y
    player.moves = true
  }
  console.log('teleport!')
}
export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.animations.add('portal', [0,1,2,3], 15)
    this.game = game
    //this.anchor.setTo(0.5)
    game.physics.arcade.enable(this)
    this.enableBody = true
    this.game.physics.arcade.enable(this)
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.body.bounce.setTo(1, 1)
    // this.anchor.setTo(0.5)
    this.moveSpeed = 300
    this.target = null
    this.animations.play('portal')
  }
  setTarget (target) {
    this.target = target
  }
  update () {
    this.animations.play('portal')
    this.game.physics.arcade.collide(this, this.game.player, teleport, null)
  }

}
