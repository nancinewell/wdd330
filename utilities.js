function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	genElement.textContent = text;
	genElement.classList.add(className);
	genElement.setAttribute("name", name);
	return genElement;
}



export { createElement }