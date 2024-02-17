var canvas, pen, cs, snake;

function init() {
    canvas = document.getElementById("myCanvas");
    canvas.width = canvas.height = 500; // Setting canvas dimensions directly
    pen = canvas.getContext('2d');
    cs = 66; // Reduced cell size to 10 pixels

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function() {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },
        updateSnake: function() {
            console.log("Updating snake according to direction of snake...");
            ////we have to check if the snake has eaten the food,
            // and if eaten then we have to increase the size of the snake.
            

           
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;


            if(headX==food.x && headY==food.y){
                console.log("food eaten");
                food=getRamdomFood();
            }else{
                this.cells.pop();
            }
            var nextX, nextY;

            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });
        }
    };
    snake.createSnake();

    // Add an event listener to handle key presses
    function keyPressed(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        } else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        } else if (e.key == "ArrowDown") {
            snake.direction = "down";
        } else if (e.key == "ArrowUp") { // Corrected the key for moving up
            snake.direction = "up";
        }
        console.log(snake.direction);
    }
    document.addEventListener('keydown', keyPressed);
}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle=food.color;
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
}

function update() {
    // Update the snake position
    snake.updateSnake();
}
function getRamdomFood{
       var foodX=Math.round(Math.random()*(W-cs)/cs);
       var foodY=Math.round(Math.random()*(H-cs)/cs);

       var food={
          x:foodX,
          y:foodY,
          color : "red",
       }
       return food;
}

function gameloop() {
    draw();
    update();
}

init(); // Call init() to initialize the canvas and snake
var f = setInterval(gameloop, 100);
