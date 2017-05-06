import * as Entity from './entity'
import * as Enemy  from './enemy'
import * as Action from '../action/action'
import * as Bullet from './bullet'
import * as Game   from '../game'
import * as Utils  from '../utils/utils'
import * as Queue  from '../action/queue'
import * as Id     from '../utils/id'
import * as Draw   from '../draw/draw'

export type TowerType = 'GroundTower' | 'AirTower' | 'BothTower'
export type Tower = Entity.Entity & Entity.Shooter 
export type TowerAction = { 
  kind: 'TowerAction', 
  action : 'Shoot' | 'None', 
  to?: Entity.Point, 
  from?: Entity.Point, 
  speed?: number, 
  id?: Id.Id
}

export const noneAction: TowerAction = { kind: 'TowerAction', action: 'None' }

export function update(tower: Tower, ens: Enemy.Enemy[], towerAction: TowerAction): Tower {
  switch (towerAction.action) {
    case 'Shoot':
      let kind: Bullet.BulletType
      if (tower.kind === 'GroundTower') kind = 'GroundBullet'
      if (tower.kind === 'AirTower') kind = 'AirBullet'    
      const bullet = Bullet.make(towerAction.from, towerAction.to, towerAction.speed, kind)
      const action: Game.GameAction = { kind: 'GameAction', action: 'AddEntity', entity: bullet }
      Queue.add(action)
      return { ...tower, timeSince: 0 }
    case 'None':
      ens.forEach(en => {
        if (Utils.calcDistance(en as Entity.Point, tower as Entity.Point) <= tower.radius
          && tower.timeSince >= tower.reloadTime) {
          /* From newTower to en */
          const towerAction: TowerAction = {
            action: 'Shoot',
            from: tower as Entity.Point,
            to: en as Entity.Point,
            kind: 'TowerAction',
            speed: 10, // place holder speed
            id: tower.id
          }
          Queue.add(towerAction)
        }
      })
      return { ...tower, timeSince: tower.timeSince + 1 }
    default:
      throw new Error('Not a tower event')
  }
}

export function draw(tower: Tower): void {
  switch (tower.kind) {
    case 'GroundTower':  
      Draw.fill(20, 50, 100)
      // debugger    
      Draw.rect(tower.x, tower.y, tower.w, tower.h)
      break
    case 'AirTower':
      Draw.fill(20, 50, 100)
      Draw.triangle(tower.x, tower.y, tower.x - 20, tower.y + 40, tower.x + 20, tower.y + 40)
      // paint code
      break
    case 'BothTower':
      // Paint Both
      break
    default:
      throw new Error('Not a tower type');
  }
}

export function make(pos: Entity.Point, kind: TowerType): Tower {
  let reloadTime:number, timeSince:number, radius:number, dmg:number
  const [w, h] = [50, 50]
  switch (kind) { // change values
    case 'AirTower':
      reloadTime = 10
      timeSince  = 0
      radius     = 10
      dmg        = 5
      break
    case 'GroundTower':
      reloadTime = 10
      timeSince  = 0
      radius     = 10
      dmg        = 5
      break 
    case 'BothTower':
      reloadTime = 10
      timeSince  = 0
      radius     = 10
      dmg        = 5
      break
    default:
      throw new Error('can\'t make tower')
  }

  return { ...pos, kind, reloadTime, timeSince, radius, dmg , w, h, id: Id.make() }
}