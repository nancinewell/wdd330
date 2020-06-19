function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	if (text) { genElement.textContent = text; }
	if (className) { genElement.classList.add(className); }
	if (name) { genElement.setAttribute("name", name); }
	return genElement;
}

function enterKeypress(event) {
	if (event.keyCode == 13) {
		createNewItem();
	}
}

export { createElement, enterKeypress }