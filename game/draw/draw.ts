const canvasElem = document.getElementById('canvas')
const ctx = (canvasElem as HTMLCanvasElement).getContext('2d')

export let mouseX = 0
export let mouseY = 0
export let mouseClicked = false

window.onmousedown = (event: MouseEvent) => mouseClicked = true
window.onmouseup   = (event: MouseEvent) => mouseClicked = false
window.onmousemove = (event: MouseEvent) => [mouseX, mouseY] = [event.clientX, event.clientY]

export const fill = (red: number, green: number, blue: number) => {
    ctx.fillStyle = 'rgb(' + red + ',' +  green + ',' +  blue + ')'
    // ctx.fill()
}


export const rect = (x: number, y: number, w: number, h: number) =>
    ctx.fillRect(x, y, w, h)

export const triangle = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.fill()    
}

export const ellipse = (x: number, y: number, r1: number, r2: number) =>
    ctx.ellipse(x, y, r1, r2, 0, 0, 0)

export const screenWidth = canvasElem.clientWidth
export const screenHeight = canvasElem.clientHeight