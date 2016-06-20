import Phaser from 'phaser'

function collide(projectile, object) {
  projectile.kill()
}
function doDamage(projectile, target) {
  projectile.kill()
  target.health -= 1
  if (target.maxspeed >= target.moveSpeed) {
    target.moveSpeed = target.maxspeed
  } else {
    target.moveSpeed += 10
  }
  game.damage.play()
}
export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.animations.add('fire', [0,1,2,3])
    this.game = game
    //this.anchor.setTo(0.5)
    game.physics.arcade.enable(this)
    this.enableBody = true
    this.game.physics.arcade.enable(this)
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.body.bounce.setTo(1, 1)
    this.anchor.setTo(0.5)
    this.moveSpeed = 300
    this.animations.play('fire')
  }

  update () {
    this.animations.play('fire')
    this.game.physics.arcade.collide(this, this.game.enemies, doDamage, null)
    this.game.rooms.forEach((room) => {
      this.game.physics.arcade.collide(this, room, collide, null)
    })
  }

}
