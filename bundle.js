/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const canvasElem = document.getElementById('canvas');
const ctx = canvasElem.getContext('2d');
exports.mouseX = 0;
exports.mouseY = 0;
exports.mouseClicked = false;
window.onmousedown = (event) => exports.mouseClicked = true;
window.onmouseup = (event) => exports.mouseClicked = false;
window.onmousemove = (event) => [exports.mouseX, exports.mouseY] = [event.clientX, event.clientY];
exports.fill = (red, green, blue) => {
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    // ctx.fill()
};
exports.rect = (x, y, w, h) => ctx.fillRect(x, y, w, h);
exports.triangle = (x1, y1, x2, y2, x3, y3) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
};
exports.ellipse = (x, y, r1, r2) => ctx.ellipse(x, y, r1, r2, 0, 0, 0);
exports.screenWidth = canvasElem.clientWidth;
exports.screenHeight = canvasElem.clientHeight;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Global mutable queue object for actions
 */
const actionQueue = [];
// const history: Action.ActionQueue = []
// const historySize = 10
function add(action) {
    actionQueue.push(action);
}
exports.add = add;
function remove() {
    const action = actionQueue.splice(actionQueue.length - 1, 1)[0];
    // if (history.length < historySize) history.push(action)
    // else {
    //     history.splice(history.length - 1, 1)
    //     history.push(action)
    // }
    return action;
}
exports.remove = remove;
function isEmpty() {
    return actionQueue.length === 0;
}
exports.isEmpty = isEmpty;
// export function checkSync(externHistory: Action.Action[]) {
//     return !history.some((action, i) => externHistory[i].kind !== action.kind
//                                      || externHistory[i].action !== action.action)
// } 


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function calcDistance(from, to) {
    return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
}
exports.calcDistance = calcDistance;
function pointIn(pos, entity) {
    return pos.x >= entity.x && pos.x <= entity.x + entity.w
        && pos.y >= entity.y && pos.y <= entity.y + entity.h;
}
exports.pointIn = pointIn;
function calcVelocity(from, to, speed) {
    const opposite = to.y - from.y;
    const adjacent = to.x - from.x;
    const angle = Math.atan(opposite / adjacent);
    return { vx: speed * Math.cos(angle), vy: speed * Math.sin(angle) };
}
exports.calcVelocity = calcVelocity;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ids = [];
/* NON-FP garbage xd */
function make() {
    let id = '', len, num;
    while (id === '' || ids.indexOf(id) !== -1) {
        id = '';
        len = Math.random() * 30 + 10;
        for (let i = 0; i < len; i++) {
            num = Math.floor(Math.random() * len);
            id += String.fromCharCode(num);
        }
    }
    return id;
}
exports.make = make;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
const Id = __webpack_require__(3);
const Draw = __webpack_require__(0);
function make(from, to, speed, kind) {
    const [w, h] = [5, 5];
    return Object.assign({}, from, Utils.calcVelocity(from, to, speed), { w, h, kind, id: Id.make() });
}
exports.make = make;
function update(bullet) {
    return Object.assign({}, bullet, { x: bullet.x + bullet.vx, y: bullet.y + bullet.vy });
}
exports.update = update;
function draw(bullet) {
    if (bullet.kind === 'AirBullet')
        Draw.fill(0, 0, 0);
    if (bullet.kind === 'GroundBullet')
        Draw.fill(200, 0, 0);
    Draw.rect(bullet.x, bullet.y, bullet.w, bullet.h);
}
exports.draw = draw;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Bullet = __webpack_require__(4);
const Utils = __webpack_require__(2);
const Queue = __webpack_require__(1);
const Id = __webpack_require__(3);
const Draw = __webpack_require__(0);
exports.noneAction = { kind: 'TowerAction', action: 'None' };
function update(tower, ens, towerAction) {
    switch (towerAction.action) {
        case 'Shoot':
            let kind;
            if (tower.kind === 'GroundTower')
                kind = 'GroundBullet';
            if (tower.kind === 'AirTower')
                kind = 'AirBullet';
            const bullet = Bullet.make(towerAction.from, towerAction.to, towerAction.speed, kind);
            const action = { kind: 'GameAction', action: 'AddEntity', entity: bullet };
            Queue.add(action);
            return Object.assign({}, tower, { timeSince: 0 });
        case 'None':
            ens.forEach(en => {
                if (Utils.calcDistance(en, tower) <= tower.radius
                    && tower.timeSince >= tower.reloadTime) {
                    /* From newTower to en */
                    const towerAction = {
                        action: 'Shoot',
                        from: tower,
                        to: en,
                        kind: 'TowerAction',
                        speed: 10,
                        id: tower.id
                    };
                    Queue.add(towerAction);
                }
            });
            return Object.assign({}, tower, { timeSince: tower.timeSince + 1 });
        default:
            throw new Error('Not a tower event');
    }
}
exports.update = update;
function draw(tower) {
    switch (tower.kind) {
        case 'GroundTower':
            Draw.fill(20, 50, 100);
            // debugger    
            Draw.rect(tower.x, tower.y, tower.w, tower.h);
            break;
        case 'AirTower':
            Draw.fill(20, 50, 100);
            Draw.triangle(tower.x, tower.y, tower.x - 20, tower.y + 40, tower.x + 20, tower.y + 40);
            // paint code
            break;
        case 'BothTower':
            // Paint Both
            break;
        default:
            throw new Error('Not a tower type');
    }
}
exports.draw = draw;
function make(pos, kind) {
    let reloadTime, timeSince, radius, dmg;
    const [w, h] = [50, 50];
    switch (kind) {
        case 'AirTower':
            reloadTime = 10;
            timeSince = 0;
            radius = 10;
            dmg = 5;
            break;
        case 'GroundTower':
            reloadTime = 10;
            timeSince = 0;
            radius = 10;
            dmg = 5;
            break;
        case 'BothTower':
            reloadTime = 10;
            timeSince = 0;
            radius = 10;
            dmg = 5;
            break;
        default:
            throw new Error('can\'t make tower');
    }
    return Object.assign({}, pos, { kind, reloadTime, timeSince, radius, dmg, w, h, id: Id.make() });
}
exports.make = make;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Queue = __webpack_require__(1);
const Utils = __webpack_require__(2);
const Id = __webpack_require__(3);
const Draw = __webpack_require__(0);
exports.noneAction = { kind: 'EnemyAction', action: 'None' };
/* NOTE this is a horrible design things will be inconsistent speed */
/* For a given path and index (note: index is not an integer)
  gets the actual Point the enemy should be */
function getLocationInPath(path, index) {
    const [from, to] = [path[Math.floor(index)], path[Math.ceil(index)]];
    const percentage = index - Math.floor(index);
    const locationDistance = Utils.calcDistance(from, to) * percentage;
    const opposite = to.y - from.y;
    const adjancent = to.x - from.x;
    const angle = Math.atan(opposite / adjancent);
    return { x: locationDistance * Math.cos(angle), y: locationDistance * Math.sin(angle) };
}
function draw(enemy) {
    switch (enemy.kind) {
        case 'GroundEnemy':
            // paint ground Enemy
            Draw.fill(200, 50, 20); // completely placeholder
            Draw.ellipse(enemy.x, enemy.y, enemy.w, enemy.h);
            break;
        case 'AirEnemy':
            // paint air Enemy
            Draw.fill(20, 255, 200); // completely placeholder
            // TODO maybe have a more complex shape
            Draw.rect(enemy.x, enemy.y, enemy.w, enemy.h);
            break;
        default:
            throw new Error('Not a enemy type');
    }
}
exports.draw = draw;
function make(pos, kind, path) {
    const [w, h] = [50, 50];
    switch (kind) {
        case 'GroundEnemy':
            return Object.assign({}, pos, path, { kind, hp: 100, w, h, id: Id.make() });
        case 'AirEnemy':
            return Object.assign({}, pos, path, { kind, hp: 75, w, h, id: Id.make() });
        default:
            throw new Error('Not an enemy type!');
    }
}
exports.make = make;
function update(enemy, action) {
    switch (action.action) {
        case 'None':
            const newLocation = getLocationInPath(enemy.path, enemy.index);
            return Object.assign({}, enemy, newLocation, { index: enemy.index + enemy.indexPerFrame });
        case 'Hit':
            if (enemy.hp - action.dmg <= 0) {
                const action = {
                    kind: 'GameAction',
                    action: 'RemoveEntity',
                    id: enemy.id
                };
                Queue.add(action);
            }
            return Object.assign({}, enemy, { hp: enemy.hp - action.dmg });
        case 'Update Path':
    }
}
exports.update = update;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Enemy = __webpack_require__(6);
const Tower = __webpack_require__(5);
const Bullet = __webpack_require__(4);
function draw(entity) {
    if (entity.kind === 'AirEnemy' || entity.kind === 'GroundEnemy')
        Enemy.draw(entity);
    else if (entity.kind === 'AirTower' || entity.kind === 'GroundTower' || entity.kind === 'BothTower')
        Tower.draw(entity);
    else if (entity.kind === 'AirBullet' || entity.kind === 'GroundBullet')
        Bullet.draw(entity);
}
exports.draw = draw;
exports.equal = (entityA, entityB) => entityA.id === entityB.id;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Menu = __webpack_require__(9);
const Enemy = __webpack_require__(6);
const Entity = __webpack_require__(7);
const Tower = __webpack_require__(5);
const Bullet = __webpack_require__(4);
const Utils = __webpack_require__(2);
const Queue = __webpack_require__(1);
const Draw = __webpack_require__(0);
const wave = [...Array(10).keys()].map(i => Enemy.make({
    x: i * 100 - 1000,
    y: 50 + i * 2
}, 'GroundEnemy', {
    path: [{ x: 0, y: 0 }],
    index: 0,
    indexPerFrame: 2
}));
exports.gameNone = { kind: 'GameAction', action: 'None' };
function draw([enemies, towers, bullets, menu]) {
    Menu.draw(menu);
    enemies.forEach(Enemy.draw);
    towers.forEach(Tower.draw);
    bullets.forEach(Bullet.draw);
}
exports.draw = draw;
function make() {
    const menu = Menu.make(Draw.screenWidth - 100);
    wave.forEach(en => Queue.add({ action: 'AddEntity', kind: 'GameAction', entity: en }));
    return [wave, [], [], menu];
}
exports.make = make;
function updateGame([enemies, towers, bullets, menu], action) {
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
                        bullets.push(action.entity);
                    }
                    else if (action.action === 'RemoveEntity') {
                        const bul = action.entity;
                        bullets = bullets.filter(bullet => !Entity.equal(bullet, bul));
                    }
                    break;
                case 'AirEnemy':
                case 'GroundEnemy':
                    if (action.action === 'AddEntity') {
                        enemies.push(action.entity);
                    }
                    else if (action.action === 'RemoveEntity') {
                        const en = action.entity;
                        enemies = enemies.filter(enemy => !Entity.equal(enemy, en));
                    }
                    break;
                case 'AirTower':
                case 'GroundTower':
                case 'BothTower':
                    if (action.action === 'AddEntity') {
                        towers.push(action.entity);
                    }
                    else if (action.action === 'RemoveEntity') {
                        const tw = action.entity;
                        towers = towers.filter(tower => !Entity.equal(tw, tower));
                    }
                    break;
            }
            break;
        case 'None':
            bullets.forEach(bullet => enemies.forEach(enemy => {
                if (Utils.pointIn(bullet, enemy)) {
                    const action = {
                        kind: 'GameAction',
                        action: 'RemoveEntity',
                        entity: enemy
                    };
                    Queue.add(action);
                }
            }));
            break;
        default:
            throw new Error('Not a main action');
    }
    return [enemies, towers, bullets, menu];
}
function update([enemies, towers, bullets, menu], action) {
    /* Defaults all the actions to respective none actions */
    let towerAction = Tower.noneAction, enemyAction = Enemy.noneAction, menuAction = Menu.noneAction;
    if (action.action !== 'None')
        console.log(action.action);
    switch (action.kind) {
        case 'TowerAction':
            towerAction = action;
            break;
        case 'EnemyAction':
            enemyAction = action;
            break;
        case 'MenuAction':
            menuAction = action;
            break;
        case 'GameAction':
            /** QUESTIONABLE */
            [enemies, towers, bullets, menu] = updateGame([enemies, towers, bullets, menu], action);
            break;
        case 'NoneAction':
            break;
        default:
            throw new Error(`${action} is Not an Action`);
    }
    const newEnemies = [...enemies.map(enemy => {
            if (enemyAction.action !== 'None' && enemy.id === enemyAction.id)
                return Enemy.update(enemy, enemyAction);
            else
                return Enemy.update(enemy, Enemy.noneAction);
        })];
    const newTowers = [...towers.map(tower => {
            if (towerAction.action !== 'None' && tower.id === towerAction.id)
                return Tower.update(tower, enemies, towerAction);
            else
                return Tower.update(tower, enemies, Tower.noneAction);
        })];
    const newBullets = [...bullets.map(Bullet.update)];
    const newMenu = Menu.update(menu, menuAction);
    /* Maybe rethink this */
    return [newEnemies, newTowers, newBullets, newMenu];
}
exports.update = update;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Entity = __webpack_require__(7);
const Tower = __webpack_require__(5);
const Utils = __webpack_require__(2);
const Queue = __webpack_require__(1);
const Id = __webpack_require__(3);
const Draw = __webpack_require__(0);
exports.noneAction = { kind: 'MenuAction', action: 'None' };
function draw(menu) {
    Draw.fill(200, 0, 0);
    Draw.rect(menu.x, menu.y, menu.w, menu.h);
    menu.entities.forEach(Entity.draw);
    if (menu.dragging)
        Entity.draw(menu.dragging);
}
exports.draw = draw;
function update(menu, menuAction) {
    // if (menuAction.action !== 'None') console.log(menuAction.action)
    switch (menuAction.action) {
        case 'Dragging':
            const mousePoint = { x: Draw.mouseX, y: Draw.mouseY };
            if (Draw.mouseClicked && !Utils.pointIn(mousePoint, menu)) {
                const action = { kind: 'MenuAction', action: 'Drop' };
                Queue.add(action);
            }
            else {
                Queue.add(menuAction);
            }
            return menu;
        case 'Drop':
            const entity = Object.assign({}, menu.dragging, { x: Draw.mouseX, y: Draw.mouseY });
            const action = { kind: 'GameAction', action: 'AddEntity', entity, id: menu.dragging.id };
            Queue.add(action);
            // debugger
            /* remove the entity from menu */
            return { entities: menu.entities, id: menu.id, kind: 'Menu', x: Draw.screenWidth - 100, y: 0, w: 99, h: 499 };
        case 'None':
            let dragging;
            if (Draw.mouseClicked) {
                const mousePoint = { x: Draw.mouseX, y: Draw.mouseY };
                menu.entities.forEach(en => {
                    if (Utils.pointIn(mousePoint, en)) {
                        const action = { kind: 'MenuAction', action: 'Dragging' };
                        dragging = en;
                        Queue.add(action);
                    }
                });
            }
            return Object.assign({}, menu, { dragging });
        default:
            throw new Error('Not a Menu action');
    }
}
exports.update = update;
function make(startX) {
    const air = Tower.make({ x: startX + 50, y: 40 }, 'AirTower');
    const ground = Tower.make({ x: startX + 30, y: 90 }, 'GroundTower');
    return { entities: [air, ground], id: Id.make(), x: startX, y: 0, w: 99, h: 499, kind: 'Menu' };
}
exports.make = make;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Game = __webpack_require__(8);
const Queue = __webpack_require__(1);
const Draw = __webpack_require__(0);
let game = Game.make();
/* Main */
function setup() {
    Queue.add(Game.gameNone);
}
function drawBackground() {
    Draw.fill(20, 100, 20);
    Draw.rect(0, 0, Draw.screenWidth, Draw.screenHeight);
}
function draw() {
    drawBackground();
    if (Queue.isEmpty())
        Queue.add(Game.gameNone);
    const nextAction = Queue.remove();
    Game.draw(game);
    game = Game.update(game, nextAction);
}
/* Run */
(() => {
    setup();
    const mainLoop = setInterval(() => {
        try {
            draw();
        }
        catch (e) {
            clearInterval(mainLoop);
        }
    }, 1000 / 60);
})();


/***/ })
/******/ ]);