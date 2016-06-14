import Block from './sprites/Block.js'
import Burger from './sprites/BasicBurger.js'
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

export function  buildRoom(game, room, x, y) {
  for (let w=0; w<x;w++){
    for (let h=0; h<y;h++){
      if (w === 0 || h === 0 || w===(x-1) || h===(y-1)) {
        let wall = new Block({
          game: game,
          x: w*32,
          y: h*32,
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
      width: x,
      height: y
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
  let maxX = ((room.size.width-1) * 32)
  let maxY = ((room.size.height-1) * 32)
  
  for (let x=0; x<num;x++){ 
    buildBurger(game, burgers, getRand(32, maxX), getRand(32, maxY))
  }
}