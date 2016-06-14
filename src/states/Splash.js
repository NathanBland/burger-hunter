import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.stage.backgroundColor = 'black'
    this.load.spritesheet('hero', 'assets/tiny-rpg-town-files/spritesheets/hero.png', 16, 16)
    this.load.image('wall', 'assets/platform_gfx/tiles/block4.png')
    this.load.audio('timer', 'assets/sounds/timer-first-half-loop.wav')
    //this.load.image('mushroom', 'assets/images/mushroom2.png')
  }

  create () {
    this.state.start('Game')
  }

}
