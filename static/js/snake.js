const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;  // 每个方块的大小
let snake = [{ x: 9 * boxSize, y: 10 * boxSize }];  // 初始化蛇的位置
let direction = "RIGHT";  // 初始方向
let food = generateFood();
let score = 0;

// 监听键盘输入
document.addEventListener("keydown", changeDirection);

// 更新游戏状态
function gameLoop() {
    if (isGameOver()) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    } else {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        setTimeout(gameLoop, 100);
    }
}

// 清空画布
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 绘制蛇
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    // 更新头部位置
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    // 检查蛇是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();  // 移除尾部
    }

    // 添加新的头部
    snake.unshift(head);
}

// 生成随机食物
function generateFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x: foodX, y: foodY };
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// 改变方向
function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// 判断游戏结束
function isGameOver() {
    const head = snake[0];
    // 撞墙
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;

    // 撞自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

// 启动游戏循环
gameLoop();
