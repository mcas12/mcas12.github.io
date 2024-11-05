// 蛇类
class Snake {
    constructor({ width = 20, height = 20, direction = 'right'  } = {}){
          // 存储蛇
          this.elements = [];
 
          this.width = width;
          this.height = height;
          this.direction = direction;
          // 蛇的身体 初始三节
          this.body = [
              {x: 3, y: 2, color: 'red'},
              {x: 2, y: 2, color: 'blue'},
              {x: 1, y: 2, color: 'blue'},
          ];
    }
 
    render(map){
        this.remove(); // 删除之前创建的蛇
        for(let i = 0, len = this.body.length; i <  len; i++ ){
            let object = this.body[i];
 
            let div = document.createElement('div');
            map.appendChild(div);
            this.elements.push(div);
 
             // 设置样式
             div.style.position = 'absolute';
             div.style.width = this.width + 'px';
             div.style.height = this.height + 'px';
             div.style.left = object.x * this.width + 'px';
             div.style.top = object.y * this.height + 'px';
             div.style.backgroundColor = object.color;
        }
    }
 
    move(food, map){
        // 控制蛇的移动 (当前蛇节 移动到上一个蛇节)
        for(let i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i - 1].x; 
            this.body[i].y = this.body[i - 1].y; 
        }
        // 蛇头
        let head = this.body[0];
 
        // 蛇头的行进方向
        switch(this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
 
        // 蛇吃食物
        // 判断蛇头的位置是否与食物的位置重合
        let  headX = head.x * this.width;
        let  headY = head.y * this.height;
 
        if(headX === food.x && headY === food.y){
            let last = this.body[this.body.length -1 ];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            // 重新生成一个食物
            food.render(map);
        }
    }
    remove() {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            // 删除div
            this.elements[i].parentNode.removeChild(this.elements[i]);
            // 删除数组中的元素
            this.elements.splice(i, 1);
        }
    }
}
 
export default Snake;