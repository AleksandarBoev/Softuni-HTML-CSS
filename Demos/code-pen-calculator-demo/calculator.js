(() => {
    const elements = {
        firstNumberInput: document.getElementById('first-number'),
        secondNumberInput: document.getElementById('second-number'),
        operationSelect: document.getElementById('operation'),
        resultSpan: document.getElementById('result'),
        calculateButton: document.getElementById('calculate'),
    };

    elements.calculateButton.addEventListener('click', () => {
        const firstNumber = Number(elements.firstNumberInput.value);
        const secondNumber = Number(elements.secondNumberInput.value);
        const selectedOperation = elements.operationSelect.value;

        switch (selectedOperation) {
            case '+':
                elements.resultSpan.textContent = firstNumber + secondNumber;
                break;

            case '-':
                elements.resultSpan.textContent = '' + (firstNumber - secondNumber);
                break;

            case '*':
                elements.resultSpan.textContent = '' + (firstNumber * secondNumber);
                break;

            case '/':
                elements.resultSpan.textContent = '' + (firstNumber / secondNumber);
                break;
        }
    });
})();

