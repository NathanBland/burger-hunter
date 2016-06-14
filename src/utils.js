import Block from './sprites/Block.js'

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
          x: 16+w*32,
          y: 16+h*32,
          asset: 'wall'
        })
        room.add(wall)
        game.physics.arcade.enable(wall)
        wall.enableBody = true
        wall.physicsBodyType = Phaser.Physics.ARCADE
        wall.body.immovable = true
        game.debug.bodyInfo(wall, 32, 32);
        game.debug.body(wall)
      }
    }
  }
}