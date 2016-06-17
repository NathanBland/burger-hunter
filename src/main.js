import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import DeathState from './states/Death'

class Game extends Phaser.Game {

  constructor () {
    const baseSize = {
      width: Math.floor(window.innerWidth),
      height: Math.floor(window.innerHeight),
    }
    //let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth
    //let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight

    super(baseSize.width, baseSize.height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Death', DeathState, false)
    this.state.start('Boot')
  }
}

window.game = new Game()
