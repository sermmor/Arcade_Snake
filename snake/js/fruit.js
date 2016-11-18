/**
 * Fruta a recoger por la serpiente.
 */

var thereIsAFruit, posFruitX, posFruitY, fruitSquare, fruitPoints;

/** Inicializa el sistema de frutas. */
function initFruits() {
	thereIsAFruit = false;
	fruitPoints = 5;
}

/** Gestiona el bucle de crear una fruta cada vez que se recoge una. */
function createAndPickFruitLoop() {
	if (thereIsAFruit) {
		// Si hay una fruta comprobar si se ha recogido.
		pickFruit();
	}
	if (!thereIsAFruit) {
		// Si no hay fruta o se ha recogido, crear fruta en posición aleatoria.
		var randomPos = getRandomPos();
		createFruit(randomPos[0], randomPos[1]);
	}
}

/** Devuelve una posición aleatoria en dónde no está la serpiente. */
function getRandomPos() {
	var randomX;
	var randomY;
	var valid = false;
	while (!valid) {
		randomX = Math.floor((Math.random() * (canvasWidth - squareWidth)) + 1);
		randomY = Math.floor((Math.random() * (canvasHeight - squareWidth)) + 1);
		valid = !isRectangleIntersectedWithSnake(randomX, randomY, randomX + squareWidth, randomY + squareWidth, true);
	}
	
	var randomPos = [randomX, randomY];
	return randomPos;
}

/** Dada una posición crea una fruta en dicha posición. */
function createFruit(posX, posY) {
	if (!thereIsAFruit) {
		thereIsAFruit = true;
		fruitSquare = new createjs.Shape();
		posFruitX = posX;
		posFruitY = posY;
		fruitSquare.graphics.beginFill("DarkRed").drawRect(0,0,squareWidth,squareWidth);
		fruitSquare.x = posFruitX;
		fruitSquare.y = posFruitY;
		stage.addChild(fruitSquare);
	}
}

/** Comprueba si la serpiente ha recogido la fruta, en caso afirmativo borrará 
 * la fruta, incrementará el score de la serpiente y devolverá true. */
function pickFruit() {
	if (thereIsAFruit && checkSnakeAndFruitCollision()) {
		// Si la fruta está en el mismo cuadrado que la posición de la serpiente.
		stage.removeChild(fruitSquare);
		thereIsAFruit = false;
		addPointsToScore(fruitPoints);
	}
	return !thereIsAFruit;
}

