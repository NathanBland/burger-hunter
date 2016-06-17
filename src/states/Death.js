/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

function eatBurger(player, burger) {
  burger.kill()
  game.burgerCount -= 1
  player.health += 0.5
}
function actionOnClick() {
  game.soundTimer.stop()
  game.soundTimer.destroy()
  game.sound.stopAll()
  game.state.start('Game')
}
export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    let banner = this.add.text(game.camera.width / 2, game.camera.height / 2, 'Burger-Hunter')
    //this.banner = game.add.sprite(game.world.centerX, game.world.centerY, 'gameMask')
    banner.font = 'Nunito'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)
    banner.fixedToCamera = true
    game.soundTimer.destroy()
    game.sound.stopAll()
    let button = game.add.button(game.camera.width / 2, (game.camera.height / 2)+60, 'floor', actionOnClick, this, 2, 1, 0);
    button.scale.setTo(4, 1);
    let buttonText = this.add.text(game.camera.width / 2, (game.camera.height / 2)+60, 'Start Over')
    buttonText.fill = '#FFFFFF'
    button.fixedToCamera = true
    game.world.bringToTop(banner)
    game.world.bringToTop(button)
    game.world.bringToTop(buttonText)
  }
  update () {
   
  }

}
