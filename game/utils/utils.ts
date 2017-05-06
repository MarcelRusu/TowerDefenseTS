import * as Entity from '../entity/entity'

export function calcDistance(from: Entity.Point, to: Entity.Point): number {
  return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
}

export function pointIn(pos: Entity.Point, entity: Entity.Entity): boolean {
  return pos.x >= entity.x && pos.x <= entity.x + entity.w
      && pos.y >= entity.y && pos.y <= entity.y + entity.h
}

export function calcVelocity(from: Entity.Point, to: Entity.Point, speed: number): Entity.Velocity {
  const opposite = to.y - from.y
  const adjacent = to.x - from.x 
  const angle = Math.atan(opposite / adjacent)
  return { vx: speed * Math.cos(angle), vy: speed * Math.sin(angle) }
}