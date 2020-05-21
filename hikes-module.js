// JavaScript source code
function createElement(tag, text, className, src, alt) {
	const genElement = document.createElement(tag);
	genElement.textContent = text;
	if (className) { genElement.classList.add(className); }
	if (src) { genElement.setAttribute("src", src); }
	if (alt) { genElement.setAttribute("alt", alt); }
	return genElement;
}

const imgBasePath = "https://byui-cit.github.io/cit261/examples/";

export { createElement, imgBasePath }