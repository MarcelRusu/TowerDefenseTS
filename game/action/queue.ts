import * as Action from './action'

/**
 * Global mutable queue object for actions 
 */
const actionQueue: Action.ActionQueue = []
// const history: Action.ActionQueue = []
// const historySize = 10

export function add(action: Action.Action) {
    actionQueue.push(action)
}

export function remove() {
    const action =  actionQueue.splice(actionQueue.length - 1, 1)[0]
    // if (history.length < historySize) history.push(action)
    // else {
    //     history.splice(history.length - 1, 1)
    //     history.push(action)
    // }
    return action 
}

export function isEmpty() {
    return actionQueue.length === 0
}

// export function checkSync(externHistory: Action.Action[]) {
//     return !history.some((action, i) => externHistory[i].kind !== action.kind
//                                      || externHistory[i].action !== action.action)
// }