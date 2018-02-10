/** Variables y funciones de gestión de las colisiones. */

var limitX0, limitY0, limitX1, limitY1;

/** Inicializa y asigna colisiones. */
function initCollisions() {
	// Inicializo limites.
 	limitX0 = 0;
 	limitY0 = 0;
 	limitX1 = canvasHeight;
 	limitY1 = canvasWidth;
 	limitY1 = limitY1 - (limitY1 * 0.4);
 	limitX1 = limitX1 + (limitX1 * 0.5);
}

/** Comprueba si la serpiente ha colisionado con alguno de los límites. */
function checkLimits() {
	// Miramos si ha sobrepasado algún límite la posición de la cabeza, y si eso ha ocurrido lanzamos game over.
	if (headSnakeX < limitX0 || headSnakeX > limitX1 || headSnakeY < limitY0 || headSnakeY > limitY1) {
		launchGameOver();
	}
}

/** Devuelve si ha colisionado la serpiente con la fruta. */
function checkSnakeAndFruitCollision() {
	return isRectangleIntersectedWithSnake(posFruitX, posFruitY, posFruitX + squareWidth, posFruitY + squareWidth, true);
}

/** Comprueba si la serpiente ha colisionado contra ella misma. */
function checkSnakeAndSameSnakeCollision() {
	var ret = false;
	ret = isRectangleIntersectedWithSnake(headSnakeX, headSnakeY, 
			headSnakeX + squareWidth, headSnakeY + squareWidth, false);
	if (ret) {
		launchGameOver();
	}
	return ret;
}

/** Devuelve si un rectángulo se encuentra en alguna de las posiciones de la serpiente. 
 * Si head es true, se cuenta la cabeza, si no, no se cuenta. */
function isRectangleIntersectedWithSnake(rectX0, rectY0, rectX1, rectY1, head) {
	var ret = false;
	var counter = 0;
	var rect2;
	var endCounter;
	if (head) {
		endCounter = serpiente.length;
	} else {
		endCounter = serpiente.length - 1;
	}
	while (!ret && counter < endCounter) {
		// Comprobamos si la cabeza de la serpiente ocupa la posición de uno de los rectángulos de su lista serpiente.
		rect2 = serpiente[counter];
		ret = isRectangleIntersection(rectX0, rectY0, rectX1, rectY1, 
				rect2.x, rect2.y, rect2.x + squareWidth, rect2.y + squareWidth);
		counter++;
	}
	return ret;
}

/** Devuelve si el rectángulo 1 y el rectángulo dos tienen una intersección. */
function isRectangleIntersection(rect1X0, rect1Y0, rect1X1, rect1Y1, 
		rect2X0, rect2Y0, rect2X1, rect2Y1) {
	var ret = true;
	
	if (rect1X0 >= rect2X1 || rect1X1 <= rect2X0 || rect1Y0 >= rect2Y1 || rect1Y1 <= rect2Y0) {
		ret = false;
	}
	
	return ret;
}
