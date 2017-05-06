import * as Enemy  from './enemy'
import * as Entity from './entity'

export type Wave = Enemy.Enemy[]


// export function make(kind: Enemy.EnemyType, start: Entity.Point, path: Enemy.Path, amount: number): Wave {
    /* TODO note Array.fill copies a pointer to the initial value all places
       this will break if types become mutable */
    // return Array(amount).fill(Enemy.make(start, kind, path))
// }

// export function update(wave: Wave): Wave {
    // return wave.map(enemy => Enemy.update)
// }