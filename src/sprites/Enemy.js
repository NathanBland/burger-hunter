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
    this.canDamage = true
    this.hasTimer = false
    this.moveSpeed = 150
    this.maxSpeed = 400
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
    //this.barProgress = 10;
    this.healthText = this.game.add.text(0, 40, 'health is:'+this.health, {
        font: '40px Arial',
        fill: 'green',
        align: 'center'
    });
    
    this.addChild(this.healthText)
    //this.myEnemy.add(this)
    //this.myEnemy.add(this.bar)
    this.game.add.existing(this.healthText)
    this.body.setSize(25, 25, 4, 4)
    game.world.bringToTop(this.healthText)
  }

  update () {
    //this.game.debug.body(this)
    this.healthText.setText(this.health)
    if (this.health < 4) {
      this.tint = 0x660000 
    } else if (this.health < 6) {
      this.tint = 0x990000
    } else if (this.health < 10) {
      this.tint = 0xFF0000
    }
    if (this.health <= 0) {
      this.kill()
    }
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
