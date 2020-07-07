// Create the deck and appropriate functions for the game to run.
class Deck {
	constructor() {
		//begin with an empty array
		this.deck = [];
		this.discardPile = [];
		this.createDeck();
		this.shuffle();
	}
	createDeck() {
		this.deck = [];
		this.discardPile = [];
		let i;
		for (i = 0; i < 60; i++) {
			this.deck[i] = i + 1;
		}
	}
	shuffle() {
		let random, temp, i;
		for (i = 0; i < this.deck.length; i++) {
			random = Math.floor(Math.random() * (i + 1));
			temp = this.deck[i];
			this.deck[i] = this.deck[random];
			this.deck[random] = temp;
		}
		//return this.deck;
	}
	topCard() {
		//remove the card from the deck;
		let card = this.deck[0];
		this.deck.shift();
		return card;
	}
	drawTopCard(cardContainer) {
		//remove the card from the deck;
		let card = this.deck[0];
		this.deck.shift();
		//display the card
		this.displayCardFront(cardContainer, card);
		//pass the card
		return card;
	}
	discard(card) {
		this.discardPile.unshift(parseInt(card));
	}
	topDiscard() {
		this.discardPile.shift();
	}
	displayCardFront(cardContainer, card) {
		let cardFront = cardContainer.appendChild(createElement("div", "", "card-front"));
		cardFront.setAttribute("id", card);
		cardFront.setAttribute("name", card);
		let firstContainer = cardFront.appendChild(createElement("div"));
		firstContainer.setAttribute("name", card);
		let cardHeader = firstContainer.appendChild(createElement("div", "", "card-header"));
		cardHeader.setAttribute("name", card);
		let secondContainer = cardHeader.appendChild(createElement("div"));
		secondContainer.setAttribute("name", card);
		secondContainer.style.transform = `translateX(${card / 60 * 130 - 35}px) skew(-20deg)`;
		let paragraph = secondContainer.appendChild(createElement("p", card));
		paragraph.setAttribute("name", card);

		let cardNumber = firstContainer.appendChild(createElement("div", card, "card-number"));
		cardNumber.setAttribute("name", card);
		let flavor = firstContainer.appendChild(createElement("div", numbers[card], "card-flavor"));
		flavor.setAttribute("name", card);
	}
	displayCardBack(cardContainer) {
		let cardBack = cardContainer.appendChild(createElement("div", "", "card-back"));
		let logoContainer = cardBack.appendChild(createElement("div", "", "logo-container-card"));
		logoContainer.appendChild(createElement("div", "", "logo-card")).appendChild(createElement("p", "R"));
		logoContainer.appendChild(createElement("div", "", "logo-card")).appendChild(createElement("p", "A"));
		logoContainer.appendChild(createElement("div", "", "logo-card")).appendChild(createElement("p", "C"));
		logoContainer.appendChild(createElement("div", "", "logo-card")).appendChild(createElement("p", "K"));
		logoContainer.appendChild(createElement("div", "", "logo-card")).appendChild(createElement("p", "O"));
	}
	displayDiscard() {
		let discardContainer = document.getElementById("discard-pile");
		discardContainer.innerHTML = "";
		let card = this.discardPile[0];
		this.displayCardFront(discardContainer, card);
	}
	refillDeck() {
		for (let card of this.discardPile) {
			this.deck.push(card);
		}
		this.shuffle();
		this.discardPile = [];
		let discardSpace = document.getElementById("discard-pile");
		discardSpace.innerHTML = "";
	}
}

export { Deck }
