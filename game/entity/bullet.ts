import * as Entity from './entity'
import * as Utils  from '../utils/utils'
import * as Id     from '../utils/id'
import * as Draw   from '../draw/draw'

export type BulletType = 'GroundBullet' | 'AirBullet'
export type Bullet = Entity.Entity & Entity.Velocity

export function make(from: Entity.Point, to: Entity.Point, speed: number, kind: BulletType): Bullet {
  const [w, h] = [5, 5]
  return { ...from, ...Utils.calcVelocity(from, to, speed), w, h, kind, id: Id.make() }
}

export function update(bullet: Bullet): Bullet {
  return { ...bullet, x: bullet.x + bullet.vx, y: bullet.y + bullet.vy }
}

export function draw(bullet: Bullet): void {
  if (bullet.kind === 'AirBullet') Draw.fill(0, 0, 0)
  if (bullet.kind === 'GroundBullet') Draw.fill(200, 0, 0)  
  Draw.rect(bullet.x, bullet.y, bullet.w, bullet.h)
}
