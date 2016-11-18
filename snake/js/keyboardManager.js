/**
 * Gestión de los eventos del teclado.
 */

var keys = {};

/** Inicializa y asigna eventos del teclado. */
function initKeyboardManager() {

	this.document.onkeydown = handleKeyDown;// Eventos teclas.
	this.document.onkeyup = handleKeyUp; // Eventos teclas.
}

/** Eventos de teclas. */
function handleKeyDown(event) {
	keys[event.keyCode] = true;
}

function handleKeyUp(event) {
	delete keys[event.keyCode];
}

/** Marcar a mover un rectángulo según la tecla de flecha. */
function changeDirection(cuadrado) {
	if (keys[37]) currentDirection = 0; // Izquierda.
	if (keys[38]) currentDirection = 2; // Arriba.
	if (keys[39]) currentDirection = 1; // Derecha.
	if (keys[40]) currentDirection = 3; // Abajo.
}
