import { EnemyAction } from '../entity/enemy'
import { TowerAction } from '../entity/tower'
import { Point }       from '../entity/entity'
import { MenuAction }  from '../entity/menu'
import { GameAction }  from '../game'

export type MouseAction = { kind: 'MouseAction', action: 'Click' | 'ClickDrag' | 'None', pt?: Point }
export type NoneAction = { kind: 'NoneAction', action: 'None' }
export type Action = MouseAction | EnemyAction | TowerAction | MenuAction | GameAction | NoneAction

export type ActionQueue = Action[]
export const noneAction: NoneAction = { kind: 'NoneAction', action: 'None' }
