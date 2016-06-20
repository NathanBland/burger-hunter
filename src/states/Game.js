/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Block from '../sprites/Block'
import Enemy from '../sprites/Enemy'
import BasicMagic from '../sprites/Magic/Basic'
import Portal from '../sprites/Portal'
import {getRand, makeEnemies, buildRoom, buildBurgers, setResponsiveWidth} from '../utils'

function eatBurger(player, burger) {
  burger.kill()
  game.burgerCount -= 1
  player.health += 0.5
  player.energy += 0.5
}

function restartSounds () {
  setTimeout(function () {
    game.soundTimer.restart()
    return restartSounds()
  }, 6500)
}

function takeHit(player, enemy) {
  if (enemy.canDamage) {
    enemy.canDamage = false
    if (player.health > 1){
      game.soundTimer.stop()
      player.health -= 1
      console.log('player health:', player.health)
      
      game.hit.play()
      game.soundTimer.play()
    } else {
      //game.state.stop('Splash')
      //game.state.stop('Game')
      //game.soundTimer.stop()
      game.sound.stopAll()
      game.state.start('Death')
    }
  } else {
    setTimeout(function() {
      enemy.canDamage = true
    }, 500);
    return false
  }
}
function openLevel (gameState) {
  gameState.currentLevel += 1
  console.log('new map unlocked..')
  let portalSpot = gameState.currentRoom.open[gameState.currentRoom.open.length-1]
  let portal1 = new Portal({
    game: gameState.game,
    x: portalSpot.x,
    y: portalSpot.y,
    asset: 'portal'
  })
  gameState.game.add.existing(portal1)
  let newLevel = buildLevel(gameState, 15)
  let portalSpot2 = gameState.currentRoom.open[0]
  let portal2 = new Portal({
    game: gameState.game,
    x: portalSpot2.x,
    y: portalSpot2.y,
    asset: 'portal'
  })
  gameState.game.add.existing(portal2)
 }

function buildLevel (gameState, size) {
  let myGame = gameState.game
  let room = game.add.group()
  let level = gameState.currentLevel
  let start = {
    x: myGame.world.centerX-64,
    y: myGame.world.centerY-64
  }
  if (level > 1) {
    start.x = (myGame.world.centerX-58) + ((size.x) || size)*38
    start.y =  (myGame.world.centerY-54) + ((size.y) || size)*42
  }
  gameState.currentRoom = buildRoom(myGame, room, 
    start.x, start.y, size.x || size, size.y || size)
  myGame.rooms.add(room)
    
  buildBurgers(myGame, gameState.currentRoom, gameState.burgers, 50*level)
  makeEnemies(myGame, gameState.currentRoom, myGame.enemies, 10*level)
  
    
  //this.game.add.existing(this.enemy)
  gameState.game.add.existing(gameState.game.rooms)
  //this.game.add.existing(this.border)
  gameState.game.add.existing(gameState.burgers)
  gameState.game.add.existing(gameState.game.enemies)
  
  return {
    startX: gameState.currentRoom.startX,
    startY: gameState.currentRoom.startY,
    endX:  gameState.currentRoom.endX,
    endY:  gameState.currentRoom.endY
  }
}

export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    let gameSize = 1920*32
    let banner = this.add.text(gameSize/2, (gameSize/2)-130, 'Burger-Hunter')
    this.gameMask = game.add.sprite(0, 0, 'gameMask');
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
    
    this.currentLevel = 1
    // this.game.room1 = game.add.group()
    this.game.rooms = game.add.group() 
    this.burgers = game.add.group()
    this.game.enemies = game.add.group()
    this.game.burgerCount = 0
    
    this.game.burgerText = this.game.add.text(0, 0, 'burgers left:' + this.game.burgerCount, {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
    });
    this.game.burgerText.fixedToCamera = true
    
    this.game.healthText = this.game.add.text(0, 35, 'Health:' + 10, {
        font: '30px Arial',
        fill: 'green',
        align: 'center'
    });
    this.game.healthText.fixedToCamera = true
    
    this.game.energyText = this.game.add.text(0, 65, 'Energy:' + 10, {
        font: '30px Arial',
        fill: 'blue',
        align: 'center'
    });
    this.game.energyText.fixedToCamera = true
    
    //build inventory
    this.game.inv = []
    for (let x=0; x<5; x++) {
      let slot =  {
        graphic: game.add.graphics(0,50*x)
      }
      slot.graphic.lineStyle(2, 0x0000FF, 1)
      slot.graphic.drawRect(0, 120, 100, 100)
      slot.graphic.fixedToCamera = true
      this.game.inv.push(slot)
    }
    
    this.coords  = buildLevel(this, {
      x: 10,
      y: 5
    })
    console.log('coords:', this.coords)
    this.player = new Player({
      game: this.game,
      x: this.currentRoom.open[0].x+16,
      y: this.currentRoom.open[0].y+16,
      asset: 'hero'
    })
    
    this.game.add.existing(this.player)
  
    game.soundTimer = game.add.audio('timer')
    game.hit = game.add.audio('hit')
    game.damage = game.add.audio('damage')
    game.soundTimer.loop = false
    game.soundTimer.play()
    setTimeout(function () {
      game.soundTimer.restart()
      return restartSounds()
    }, 3000)
    
    this.game.camera.follow(this.player)
    
    //game.camera.deadzone = new Phaser.Rectangle(100, 100, 100, 400, 400);
    game.world.bringToTop(this.gameMask)
    game.world.bringToTop(this.game.burgerText)
    game.world.bringToTop(this.game.healthText)
    game.world.bringToTop(this.game.energyText)
    // game.world.bringToTop(this.game.inv1)
    this.game.inv.forEach(function (slot, idx) {
      game.world.bringToTop(slot.graphic)
    })
  }
  update () {
    
    if (this.game.burgerCount < 1) {
      openLevel(this)
    }
    
    this.game.physics.arcade.collide(this.player, this.border)
    //this.game.physics.arcade.collide(this.game.enemies, this.border)
    this.game.physics.arcade.collide(this.player, this.game.enemies, takeHit, null)
    this.game.physics.arcade.collide(this.player, this.burgers, eatBurger, null)
    this.game.rooms.forEach((room) => {
      this.game.physics.arcade.collide(this.player, room)
      this.game.physics.arcade.collide(this.game.enemies, room)
      //this.game.physics.arcade.collide(room, this.border)
      this.game.physics.arcade.collide(this.burgers, room)
    })
    this.game.burgerText.setText('burgers left: ' + this.game.burgerCount)
    this.game.healthText.setText('Health: ' + this.player.health)
    this.game.energyText.setText('Energy: ' + this.player.energy)
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.player, 32, 32)
      //this.game.debug.bodyInfo(this.player, 32, 32);
      //this.game.debug.body(this.player);
      //this.game.debug.bodyInfo(this.player, 32, 32);
      this.game.debug.body(this.game.rooms);
    }
  }
}
