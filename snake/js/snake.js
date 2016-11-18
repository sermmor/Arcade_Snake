/** Variables y funciones necesarias para la gestión de la serpiente. */

var timeMove, currentDirectionX, oldDirection, currentDirection;
var serpiente = [];
var headSnakeX, headSnakeY;
var numTopeSerpiente, snakeIncrement, score;
var textScore;

/** Inicializa las variables de la serpiente. 
 * @args posX, posY Posición de inicio de la serpiente. */
function initSnake(posX, posY) {
 	timeMove = 200; // Tiempo tras el que decide añadir un cuadrado nuevo a la serpiente.
	score = 0;
 	currentTimerMove = 0;
 	oldDirection = 0;
 	currentDirection = 0; /*0 = izquierda, 1 = derecha, 2 = arriba, 3 = abajo.*/
 	// Al inicio la serpiente tendrá 3 cuadrados a lo sumo.
	numTopeSerpiente = 3;
	snakeIncrement = 2;
	
	// Mostramos el score.
	textScore = new createjs.Text("Score", "20px Arial", "#000000");
	textScore.text = "Score: 0";
	textScore.x = 10;
	textScore.y = 20;
	textScore.textBaseline = "alphabetic";
	
	// Creamos primer punto de la serpiente.
	var piece = new createjs.Shape();
	serpiente[serpiente.length] = piece;
	headSnakeX = posX;
	headSnakeY = posY;
 	piece.graphics.beginFill("DarkGreen").drawRect(0,0,squareWidth,squareWidth);
 	piece.x = headSnakeX;
 	piece.y = headSnakeY;
 	
 	stage.addChild(textScore);
	stage.addChild(piece);
}

function addPointsToScore(points) {
	// Añadimos puntos al contador.
	score = score + points;
	// Mostramos el nuevo score.
	textScore.text = "Score: " + score;
	// Incrementamos tamaño de la serpiente.
	numTopeSerpiente = numTopeSerpiente + snakeIncrement;
}

// ----------------------------------------------------------------------------------------------
// ----------------------------------------------- Funciones sobre el movimiento de la serpiente.
// ---------------------------------------------------------------------------------------------- 

/** Función que mueve la serpiente. */
function moveSnake() {
	addNewRectangle();
	removeOldRectangles();
}

/** Dibuja un rectángulo. */
function drawRectangleAt(x, y) {
	var piece = new createjs.Shape();

	headSnakeX = x;
	headSnakeY = y;
 	piece.graphics.beginFill("DarkGreen").drawRect(0,0,squareWidth,squareWidth);
 	piece.x = x;
 	piece.y = y;

	serpiente[serpiente.length] = piece;
	stage.addChild(piece);
}

/** Añade un rectángulo. */
function addNewRectangleNormalCase() {
	currentTimerMove = 0;
	if (currentDirection == 0 && oldDirection != 1) {
		// Añadir cuadrado a la izquierda.
		drawRectangleAt(serpiente[serpiente.length - 1].x - squareWidth, serpiente[serpiente.length - 1].y);
		oldDirection = 0;
	} else if (currentDirection == 1 && oldDirection != 0) {
		// Añadir cuadrado a la derecha.
		drawRectangleAt(serpiente[serpiente.length - 1].x + squareWidth, serpiente[serpiente.length - 1].y);
		oldDirection = 1;
	} else if (currentDirection == 2 && oldDirection != 3) {
		// Añadir cuadrado arriba.
		drawRectangleAt(serpiente[serpiente.length - 1].x, serpiente[serpiente.length - 1].y - squareWidth);
		oldDirection = 2;
	} else if (currentDirection == 3 && oldDirection != 2) {
		// Añadir cuadrado abajo.
		drawRectangleAt(serpiente[serpiente.length - 1].x, serpiente[serpiente.length - 1].y + squareWidth);
		oldDirection = 3;
	}
}

/** Controla casos de añadir un rectángulo pero en la dirección contraria indicada por el jugador.
 * Por ejemplo: si se está moviendo a la derecha la serpiente, el jugador aunque indique que se debe mover a la
 * izquierda, la serpiente no debe hacerlo (ya que la regla del juego es que antes de mover a la izquierda debería
 * mover arriba o abajo). */
function addNewRectangleErrorCase() {
	currentTimerMove = 0;
	if (oldDirection == 0 && currentDirection == 1) {
		// Añadir cuadrado a la izquierda.
		drawRectangleAt(serpiente[serpiente.length - 1].x - squareWidth, serpiente[serpiente.length - 1].y);
		currentDirection = 0;
	} else if (oldDirection == 1 && currentDirection == 0) {
		// Añadir cuadrado a la derecha.
		drawRectangleAt(serpiente[serpiente.length - 1].x + squareWidth, serpiente[serpiente.length - 1].y);
		currentDirection = 1;
	} else if (oldDirection == 2 && currentDirection == 3) {
		// Añadir cuadrado arriba.
		drawRectangleAt(serpiente[serpiente.length - 1].x, serpiente[serpiente.length - 1].y - squareWidth);
		currentDirection = 2;
	} else if (oldDirection == 3 && currentDirection == 2) {
		// Añadir cuadrado abajo.
		drawRectangleAt(serpiente[serpiente.length - 1].x, serpiente[serpiente.length - 1].y + squareWidth);
		currentDirection = 3;
	}
}

/** Añade un nuevo rectángulo a la serpiente. */
function addNewRectangle() {
	if (currentTimerMove > timeMove) {
		addNewRectangleNormalCase();
		addNewRectangleErrorCase()
	}
}

/** Elimina viejos rectángulos de la serpiente. */
function removeOldRectangles() {
	// Borramos todos los rectángulos primeros hasta que la serpiente vuelva a tener numTopeSerpiente elementos.
	while (serpiente.length > numTopeSerpiente) {
		stage.removeChild(serpiente[0]);
		serpiente = serpiente.slice(1, serpiente.lenght);
	}
}
