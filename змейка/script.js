const canvas = document.getElementById("game")
const context = canvas.getContext("2d")

const size = 25

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
]

let dx = size
let dy = 0

let food = {
    x: 300,
    y: 300
}

let score = 0;
let gameOver = false

function draw() {
    context.fillStyle = "#222"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "red"
    context.fillRect(
        food.x,
        food.y,
        size,
        size
    )

    snake.forEach((part, index) => {
        if (index === 0) {
            context.fillStyle = "#00ff00"
        } else {
            context.fillStyle = "#00aa00"
        }

        context.fillRect(
            part.x,
            part.y,
            size - 2,
            size - 2
        )
    })

    if (gameOver) {
        context.fillStyle = "#222"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = "white"
        context.font = "40px Arial"
        context.textAlign = "center"
        context.fillText(
            "game over",
            canvas.width / 2,
            canvas.height / 2
        )
        context.font = "20px Arial"
        context.fillText(
            "нажми Enter",
            canvas.width / 2,
            canvas.height / 2 + 40
        )
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && gameOver) {
        location.reload()
    }
})

function move() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    if (gameOver) {
        return
    }
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        gameOver = true
        draw()
        return
    }

    snake.unshift(head)

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        score++

        document.getElementById("score").textContent = score;

        createFood()

    } else {
        snake.pop()
    }
    draw()
}

function createFood() {
    food.x =
        Math.floor(
            Math.random() *
            (canvas.width / size)
        ) * size
    food.y =
        Math.floor(
            Math.random() *
            (canvas.height / size)
        ) * size
}

document.addEventListener("keydown", function (event) {
    if (
        event.key === "ArrowUp" &&
        dy === 0
    ) {
        dx = 0
        dy = -size
    }
    if (
        event.key === "ArrowDown" &&
        dy === 0
    ) {
        dx = 0
        dy = size
    }
    if (
        event.key === "ArrowLeft" &&
        dx === 0
    ) {
        dx = -size
        dy = 0
    }
    if (
        event.key === "ArrowRight" &&
        dx === 0
    ) {
        dx = size
        dy = 0
    }
})

draw()
setInterval(move, 111)