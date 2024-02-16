var canvas, pen, cs, snake;

function init() {
    canvas = document.getElementById("myCanvas");
    pen = canvas.getContext('2d');
    cs = 66; // Reduced cell size to 10 pixels
    H = W = canvas.width = canvas.height = 1000; // Increased canvas size to 500x500 pixels

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
        updateSnake:function(){
            console.log("Updating snake ...");
            this.cells.pop();
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            var X=headX+1;
            var Y=headY;
            this.cells.unshift({x:X,y:Y});

        }
    };
    snake.createSnake();
}

function draw() {
    snake.drawSnake();
}

function update() {
    //erase the old frame..
    pen.clearRect(0, 0, canvas.width, canvas.height);

    snake.updateSnake();
}

function gameloop() {
    draw();
    update();
}

init(); // Call init() to initialize the canvas and snake
var f = setInterval(gameloop, 100);
