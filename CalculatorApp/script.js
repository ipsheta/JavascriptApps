class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElment) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElment = currentOperandTextElment;
        this.clear();//clear screen when new calculator is created
    }

    //clear screen
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        //removes last char from string
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        //append only one .
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;//dont accept operation without operand
        //compute previous 2 operand based on selected operation before taking new operation 
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;//set operation
        this.previousOperand = this.currentOperand; //set curOperand as prevOperand
        this.currentOperand = '';
    }

    //computaion logics
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) && isNaN(current)) return; //return if not a number

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        //show result as current operand and reset
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //comma delimited current operand
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            //gives comma-separated value and removes decimal places after conversion
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElment.innerText = this.getDisplayNumber(this.currentOperand);

        //concat operation with prev operand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const opertaionButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElment = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElment);

//number buttons click
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);//append number to previously typed number
        calculator.updateDisplay();
    });
});

//operation buttons click

opertaionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButtons.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});