//import { pullListFromStorage, setListToStorage } from './ls.js';
//import { createElement } from './utilities.js';




/*
 * Create the deck and appropriate functions for the game to run.
 */
class Deck {
	constructor() {
		//begin with an empty array
		this.deck = [];
		this.discardPile = [];
		this.createDeck();
		this.shuffle();
	}
	createDeck() {
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
		//this.deck.pop();
		let card = this.deck[0];
		this.deck.shift();
		return card;
	}
	discard(card) {
		this.discardPile.push(card);
	}
	topDiscard() {
		this.discardPile.pop();
    }

}

let newDeck = new Deck();
/*
 * Create a player and the appropriate functions needed for the player's turn
 */
class Player {
	constructor(name) {
		this.name = name;
		this.hand = [];
	}
	draw() {
		this.hand.push(newDeck.topCard());
	}
	drawDiscard() {
		this.hand.push(newDeck.topDiscard());
    }
	discardCard(card) {
		this.hand.splice(card, 1);
		newDeck.discard(card);
	}
	win() {
		let winningHand = [];
		for (card of this.hand) {
			winningHand.push(card)
        }
		winningHand.sort();
		if (winningHand == this.hand) {
			console.log(`${this.name} is the winner!`);
        }
    }
}

class AIPlayer extends Player{
	constructor(name) {
		super(name);
	}
	takeTurn() {
		//draw a card
		this.draw();
		//place the card

		//discard a card
    }

}
let numbers, turns, winner, newPlayer, newAI;

/*
 * When "PLAY" button is clicked, generate elements needed to gather the player's name 
 */
function getPlayerName() {
	let container = document.getElementsByTagName("main")[0];
	let cover = container.appendChild(createElement("div"));

	cover.setAttribute("id", "cover");
	cover.appendChild(createElement("div", "What is your name?"));
	let input = cover.appendChild(createElement("input"));
	input.setAttribute("id", "player-name");
	input.addEventListener("keypress", enterPlayerName);
	input.focus();
}

/*
 * After player's name is entered, set playerName and remove the elements no longer needed.
 */
function enterPlayerName(event) {
	let input = document.getElementById("player-name");
	let active = document.activeElement
	let button = document.getElementById("play-button");
	if (event.keyCode == 13 && active === input) {
		let playerName = input.value;
		let cover = document.getElementById("cover");
		cover.parentNode.removeChild(cover);
		button.style.display = "none;";
		newPlayer = new Player(playerName);
		newAI = new AIPlayer("Johnny Five");
		startGame();
	}
}

/*
 * Once players have been established, start the game by shuffling and dealing cards.
 */
function startGame() {
	//Shuffle Deck
	newDeck.shuffle;
	//Deal 10 cards to each player
	for (let i = 0; i < 10; i++) {
		newPlayer.draw();
		newAI.draw();
	}
	//set turn count to 0
	turns = 0;
	//Create player space labels
	let playerArea = document.getElementById("player-card-area");
	let aiArea = document.getElementById("computer-card-area");

	playerArea.appendChild(createElement("h2", newPlayer.name, "name-header"));
	aiArea.appendChild(createElement("h2", newAI.name, "name-header"));
}

//export { getPlayerName }
//* * * * UTILITIES * * * *

//generic create element function
function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	if (text) { genElement.textContent = text; }
	if (className) { genElement.classList.add(className); }
	if (name) { genElement.setAttribute("name", name); }
	return genElement;
}

//fetch the data from the numbers API and set to the global variable "numbers"
//retrieve with numbers[i]
fetch('http://numbersapi.com/1..60', {
	method: 'GET',
	mode: 'cors',
	redirect: 'follow',
	cache: 'no-cache'
})

	.then(response => {
		return response.json();
	})

	.then(numbersObject => {
		numbers = numbersObject
	})



//* * * * LS HELPERS * * * *
function pullListFromStorage(newList) {
	//pull itemList from storage
	let storedList = JSON.parse(localStorage.getItem("list"));
	//set new itemList
	if (storedList != null) {
		newList.itemList = storedList;
	}
}

function setListToStorage() {
	localStorage.setItem("list", JSON.stringify(newList.itemList));
}