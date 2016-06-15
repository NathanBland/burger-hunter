/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Block from '../sprites/Block'
import Enemy from '../sprites/Enemy'
import {makeEnemies, buildRoom, buildBurgers, setResponsiveWidth} from '../utils'

function eatBurger(player, burger) {
  burger.kill()
  game.burgerCount -= 1
  player.health += 0.5
}
function takeHit(player, burger) {
  game.soundTimer.stop()
  if (player.health > 1){
    player.health -= 1
    console.log('player health:', player.health)
    
    game.hit.play()
    game.soundTimer.play()
  } else {
    //game.state.stop('Splash')
    //game.state.stop('Game')
    //game.soundTimer.stop()
    game.sound.stopAll()
    game.state.start('Splash')
  }
}
export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    let gameSize = 1920*32
    let banner = this.add.text(gameSize/2, (gameSize/2)-130, 'Burger-Hunter')
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
    this.game.world.setBounds(gameSize*0, gameSize*0, gameSize, gameSize)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.enableBody = true;
    
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX-16,
      y: this.game.world.centerY-16,
      asset: 'hero'
    })
    this.border = new Block({
      game: this.game,
      x: this.player.body.x+48,
      y: this.player.body.y+48,
      asset: 'wall'
    })
    /*this.enemy = new Enemy({
      game: this.game,
      x: this.game.world.centerX+256,
      y: this.game.world.centerY+256,
      asset: 'enemy'
    })
    */
    //buildBurger
    
    this.room1 = game.add.group()
    this.rooms = game.add.group() 
    this.burgers = game.add.group()
    this.enemies = game.add.group()
    this.game.burgerCount = 0
    this.game.burgerText = this.game.add.text(0, 0, 'burgers left:' + this.game.burgerCount, {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
    });
    this.game.burgerText.fixedToCamera = true
    this.game.healthText = this.game.add.text(0, 35, 'Health:' + this.player.health, {
        font: '30px Arial',
        fill: 'green',
        align: 'center'
    });
    this.game.healthText.fixedToCamera = true
    //this.game.burgerText.anchor.setTo(0.5, 0.5)
    this.currentRoom = buildRoom(this.game, this.room1, this.game.world.centerX-64, this.game.world.centerY-64, 40, 20)
    this.rooms.add(this.room1)
    
    buildBurgers(this.game, this.currentRoom, this.burgers, 50)
    makeEnemies(this.game, this.currentRoom, this.enemies, 50)
  
    this.game.soundTimer = game.add.audio('timer')
    this.game.hit = game.add.audio('hit')
    this.game.soundTimer.loop = true
    this.game.soundTimer.play()
    
    this.game.add.existing(this.player)
    //this.game.add.existing(this.enemy)
    this.game.add.existing(this.rooms)
    this.game.add.existing(this.border)
    this.game.add.existing(this.burgers)
    this.game.add.existing(this.enemies)
    
    this.game.camera.follow(this.player)
    
    //game.camera.deadzone = new Phaser.Rectangle(100, 100, 100, 400, 400);
    game.world.bringToTop(this.gameMask)
    game.world.bringToTop(this.game.burgerText)
    game.world.bringToTop(this.game.healthText)
  }
  update () {
    this.game.physics.arcade.collide(this.player, this.border)
    this.game.physics.arcade.collide(this.enemies, this.border)
    this.game.physics.arcade.collide(this.player, this.enemies, takeHit, null)
    this.game.physics.arcade.collide(this.player, this.burgers, eatBurger, null)
    this.rooms.forEach((room) => {
      this.game.physics.arcade.collide(this.player, room)
      this.game.physics.arcade.collide(this.enemies, room)
      this.game.physics.arcade.collide(room, this.border)
      this.game.physics.arcade.collide(this.burgers, room)
    })
    this.game.burgerText.setText('burgers left: ' + this.game.burgerCount)
    this.game.healthText.setText('Health: ' + this.player.health)
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
