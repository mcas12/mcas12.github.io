import Food from "./food.js";
import Snake from "./snake.js";
// 游戏的入口文件
class Game {
    constructor() {
        // 创建食物和蛇的实例
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        // 定时器
        this.timerId = null;
    }
    start() {
        // 食物和蛇 渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);
        this.runSnake(); 
        this.bindKey();
 
    }
    // 让蛇动起来
    runSnake() {
         this.timerId = setInterval( () => {
            // 要获取游戏对象中的蛇属性
            this.snake.move(this.food, this.map);
            // 2.2  当蛇遇到边界游戏结束
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX || headY < 0|| headY >= maxY) {
                console.log('Game Over');
                clearInterval(this.timerId);
                return
            }
            this.snake.render(this.map);  // 根据body 的数据 重新渲染蛇在页面位置
        }, 150);
    }
    // 绑定键盘事件 控制蛇的方向
    bindKey() {
        document.addEventListener('keydown',  (e) => {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        });
    }
}
export default Game;