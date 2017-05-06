import * as Entity from './entity'
import * as Enemy  from './enemy'
import * as Tower  from './tower'
import * as Action from '../action/action'
import * as Game   from '../game'
import * as Utils  from '../utils/utils'
import * as Queue  from '../action/queue'
import * as Id     from '../utils/id'
import * as Draw   from '../draw/draw'

export type MenuType = 'Menu'
export type Menu =  { entities: Entity.Entity[], dragging?: Entity.Entity, id: Id.Id } & Entity.Entity
export type MenuAction = { kind: 'MenuAction', action: 'Dragging' | 'Drop' | 'None' }
export const noneAction: MenuAction = { kind: 'MenuAction', action: 'None' }

export function draw(menu: Menu): void {
  Draw.fill(200, 0, 0)
  Draw.rect(menu.x, menu.y, menu.w, menu.h)
  menu.entities.forEach(Entity.draw)
  if (menu.dragging) Entity.draw(menu.dragging)
}

export function update(menu: Menu, menuAction: MenuAction): Menu {
  // if (menuAction.action !== 'None') console.log(menuAction.action)
  switch(menuAction.action) {
    case 'Dragging':
      const mousePoint: Entity.Point = { x: Draw.mouseX, y: Draw.mouseY }
      if (Draw.mouseClicked && !Utils.pointIn(mousePoint, menu)) {
        const action: MenuAction = { kind: 'MenuAction', action: 'Drop' }
        Queue.add(action)
      } else {
        Queue.add(menuAction)
      }
      return menu
    case 'Drop':
      const entity: Entity.Entity = { ...menu.dragging, x: Draw.mouseX, y: Draw.mouseY }
      const action: Game.GameAction = { kind: 'GameAction', action: 'AddEntity', entity, id: menu.dragging.id }
      Queue.add(action)
      // debugger
      /* remove the entity from menu */
      return { entities: menu.entities, id: menu.id, kind: 'Menu', x: Draw.screenWidth - 100, y: 0, w: 99, h: 499 }
    case 'None':
      let dragging: Entity.Entity
      if (Draw.mouseClicked) {
        const mousePoint: Entity.Point = { x: Draw.mouseX, y: Draw.mouseY }
        menu.entities.forEach(en => {
          if (Utils.pointIn(mousePoint, en)) {
            const action: MenuAction = { kind: 'MenuAction', action: 'Dragging' }
            dragging = en
            Queue.add(action)
          }
        })
      }
      return { ...menu, dragging }
    default:
      throw new Error('Not a Menu action')
  }
}

export function make(startX: number) : Menu {
  const air = Tower.make({ x: startX + 50, y: 40 }, 'AirTower')
  const ground = Tower.make({ x: startX + 30, y: 90 }, 'GroundTower')
  return { entities: [air, ground], id: Id.make(), x: startX, y: 0, w: 99, h: 499, kind: 'Menu' }
}
