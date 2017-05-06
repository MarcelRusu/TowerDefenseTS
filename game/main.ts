import * as Game   from './game'
import * as Action from './action/action'
import * as Queue  from './action/queue' 
import * as Draw   from './draw/draw'

let game = Game.make()

/* Main */
function setup(): void {
  Queue.add(Game.gameNone)
}

function drawBackground(): void {
  Draw.fill(20, 100, 20)
  Draw.rect(0, 0, Draw.screenWidth, Draw.screenHeight)
}

function draw(): void {
  drawBackground()
  if (Queue.isEmpty()) Queue.add(Game.gameNone) 
  const nextAction: Action.Action = Queue.remove()
  Game.draw(game)
  game = Game.update(game, nextAction)
}

/* Run */
(() => {
  setup()
  const mainLoop = setInterval(() => {
    try {
      draw()
    } catch(e) {
      clearInterval(mainLoop)
    }
  }, 1000/60)
})()