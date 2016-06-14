/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Block from '../sprites/Block'
import {buildRoom, buildBurgers, setResponsiveWidth} from '../utils'

function eatBurger(player, burger) {
  burger.kill()
}

export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Burger-Hunter')
    this.gameMask = game.add.sprite(0, 0, 'gameMask');
    //this.gameMask.scale.setTo(0.5, 0.5)
    this.gameMask.width = Math.floor(window.innerWidth)
    this.gameMask.height = Math.floor(window.innerHeight)
    //this.gameMask.tint = 'red'
    this.gameMask.fixedToCamera = true
    banner.font = 'Nunito'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)
    this.game.world.setBounds(0, 0, 1920, 1920)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.enableBody = true;
    
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'hero'
    })
    this.border = new Block({
      game: this.game,
      x: 80,
      y: 80,
      asset: 'wall'
    })
    //buildBurger
    
    this.room1 = game.add.group()
    this.rooms = game.add.group() 
    this.burgers = game.add.group()
    
    this.currentRoom = buildRoom(this.game, this.room1, 40,20)
    this.rooms.add(this.room1)
    buildBurgers(this.game, this.currentRoom, this.burgers, 10)
    
  
    this.soundTimer = game.add.audio('timer')
    this.soundTimer.loop = true
    this.soundTimer.play()
    // set the sprite width to 30% of the game width
    //setResponsiveWidth(this.player, 30, this.game.world)
    this.game.add.existing(this.player)
    this.game.add.existing(this.rooms)
    this.game.add.existing(this.border)
    this.game.add.existing(this.burgers)
    
    this.game.camera.follow(this.player)
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    game.world.bringToTop(this.gameMask)
  }
  update () {
    this.game.physics.arcade.collide(this.player, this.border)
    this.game.physics.arcade.collide(this.player, this.burgers, eatBurger, null)
    this.rooms.forEach((room) => {
      this.game.physics.arcade.collide(this.player, room)
      this.game.physics.arcade.collide(room, this.border)
      this.game.physics.arcade.collide(this.burgers, room)
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
