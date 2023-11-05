const IDLEFrames = ['IdleFrames/IdleUP.png', 'IdleFrames/IdleDOWN.png', 'IdleFrames/IdleRIGHT.png', 'IdleFrames/IdleLEFT.png']
const UPFrames = ['UPFrames/FirstFrameUP.png', 'UPFrames/SecondFrameUP.png', 'UPFrames/ThirdFrameUP.png']
const DOWNFrames = ['DOWNFrames/FirstFrameDOWN.png', 'DOWNFrames/SecondFrameDOWN.png', 'DOWNFrames/ThirdFrameDOWN.png']
const RIGHTFrames = ['RIGHTFrames/FirstFrameRIGHT.png', 'RIGHTFrames/SecondFrameRIGHT.png', 'RIGHTFrames/ThirdFrameRIGHT.png']
const LEFTFrames = ['LEFTFrames/FirstFrameLEFT.png', 'LEFTFrames/SecondFrameLEFT.png', 'LEFTFrames/ThirdFrameLEFT.png']
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
canvas.style.backgroundColor = 'black'
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let velocityX = 0, velocityY = 0
let character_widht = 16, character_height = 22
let Idle = new Image()
let movingUP = new Image()
let movingDOWN = new Image()
let movingRIGHT = new Image()
let movingLEFT = new Image()
Idle.src = 'IdleFrames/IdleDOWN.png'
counterUP = 0
counterDOWN = 0
counterRIGHT = 0
counterLEFT = 0
function changeFrameUP() {
    if(counterUP == 0)
       counterUP = 1
    else if(counterUP == 1)
       counterUP = 2
    else
       counterUP = 0
    movingUP.src = UPFrames[counterUP]
}
function changeFrameDOWN() {
    if(counterDOWN == 0)
        counterDOWN = 1
    else if(counterDOWN == 1)
        counterDOWN = 2
    else
        counterDOWN = 0
    movingDOWN.src = DOWNFrames[counterDOWN]
}
function changeFrameRIGHT() {
    if(counterRIGHT == 0)
       counterRIGHT = 1
    else if(counterRIGHT == 1)
       counterRIGHT = 2
    else
       counterRIGHT = 0
    movingRIGHT.src = RIGHTFrames[counterRIGHT]
}
function changeFrameLEFT() {
    if(counterLEFT == 0)
       counterLEFT = 1
    else if(counterLEFT == 1)
       counterLEFT = 2
    else
       counterLEFT = 0
    movingLEFT.src = LEFTFrames[counterLEFT]
}
canvas.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            velocityY = -4
            break
        case 'ArrowDown':
            velocityY = 4
            break
        case 'ArrowLeft':
            velocityX = -4
            break
        case 'ArrowRight':
            velocityX = 4
            break
    }
})
canvas.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            velocityY = 0
            break
        case 'ArrowLeft':
        case 'ArrowRight':
            velocityX = 0
            break
    } 
})
class Player { 
    constructor() {
        this.X = canvas.width / 2
        this.Y = canvas.height / 2
    }
    draw(context, FrameImage) {
        context.drawImage(FrameImage, this.X, this.Y)
    }
    move(context) {
        context.clearRect(0, 0, canvas.width,canvas.height)
        context.fillStyle = 'white'
        let lastX = this.X
        let lastY = this.Y
        this.X += velocityX
        this.Y += velocityY
        if(this.X < 0)
           this.X = 0
        if(this.Y < 0)
           this.Y = 0
        if(this.X + character_widht > canvas.width)
           this.X = canvas.width - character_widht
        if(this.Y + character_height > canvas.height)
           this.Y = canvas.height - character_height
        if(this.Y < lastY && this.X == lastX) {
           changeFrameUP()
           this.draw(context, movingUP)
           Idle.src = IDLEFrames[0]
        }
        else if(this.Y > lastY && this.X == lastX) {
           changeFrameDOWN()
           this.draw(context, movingDOWN)
           Idle.src = IDLEFrames[1]
        }
        else if(this.X > lastX && this.Y == lastY) {
           changeFrameRIGHT()
           this.draw(context, movingRIGHT)
           Idle.src = IDLEFrames[2]
        }
        else if(this.X < lastX && this.Y == lastY) {
            changeFrameLEFT()
            this.draw(context, movingLEFT)
            Idle.src = IDLEFrames[3]
        }
        else {
             if(this.X != lastX && this.Y != lastY) {
                this.X = lastX
                this.Y = lastY
           }
           this.draw(context, Idle)
        }
    }
}
let player = new Player()
function game() {
    player.move(context)
    requestAnimationFrame(game)
}
game()

