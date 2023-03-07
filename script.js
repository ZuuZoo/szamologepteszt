// Az összes szükséges elem lekérése a HTML-ből
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");
const resultElement = document.querySelector(".result");

// A számológép állapota
let operand1 = "";
let operand2 = "";
let operator = "";
let result = "";

// Az összeadás művelet
function add(a, b) {
	return a + b;
}

// A kivonás művelet
function subtract(a, b) {
	return a - b;
}

// A szorzás művelet
function multiply(a, b) {
	return a * b;
}

// A osztás művelet
function divide(a, b) {
	if (b === 0) {
		return "Hiba";
	} else {
		return a / b;
	}
}

// Az egyenlőségjel művelete
function calculate() {
	let result = "";
	switch (operator) {
		case "+":
			result = add(parseFloat(operand1), parseFloat(operand2));
			break;
		case "-":
			result = subtract(parseFloat(operand1), parseFloat(operand2));
			break;
		case "*":
			result = multiply(parseFloat(operand1), parseFloat(operand2));
			break;
		case "/":
			result = divide(parseFloat(operand1), parseFloat(operand2));
			break;
		default:
			result = "Hiba";
	}
	return result;
}

// A kijelző tartalmának frissítése
function updateDisplay() {
	resultElement.textContent = result;
	operand1 = result;
	operand2 = "";
}

// Az operátor beállítása
function setOperator(newOperator) {
	if (operand1 && operand2 && operator) {
		result = calculate();
		updateDisplay();
	}
	operator = newOperator;
}

// A szám bevitel kezelése
function handleNumberInput(number) {
	if (operator) {
		if (result) {
			operand2 += number;
			result = "";
		} else {
			operand2 += number;
		}
	} else {
		if (result) {
			operand1 = number;
			result = "";
		} else {
			operand1 += number;
		}
	}
	result = result.toString();
	updateDisplay();
}

// A pont (tizedesvessző) bevitel kezelése
function handleDecimalInput() {
	if (operator) {
		if (operand2.includes(".")) {
			return;
		}
		operand2 += ".";
	} else {
		if (operand1.includes(".")) {
			return;
		}
		operand1 += ".";
	}
	result = result.toString();
	updateDisplay();
}

// Az egyenlőségjel gombra kattintás eseménykezelője
equalsButton.addEventListener("click", () => {
	if (operand1 && operand2 && operator) {
		result = calculate();
		updateDisplay();
		operator = "";
		operand2 = "";
	}
});

// Az operátor gombok eseménykezelői
operatorButtons.forEach(button => {
button.addEventListener("click", () => {
setOperator(button.textContent);
});
});

// A törlés gomb eseménykezelője
clearButton.addEventListener("click", () => {
operand1 = "";
operand2 = "";
operator = "";
result = "";
updateDisplay();
});

// A backspace gomb eseménykezelője
backspaceButton.addEventListener("click", () => {
if (operator) {
operand2 = operand2.slice(0, -1);
result = "";
} else {
operand1 = operand1.slice(0, -1);
result = "";
}
updateDisplay();
});

// A szám gombok eseménykezelői
numberButtons.forEach(button => {
button.addEventListener("click", () => {
handleNumberInput(button.textContent);
});
});

// A pont gomb eseménykezelője
decimalButton.addEventListener("click", () => {
handleDecimalInput();
});
