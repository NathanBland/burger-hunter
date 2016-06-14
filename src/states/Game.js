/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Block from '../sprites/Block'
import {buildRoom, setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Burger-Hunter')
    banner.font = 'Nunito'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.enableBody = true;
    
    this.player = new Player({
      game: this.game,
      x: 64,
      y: 64,
      asset: 'hero'
    })
    this.border = new Block({
      game: this.game,
      x: 80,
      y: 80,
      asset: 'wall'
    })
    this.game.physics.arcade.enable(this.player)
    this.player.enableBody = true
    this.player.physicsBodyType = Phaser.Physics.ARCADE
    this.player.collideWorldBounds = true
    
    this.room1 = game.add.group()
    this.rooms = game.add.group() 
    buildRoom(this.game, this.room1, 40,20)
    this.rooms.add(this.room1)
    //buildRoom(this, 20, 20)
    this.soundTimer = game.add.audio('timer')
    this.soundTimer.loop = true
    this.soundTimer.play()
    // set the sprite width to 30% of the game width
    //setResponsiveWidth(this.player, 30, this.game.world)
    this.game.add.existing(this.player)
    this.game.add.existing(this.rooms)
    this.game.add.existing(this.border)
  }
  update () {
    this.rooms.forEach((room) => {
      console.log('added collison!')
      this.game.physics.arcade.collide(this.player,room)
      this.game.physics.arcade.collide(this.player, this.border)
      this.game.physics.arcade.collide(room, this.border)
    })
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.player, 32, 32)
      //this.game.debug.bodyInfo(this.player, 32, 32);
      //this.game.debug.body(this.player);
      //this.game.debug.bodyInfo(this.player, 32, 32);
      this.game.debug.body(this.rooms);
    }
  }
}
