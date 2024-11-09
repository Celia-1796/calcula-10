// Seleccionamos el display y todos los botones
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = ""; // Input actual que se muestra en pantalla
let operator = ""; // Operador actual
let firstOperand = ""; // Primer operando
let secondOperand = ""; // Segundo operando

// Función para actualizar el display
function updateDisplay(value) {
    display.value = value;
}

// Función para reiniciar la calculadora
function resetCalculator() {
    currentInput = "";
    operator = "";
    firstOperand = "";
    secondOperand = "";
    updateDisplay("0");
}

// Función para manejar la entrada de un número o punto
function handleNumberInput(value) {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
    updateDisplay(currentInput);
}

// Función para manejar la operación
function handleOperator(value) {
    if (currentInput === "" && value === "-") {
        currentInput = "-";
        updateDisplay(currentInput);
        return;
    }
    if (firstOperand && operator && currentInput) {
        secondOperand = currentInput;
        calculate();
    }
    operator = value;
    firstOperand = currentInput;
    currentInput = "";
}

// Función para realizar el cálculo
function calculate() {
    let result;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            return;
    }

    updateDisplay(result);
    firstOperand = result;
    secondOperand = "";
    currentInput = "";
    operator = "";
}

// Función para manejar el cambio de signo
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(currentInput);
}

// Función para manejar la eliminación del último dígito
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}


// Asignar eventos a cada botón
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const { id } = button;

        if (id >= "0" && id <= "9" || id === ".") {
            handleNumberInput(id);
        } else if (id === "ac") {
            resetCalculator();
        } else if (id === "de") {
            deleteLast();
        } else if (id === "+/-") {
            toggleSign();
        } else if (id === "=") {
            if (operator && currentInput) {
                secondOperand = currentInput;
                calculate();
            }
        } else {
            handleOperator(id);
        }
    });
});
