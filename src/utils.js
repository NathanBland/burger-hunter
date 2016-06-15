import Block from './sprites/Block.js'
import Burger from './sprites/BasicBurger.js'
import Enemy from './sprites/Enemy.js'
export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export function  buildRoom(game, room, startX, startY, sizeX, sizeY) {
  for (let w=0; w<sizeX;w++){
    for (let h=0; h<sizeY;h++){
      
        if (w === 0 || h === 0 || w===(sizeX-1) || h===(sizeY-1)) {
          let wall = new Block({
            game: game,
            x: startX+w*32,
            y: startY+h*32,
            asset: 'wall'
          })
          room.add(wall)
          game.physics.arcade.enable(wall)
          wall.enableBody = true
          wall.physicsBodyType = Phaser.Physics.ARCADE
          wall.body.immovable = true
          //game.debug.bodyInfo(wall, 32, 32);
          //game.debug.body(wall)
        }
      
    }
  }
  return {
    room: room,
    size: {
      width: sizeX,
      height: sizeY
    },
    pos: {
      startX: startX,
      startY: startY
    }
  }
}

export function  buildBurger(game, burgers, x, y) {
  let burger = new Burger({
    game: game,
    x: x,
    y: y,
    asset: 'basic-burger'
  })
  burgers.add(burger)
  game.physics.arcade.enable(burger)
  burger.enableBody = true
  burger.physicsBodyType = Phaser.Physics.ARCADE
  burger.body.immovable = true
  //return burger
}

function getRand (min, max) {
  return Math.random() * (max - min) + min
}

export function buildBurgers(game, room, burgers, num) {
  let maxX = (room.pos.startX+(room.size.width) * 32)-32
  let maxY = (room.pos.startY+(room.size.height) * 32)-32
  
  for (let x=0; x<num;x++){ 
    buildBurger(game, burgers, getRand(room.pos.startX+32, maxX), getRand(room.pos.startY+32, maxY))
    game.burgerCount += 1
  }
}

export function makeEnemies(game, room, enemiesGroup, num) {
  let maxX = (room.pos.startX+(room.size.width) * 32)-32
  let maxY = (room.pos.startY+(room.size.height) * 32)-32
  let safeZone = 32*8
  for (let x=0; x<num;x++){ 
    let enemy = new Enemy({
      game: game,
      x: getRand(room.pos.startX+48, maxX),
      y: getRand(room.pos.startY+48, maxY),
      asset: 'enemy'
    })
    if (enemy.body.x < room.pos.startX+safeZone && enemy.body.y < room.pos.startY+safeZone) {
      enemy.kill()
      x -= 1
    } else {
      enemiesGroup.add(enemy)
    }
    //game.physics.arcade.enable(burger)
    //burger.enableBody = true
    //burger.physicsBodyType = Phaser.Physics.ARCADE
    //burger.body.immovable = true
  }
}