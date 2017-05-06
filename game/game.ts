import * as Menu   from './entity/menu'
import * as Enemy  from './entity/enemy'
import * as Entity from './entity/entity'
import * as Tower  from './entity/tower'
import * as Bullet from './entity/bullet'
import * as Action from './action/action'
import * as Utils  from './utils/utils'
import * as Queue  from './action/queue'
import * as Id     from './utils/id'
import * as Draw   from './draw/draw'

type Game = [ Enemy.Enemy[], Tower.Tower[], Bullet.Bullet[], Menu.Menu ]


const wave: Enemy.Enemy[] = [...Array(10).keys()].map(i => 
              Enemy.make(
                { 
                  x: i * 100 - 1000, 
                  y: 50 + i * 2
                }, 
                'GroundEnemy', 
                {
                  path: [{ x: 0, y: 0 }],
                  index: 0,
                  indexPerFrame: 2
                }
              )
            )

/**
 * AddEntity and RemoveEntity requires entity to be defined
 */
export type GameAction = { 
  kind    : 'GameAction', 
  action  : 'AddEntity' | 'RemoveEntity' | 'None', 
  entity? : Entity.Entity
  id?     : Id.Id
}

export const gameNone: GameAction = { kind: 'GameAction', action: 'None' }


export function draw([ enemies, towers, bullets, menu ]: Game): void {
  Menu.draw(menu)
  enemies.forEach(Enemy.draw)
  towers.forEach(Tower.draw)
  bullets.forEach(Bullet.draw)
}

export function make(): Game {
  const menu = Menu.make(Draw.screenWidth - 100)
  wave.forEach(en => Queue.add({ action: 'AddEntity', kind: 'GameAction', entity: en }))
  return [wave, [], [], menu]
}

function updateGame([ enemies, towers, bullets, menu ]: Game, action: GameAction): Game {
  /* Think about moving this elsewhere */
  switch (action.action) {
    case 'AddEntity':
    case 'RemoveEntity':
      // debugger
      // if 
      switch (action.entity.kind) {
        case 'AirBullet': 
        case 'GroundBullet':
          if (action.action === 'AddEntity') {
            bullets.push(action.entity as Bullet.Bullet)
          } else if (action.action === 'RemoveEntity') {
            const bul = action.entity as Bullet.Bullet
            bullets = bullets.filter(bullet => !Entity.equal(bullet, bul))
          }
        break
        case 'AirEnemy':
        case 'GroundEnemy':
          if (action.action === 'AddEntity') {
            enemies.push(action.entity as Enemy.Enemy)
          } else if (action.action === 'RemoveEntity') {
            const en = action.entity as Enemy.Enemy
            enemies = enemies.filter(enemy => !Entity.equal(enemy, en)) 
          }
        break
        case 'AirTower':
        case 'GroundTower':
        case 'BothTower':
          if (action.action === 'AddEntity') {
            towers.push(action.entity as Tower.Tower)
          } else if (action.action === 'RemoveEntity') {
            const tw = action.entity as Tower.Tower
            towers = towers.filter(tower => !Entity.equal(tw, tower))
          }
        break
      }
    break
    case 'None':
      bullets.forEach(bullet => enemies.forEach(enemy => {
        if (Utils.pointIn(bullet as Entity.Point, enemy as Entity.Entity)) {
          const action: GameAction = { 
            kind   : 'GameAction', 
            action : 'RemoveEntity', 
            entity : enemy 
          }
          Queue.add(action)
        }
      }))
    break
    default:
      throw new Error('Not a main action')
  }

  return [enemies, towers, bullets, menu]
}

export function update([enemies, towers, bullets, menu]: Game, action: Action.Action): Game {
  /* Defaults all the actions to respective none actions */
  let towerAction = Tower.noneAction, 
      enemyAction = Enemy.noneAction,
      menuAction = Menu.noneAction
  if (action.action !== 'None') console.log(action.action)
  switch (action.kind) {
    case 'TowerAction':
      towerAction = action as Tower.TowerAction
    break
    case 'EnemyAction':
      enemyAction = action as Enemy.EnemyAction
    break
    case 'MenuAction':
      menuAction = action as Menu.MenuAction
    break
    case 'GameAction':
      /** QUESTIONABLE */
      [enemies, towers, bullets, menu] = updateGame([enemies, towers, bullets, menu], action)
    break
    case 'NoneAction':
    break
    default:
      throw new Error(`${action} is Not an Action`)
  }
  const newEnemies = [ ...enemies.map(enemy => {
    if (enemyAction.action !== 'None' && enemy.id === enemyAction.id)
      return Enemy.update(enemy, enemyAction)
    else 
      return Enemy.update(enemy, Enemy.noneAction)
  }) ]
  const newTowers  = [ ...towers.map(tower => {
    if (towerAction.action !== 'None' && tower.id === towerAction.id)
      return Tower.update(tower, enemies, towerAction)
    else 
      return Tower.update(tower, enemies, Tower.noneAction)
  }) ]
  const newBullets = [ ...bullets.map(Bullet.update) ]
  const newMenu    = Menu.update(menu, menuAction)
  /* Maybe rethink this */
  return [newEnemies, newTowers, newBullets, newMenu]
}