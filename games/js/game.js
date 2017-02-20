//创建游戏对象和计分变量
var monstersCaught = 0

var hero = {
    speed: 256,
}
var monster = {}

var keysDown = {}

//加载图片
var bgReady = false
var bgImage = new Image()
bgImage.src = "images/background.png"
bgImage.onload = function() {
    bgReady = true
}

var heroReady = false
var heroImage = new Image()
heroImage.onload = function() {
    heroReady = true
}
heroImage.src = "images/hero.png"

var monsterReady = false
var monsterImage = new Image()
monsterImage.onload = function () {
    monsterReady = true
}
monsterImage.src = "images/monster.png"

var eventListener = function() {
    addEventListener("keydown", function(e){
        keysDown[e.keyCode] = true
    }, false)

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode]
    }, false)
}


var reset = function() {
    var canvas = document.querySelector('canvas')
    if (monstersCaught === 0) {
        hero.x = canvas.width / 2
        hero.y = canvas.height / 2
    }
    monster.x = 32 + (Math.random() * (canvas.width - 64))
    monster.y = 32 + (Math.random() * (canvas.height - 64))
}

var update = function(modifier) {

    // if (38 in keysDown) {
    //     hero.y -= hero.speed * modifier
    // } else if (40 in keysDown) {
    //     hero.y += hero.speed * modifier
    // } else if (37 in keysDown) {
    //     hero.x -= hero.speed * modifier
    // } else if (39 in keysDown) {
    //     hero.x += hero.speed * modifier
    // }
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier
    }
    if (40 in keysDown) {
        hero.y += hero.speed * modifier
    }
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier
    }
    if (39 in keysDown) {
        hero.x += hero.speed * modifier
    }

    if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
        ++monstersCaught
        reset()
    }
}

var render = function() {
    var canvas = document.querySelector('canvas')
    var ctx = canvas.getContext('2d')
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0)
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }

    ctx.fillStyle = "rgb(250, 250, 250)"
    ctx.font = "24px Helvetica"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32)
}

var game = function() {
    var now = Date.now()
    var delta = now - then

    render()
    update(delta / 1000)

    then = now
    requestAnimationFrame(game)
}

var init = function() {
    //requestAnimationFrame兼容性处理
    var w = window
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame
    //创建, 设置canvas, 并将其插入html
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")
    canvas.width = 512
    canvas.height = 480
    document.body.appendChild(canvas)
    eventListener()
    reset()
    render()
}

var __main = function() {
    init()
    game()
}

var then = Date.now()
__main()
