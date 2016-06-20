import Block from './sprites/Block.js'
import Floor from './sprites/Floor.js'
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
  let n = sizeX*sizeY-1
  var horiz =[]; 
  for (var j= 0; j<sizeX+1; j++) horiz[j]= []
    
  var  verti =[]; 
  for (var j= 0; j<sizeX+1; j++) verti[j]= []
  
  var here = [Math.floor(Math.random()*sizeX), Math.floor(Math.random()*sizeY)],
    path = [here],
    unvisited = [];
  for (var j = 0; j<sizeX+2; j++) {
    unvisited[j] = [];
    for (var k= 0; k<sizeY+1; k++)
      unvisited[j].push(j>0 && j<sizeX+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
  }
  while (0<n) {
    var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
        [here[0]-1, here[1]], [here[0],here[1]-1]];
    var neighbors = [];
    for (var j = 0; j < 4; j++) {
      if (unvisited[potential[j][0]+1][potential[j][1]+1]) {
        neighbors.push(potential[j]);
      }
    }
    if (neighbors.length) {
      n = n-1;
      var next= neighbors[Math.floor(Math.random()*neighbors.length)];
      unvisited[next[0]+1][next[1]+1]= false;
      if (next[0] == here[0]) {
        horiz[next[0]][(next[1]+here[1]-1)/2]= true;
      } else {
        verti[(next[0]+here[0]-1)/2][next[1]]= true;
      }
      path.push(here = next);
    } else {
      here = path.pop();
    }
  }
  let m = {x: sizeX, y: sizeY, horiz: horiz, verti: verti}
  var text= [];
  let spots = []
  let end= {}
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
    
		if (0 == j%2) {
			for (var k=0; k<m.y*4+1; k++) {
				if (0 == k%4) {
          let wall = new Block({
            game: game,
            x: startX+j*32,
            y: startY+k*32,
            asset: 'wall'
          })
          room.add(wall)
          game.physics.arcade.enable(wall)
          wall.body.immovable = true
					//line[k]= '+';
          
				} else {
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)]) {
						//line[k]= ' ';
            let floor = new Floor({
              game: game,
              x: startX+j*32,
              y: startY+k*32,
              asset: 'floor'
            })
            room.add(floor)
            spots.push({
              x: startX+j*32,
              y: startY+k*32,
            })
					} else {
						//line[k]= '-';
            let wall = new Block({
              game: game,
              x: startX+j*32,
              y: startY+k*32,
              asset: 'wall'
            })
            room.add(wall)
            game.physics.arcade.enable(wall)
            wall.body.immovable = true
          }
        }
      }
		} else {
			for (var k=0; k<m.y*4+1; k++) {
				if (0 == k%4) {
					if (k>0 && m.horiz[(j-1)/2][k/4-1]) {
						//line[k]= ' ';
            let floor = new Floor({
              game: game,
              x: startX+j*32,
              y: startY+k*32,
              asset: 'floor'
            })
            room.add(floor)
            spots.push({
              x: startX+j*32,
              y: startY+k*32,
            })
					} else {
						//line[k]= '|';
            let wall = new Block({
              game: game,
              x: startX+j*32,
              y: startY+k*32,
              asset: 'wall'
            })
            room.add(wall)
            game.physics.arcade.enable(wall)
            wall.body.immovable = true
          }
				} else {
					//line[k]= ' ';
          let floor = new Floor({
              game: game,
              x: startX+j*32,
              y: startY+k*32,
              asset: 'floor'
            })
          room.add(floor)
          spots.push({
            x: startX+j*32,
            y: startY+k*32,
          })
        }
      }
    }
		if (0 == j) {
      // //line[1]= line[2]= line[3]= ' ';
      // let block = new Block({
      //   game: game,
      //   x: startX+32,
      //   y: startY,
      //   asset: 'wall4'
      // })
      // room.add(block)
      // game.physics.arcade.enable(block)
      // block.body.immovable = true
    }
		if (m.x*2-1 == j) {
      // line[4*m.y]= ' '
      let block = new Block({
        game: game,
        x: startX+j*32,
        y: (startY+k*32)-64,
        asset: 'wall4'
      })
      end.x = startX+j*32
      end.y = (startY+k*32)-64
      room.add(block)
      game.physics.arcade.enable(block)
      //block.body.immovable = true
    }
		//text.push(line.join('')+'\r\n');
	}
      
  return {
    room: room,
    size: {
      width: sizeX,
      height: sizeY
    },
    pos: {
      startX: startX,
      startY: startY,
      endX: end.x,
      endY: end.y
    },
    open: spots
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

export function getRand (min, max) {
  return Math.random() * (max - min) + min
}

export function buildBurgers(game, room, burgers, num) {
  //let maxX = (room.pos.startX+(room.size.width) * 32)-32
  //let maxY = (room.pos.startY+(room.size.height) * 32)-32
  //console.log(room)
  for (let x=0; x<num;x++){
    let spot = Math.floor(getRand(0, room.open.length)) 
    //console.log('[x]', x, 'trying..',spot, room.open[spot])
    buildBurger(game, burgers, room.open[spot].x+16, room.open[spot].y+16)
    game.burgerCount += 1
    room.open.splice(spot, 1);
    //console.log('complete.')
  }
}

export function makeEnemies(game, room, enemiesGroup, num) {
  let safeZone = 32*8
  for (let x=0; x<num;x++){ 
    let spot = Math.floor(getRand(0, room.open.length))
    
    let enemy = new Enemy({
      game: game,
      x: room.open[spot].x,
      y: room.open[spot].y,
      asset: 'enemy'
    })
    if (enemy.body.x < room.pos.startX+safeZone && enemy.body.y < room.pos.startY+safeZone) {
      enemy.kill()
      x -= 1
    } else {
      enemiesGroup.add(enemy)
      room.open.splice(spot, 1)
    }
    //game.physics.arcade.enable(burger)
    //burger.enableBody = true
    //burger.physicsBodyType = Phaser.Physics.ARCADE
    //burger.body.immovable = true
  }
}