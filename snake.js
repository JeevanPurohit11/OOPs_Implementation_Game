// var canvas, pen, cs, snake;

// function init() {
//     canvas = document.getElementById("myCanvas");
//     canvas.width = canvas.height = 500; // Setting canvas dimensions directly
//     pen = canvas.getContext('2d');
//     cs = 66; // Reduced cell size to 10 pixels

//     snake = {
//         init_len: 5,
//         color: "blue",
//         cells: [],
//         direction: "right",

//         createSnake: function() {
//             for (var i = this.init_len; i > 0; i--) {
//                 this.cells.push({ x: i, y: 0 });
//             }
//         },
//         drawSnake: function() {
//             for (var i = 0; i < this.cells.length; i++) {
//                 pen.fillStyle = this.color;
//                 pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
//             }
//         },
//         updateSnake: function() {
//             console.log("Updating snake according to direction of snake...");
//             ////we have to check if the snake has eaten the food,
//             // and if eaten then we have to increase the size of the snake.
            

           
//             var headX = this.cells[0].x;
//             var headY = this.cells[0].y;


//             if(headX==food.x && headY==food.y){
//                 console.log("food eaten");
//                 food=getRamdomFood();
//             }else{
//                 this.cells.pop();
//             }
//             var nextX, nextY;

//             if (this.direction == "right") {
//                 nextX = headX + 1;
//                 nextY = headY;
//             } else if (this.direction == "left") {
//                 nextX = headX - 1;
//                 nextY = headY;
//             } else if (this.direction == "down") {
//                 nextX = headX;
//                 nextY = headY + 1;
//             } else {
//                 nextX = headX;
//                 nextY = headY - 1;
//             }
//             this.cells.unshift({ x: nextX, y: nextY });
//         }
//     };
//     snake.createSnake();

//     // Add an event listener to handle key presses
//     function keyPressed(e) {
//         if (e.key == "ArrowRight") {
//             snake.direction = "right";
//         } else if (e.key == "ArrowLeft") {
//             snake.direction = "left";
//         } else if (e.key == "ArrowDown") {
//             snake.direction = "down";
//         } else if (e.key == "ArrowUp") { // Corrected the key for moving up
//             snake.direction = "up";
//         }
//         console.log(snake.direction);
//     }
//     document.addEventListener('keydown', keyPressed);
// }

// function draw() {
//     pen.clearRect(0, 0, W, H);
//     snake.drawSnake();
//     pen.fillStyle=food.color;
//     pen.fillRect(food.x*cs,food.y*cs,cs,cs);
// }

// function update() {
//     // Update the snake position
//     snake.updateSnake();
// }
// function getRamdomFood{
//        var foodX=Math.round(Math.random()*(W-cs)/cs);
//        var foodY=Math.round(Math.random()*(H-cs)/cs);

//        var food={
//           x:foodX,
//           y:foodY,
//           color : "red",
//        }
//        return food;
// }

// function gameloop() {
//     draw();
//     update();
// }

// init(); // Call init() to initialize the canvas and snake
// var f = setInterval(gameloop, 100);
function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs=66;
	game_over=false;
	score = 5;


	//Create an image of food
	food_img = new Image();
	food_img.src = "assets/apple.png";

	trophy = new Image();
	trophy.src = "assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:5,
		color: "blue",
		cells: [],
		direction: "right",

		createSnake:function(){
			for (let i = this.init_len; i >0; i--) {
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){
			for(let i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);	
			}
		},


		updateSnake:function(){
			console.log("updating snake according to the four direction given by the user..");

       
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			
			 //we have to check if the snake has eaten the food,
            // and if eaten then we have to increase the size of the snake.


			if(headX==food.x && headY==food.y){
				console.log("Food eaten by snake.");
				food = getRandomFood();
				score++;
			}else{
				this.cells.pop();
			}

			//generate new food object as well.
			//this.cells.pop();
			var nextX, nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			//  prevent the snake from going out.

			var last_x_value = Math.round(W/cs);
			var last_y_value = Math.round(H/cs);

			if(this.cells[0].y <0 || this.cells[0].x <0 || this.cells[0].y>last_y_value-1 || this.cells[0].x>last_x_value-1){
				game_over=true;
			}
		},
	};

	snake.createSnake();


	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}else if(e.key=="ArrowDown"){
			snake.direction="down";
		}else {
			snake.direction="up";
		}
		console.log(snake.direction);
	}

	// Add an Event Listener on the Document Object.

	document.addEventListener('keydown', keyPressed);
}

function draw(){

	//erase the old frame
	pen.clearRect(0,0,W,H);

	snake.drawSnake();

	//for showing the food object
	pen.fillStyle = food.color;
	// Food as a rectangle
	//pen.fillRect(food.x*cs,food.y*cs,cs,cs);
	
	//Food as an Image of apple
	pen.drawImage(food_img, food.x*cs,food.y*cs,cs,cs);

	//Display the score
	pen.drawImage(trophy, 20, 20, cs, cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto";
	pen.fillText(score, 50, 50);

}

//update function call each time
function update(){
	snake.updateSnake();
}
//maintain random food property
function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}
//when our bool variable became true our game will be over .
function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}
//1st init function has been call here
init();
var f = setInterval(gameloop, 100); 
