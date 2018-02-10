var squareWidth = 50;
var stage, canvasWidth, canvasHeight, currentTimerMove, gameOver;

/** Incializa y lanza el juego en el canvas. */
function init() {
	canvasWidth = document.getElementById("gameCanvas").width;
	canvasHeight = document.getElementById("gameCanvas").height;
	// Jugar.
	playGame();
}

/** Lanza el juego. */
function playGame() {
 	// Se asocia el stage con el canvas de nuestra página
 	stage = new createjs.Stage("gameCanvas");
	
 	// Inicializamos serpiente, frutas, colisiones y eventos de teclado.
 	initSnake(432, 324);
 	initFruits();
 	initCollisions();
 	gameOver = false;
	initKeyboardManager();
	// Configurar número framerates.
	createjs.Ticker.framerate = 60; // 60FPS
	// Eventos.
	createjs.Ticker.addEventListener("tick", updateCanvas); // Actualización del canvas del juego.
 	
	// Reflescar el canvas.
	stage.update();
}

// Evento que trata las animaciones y todo durante cada segundo.
function updateCanvas(event) {
	checkLimits();
	checkSnakeAndSameSnakeCollision();
	if (!event.paused && !gameOver) {
		changeDirection();
		moveSnake();
		createAndPickFruitLoop();
		// Actualizo todos los timers.
		currentTimerMove += event.delta;
	}
	// Para que se hagan efectivos los cambios, reflescamos el canvas constantemente.
	stage.update();
}

function launchGameOver() {
	if (!gameOver) {
		gameOver = true;
		window.alert("GAME OVER");
		// Cuando el jugador pulse en Aceptar y el diálogo desaparezca, reseteamos el juego.
		init();
	}
}
