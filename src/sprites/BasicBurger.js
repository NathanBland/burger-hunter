import Phaser from 'phaser'

function moveSelf () {
  let direction = Math.random() < 0.5 ? -1 : 1
  //this.animations.play('spin', 15)
  //this.body.velocity.x = direction * (Math.random() * (this.max - this.min) + this.min)
  //direction = Math.random() < 0.5 ? -1 : 1
  //this.body.velocity.y = direction * (Math.random() * (this.max - this.min) + this.min)
  //console.log('move')
}

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    this.anchor.setTo(0.5)
    this.animations.add('spin', [0,1,2,3,4])
    this.game.physics.arcade.enable(this)
    this.enableBody = true
    this.physicsBodyType = Phaser.Physics.ARCADE
    this.max = 25
    this.min = 10
    //moveSelf()
    //this.timer = game.time.create(false)
    //this.timer.loop(500, moveSelf, this)
    //this.timer.start() 
  }

  update () {
    //this.angle += 1
    this.animations.play('spin', 15)
    //game.debug.bodyInfo(this, 32, 32);
    //game.debug.body(this)
  }

}
