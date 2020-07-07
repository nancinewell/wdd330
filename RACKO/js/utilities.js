function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	if (text) { genElement.textContent = text; }
	if (className) { genElement.classList.add(className); }
	if (name) { genElement.setAttribute("name", name); }
	return genElement;
}


//fetch the data from the numbers API and set to the global variable "numbers"
//retrieve with numbers[i]
let numbers;
fetch('http://numbersapi.com/1..60', {
	method: 'GET',
	//mode: 'cors',
	redirect: 'follow',
	cache: 'no-cache'
})

	.then(response => {
		return response.json();
	})

	.then(numbersObject => {
		numbers = numbersObject
	})


function isPrime(number) {
	let countDivisors = 0;
	let isPrimeNum = false;
	for (let i = 2; i <= number; i++) {
		if (number % i == 0) {
			countDivisors++;
			if (countDivisors > 1) {
				return isPrimeNum;
			}
		}
	}
	isPrimeNum = true;
	return isPrimeNum;
}



export { createElement, numbers, isPrime }

