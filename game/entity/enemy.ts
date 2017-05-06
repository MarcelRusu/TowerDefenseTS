/* TODO rename variables / Combine Walk with Path */
import * as Entity from './entity'
import * as Action from '../action/action'
import * as Queue  from '../action/queue'
import * as Utils  from '../utils/utils'
import * as Game   from '../game'
import * as Id     from '../utils/id'
import * as Draw   from '../draw/draw'

/* Horrible naming */
export type Path = { 
  path: Entity.Point[], 
  index: number, /* Floating point number */
  indexPerFrame: number, /* index / frame (sec) */
}

export type EnemyType = 'GroundEnemy' | 'AirEnemy'
export type Enemy = Entity.Entity & Entity.Killable & Path
export type EnemyAction = { 
  kind: 'EnemyAction', 
  action: 'Update Path' | 'Hit' | 'None', 
  dmg?: number, 
  id?: Id.Id 
}
export const noneAction: EnemyAction = { kind: 'EnemyAction', action: 'None' }

/* NOTE this is a horrible design things will be inconsistent speed */
/* For a given path and index (note: index is not an integer) 
  gets the actual Point the enemy should be */
function getLocationInPath(path: Entity.Point[], index: number): Entity.Point {
  const [from, to]: Entity.Point[] = [path[Math.floor(index)], path[Math.ceil(index)]]
  const percentage = index - Math.floor(index)
  const locationDistance = Utils.calcDistance(from, to) * percentage
  const opposite = to.y - from.y
  const adjancent = to.x - from.x
  const angle = Math.atan(opposite / adjancent)
  return { x: locationDistance * Math.cos(angle), y: locationDistance * Math.sin(angle) }
}

export function draw(enemy: Enemy): void {
  switch (enemy.kind) {
    case 'GroundEnemy':
      // paint ground Enemy
      Draw.fill(200, 50, 20) // completely placeholder
      Draw.ellipse(enemy.x, enemy.y, enemy.w, enemy.h)
      break
    case 'AirEnemy':
      // paint air Enemy
      Draw.fill(20, 255, 200) // completely placeholder
      // TODO maybe have a more complex shape
      Draw.rect(enemy.x, enemy.y, enemy.w, enemy.h)
      break
    default:
      throw new Error('Not a enemy type');
  }
}

export function make(pos: Entity.Point, kind: EnemyType, path: Path ): Enemy {
  const [w, h] = [50, 50]
  switch (kind) {
    case 'GroundEnemy':
      return { ...pos, ...path, kind, hp: 100, w, h, id: Id.make() }
    case 'AirEnemy':
      return { ...pos, ...path, kind, hp: 75, w, h, id: Id.make() }
    default:
      throw new Error('Not an enemy type!')
  }
}

export function update(enemy: Enemy, action: EnemyAction): Enemy {
  switch (action.action) {
    case 'None':
      const newLocation = getLocationInPath(enemy.path, enemy.index) 
      
      return { ...enemy, ...newLocation, index: enemy.index + enemy.indexPerFrame }
    case 'Hit':
      if (enemy.hp - action.dmg <= 0) {
        const action: Game.GameAction = { 
          kind   : 'GameAction', 
          action : 'RemoveEntity', 
          id     : enemy.id
        }
        Queue.add(action)
      }
      return { ...enemy, hp: enemy.hp - action.dmg }
    case 'Update Path':
      //TODO do shit
  }
}
