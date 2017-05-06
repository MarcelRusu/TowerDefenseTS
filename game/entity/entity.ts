import * as Enemy  from './enemy'
import * as Tower  from './tower'
import * as Menu   from './menu'
import * as Bullet from './bullet'
import * as Id     from '../utils/id'

export type Point    = { x: number, y: number }
export type Velocity = { vx: number, vy: number }
export type Killable = { hp: number }
export type Size     = { w: number, h: number }
export type Shooter  = { 
    reloadTime: number, 
    timeSince: number
    radius: number, 
    dmg: number 
}

export type EntityType = Enemy.EnemyType | Tower.TowerType | Bullet.BulletType | Menu.MenuType
export type Entity = Point & Size & { kind: EntityType, id: Id.Id } 

export function draw(entity: Entity): void {
  if (entity.kind === 'AirEnemy' || entity.kind === 'GroundEnemy') 
    Enemy.draw(entity as Enemy.Enemy)
  else if (entity.kind === 'AirTower' || entity.kind === 'GroundTower' || entity.kind === 'BothTower')
    Tower.draw(entity as Tower.Tower)
  else if (entity.kind === 'AirBullet' || entity.kind === 'GroundBullet')
    Bullet.draw(entity as Bullet.Bullet)
}


export const equal = (entityA: Entity, entityB: Entity) => entityA.id === entityB.id