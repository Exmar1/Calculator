document.addEventListener('DOMContentLoaded', function() {
	const display = document.querySelector('.display');
	const buttons = document.querySelectorAll('.btn');
	
	let currentInput = '0';       
	let previousInput = '';       
	let operation = null;         
	let resetInput = false;       
	
	function updateDisplay() {
			display.textContent = currentInput;
	}
	
	function inputDigit(digit) {
			if (resetInput) {
					currentInput = digit;
					resetInput = false;
			} else {
					currentInput = currentInput === '0' ? digit : currentInput + digit;
			}
	}
	
	function inputDecimal() {
			if (resetInput) {
					currentInput = '0.';
					resetInput = false;
					return;
			}
			
			if (!currentInput.includes('.')) {
					currentInput += '.';
			}
	}
	
	function clear() {
			currentInput = '0';
			previousInput = '';
			operation = null;
	}
	
	function deleteLastDigit() {
			if (currentInput.length === 1) {
					currentInput = '0';
			} else {
					currentInput = currentInput.slice(0, -1);
			}
	}
	
	function handlePercent() {
			currentInput = (parseFloat(currentInput) / 100).toString();
	}
	
	function handleOperation(nextOperation) {
			const inputValue = parseFloat(currentInput);
			
			if (operation && previousInput) {
					const previousValue = parseFloat(previousInput);
					let result;
					
					switch (operation) {
							case '+':
									result = previousValue + inputValue;
									break;
							case '-':
									result = previousValue - inputValue;
									break;
							case '*':
									result = previousValue * inputValue;
									break;
							case '/':
									result = previousValue / inputValue;
									break;
					}
					
					currentInput = result.toString();
					previousInput = '';
			}
			
			if (nextOperation === '=') {
					operation = null;
			} else {
					previousInput = currentInput;
					operation = nextOperation;
					resetInput = true;
			}
	}
	
	buttons.forEach(button => {
			button.addEventListener('click', () => {
					const value = button.dataset.value;
					
					if ('0123456789'.includes(value)) {
							inputDigit(value);
					} else if (value === '.') {
							inputDecimal();
					} else if (value === 'C') {
							clear();
					} else if (value === '←') {
							deleteLastDigit();
					} else if (value === '%') {
							handlePercent();
					} else if (['+', '-', '*', '/', '='].includes(value)) {
							handleOperation(value);
					}
					
					updateDisplay();
			});
	});
	
	document.addEventListener('keydown', event => {
			const key = event.key;
			
			if (key === 'Enter' || key === '=' || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
					event.preventDefault();
			}
			
			if (!isNaN(key) && key !== ' ') {
					document.querySelector(`.btn[data-value="${key}"]`)?.click();
			} else if (key === '.') {
					document.querySelector(`.btn[data-value="."]`)?.click();
			} else if (key === 'Enter' || key === '=') {
					document.querySelector(`.btn[data-value="="]`)?.click();
			} else if (key === '+' || key === '-' || key === '*' || key === '/') {
					document.querySelector(`.btn[data-value="${key}"]`)?.click();
			} else if (key === 'Escape') {
					document.querySelector(`.btn[data-value="C"]`)?.click();
			} else if (key === 'Backspace') {
					document.querySelector(`.btn[data-value="←"]`)?.click();
			} else if (key === '%') {
					document.querySelector(`.btn[data-value="%"]`)?.click();
			}
	});
	
	updateDisplay();
});