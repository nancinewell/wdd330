//import { pullListFromStorage, setListToStorage } from './ls.js';
//import { createElement } from './utilities.js';
let numbers, winner, newPlayer, newAI;
let turns = 0;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
						DECK & PLAYER CLASSES
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
		this.discardPile.push(card);
	}
	topDiscard() {
		this.discardPile.pop();
    }
	displayCardFront(cardContainer, card) {
		let cardFront = cardContainer.appendChild(createElement("div", "", "card-front"));
		cardFront.setAttribute("id", card);
		let firstContainer = cardFront.appendChild(createElement("div"));
		let cardHeader = firstContainer.appendChild(createElement("div", "", "card-header"));
		let secondContainer = cardHeader.appendChild(createElement("div"));
		secondContainer.style.transform = `translateX(${card / 60 * 130 - 35}px) skew(-20deg)`;
		secondContainer.appendChild(createElement("p", card));

		firstContainer.appendChild(createElement("div", card, "card-number"));
		firstContainer.appendChild(createElement("div", numbers[card], "card-flavor"));
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
}

let newDeck = new Deck();

// Create a player and the appropriate functions needed for the player's turn
class Player {
	constructor(name) {
		this.name = name;
		this.hand = [];
		this.player = 1;
	}
	deal() {
		this.hand.push(newDeck.topCard());
	}
	draw(discardedCard, newCard) {
		let CardIndex = discardedCard;
		let checkIndex = (discardedCard) => CardIndex == discardedCard;
		let index = this.hand.findIndex(checkIndex);
		this.hand.splice(index, 1, newCard);
	}
	drawDiscard() {
		this.hand.push(newDeck.topDiscard());
    }
	discardCard(card) {
		this.hand.splice(card, 1);
		newDeck.discard(card);
	}
	displayHand() {
		let playArea;

		//determine if player is human or computer and setup playArea.
		if (this.player == 1) {
			playArea = document.getElementById("player-card-area");
			playArea.innerHTML = "";
			playArea.appendChild(createElement("h2", newPlayer.name, "name-header"));
			let cardContainer = playArea.appendChild(createElement("div", "", "card-container"));
			cardContainer.setAttribute("id", "player-card-container");
			let container = document.getElementById("player-card-container");
			for (let card of this.hand) {
				let newCard = newDeck.displayCardFront(container, card);
			}

		} else {
			playArea = document.getElementById("computer-card-area");
			playArea.appendChild(createElement("h2", newAI.name, "name-header"));
			let cardContainer = playArea.appendChild(createElement("div", "", "card-container"));
			cardContainer.setAttribute("id", "computer-card-container");
			let container = document.getElementById("computer-card-container");
			for (let card of this.hand) {
				newDeck.displayCardBack(container)
			}
		}
    }
	win() {
		let winningHand = [];
		for (card of this.hand) {
			winningHand.push(card)
        }
		winningHand.sort();
		if (winningHand == this.hand) {
			console.log(`${this.name} is the winner!`);
			//Declare winner properly
			//Animation?
			//remove event listeners
			//update scoreboard
        }
    }
}

class AIPlayer extends Player{
	constructor(name) {
		super(name);
		this.player = 2;
	}
	takeTurn() {
		//draw a card
		this.draw();
		//place the card

		//discard a card
    }

}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
						START THE GAME
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//When "PLAY" button is clicked, generate elements needed to gather the player's name 
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

// After player's name is entered, set playerName and remove the elements no longer needed.
function enterPlayerName(event) {
	let input = document.getElementById("player-name");
	let active = document.activeElement
	let button = document.getElementById("play-button");
	if (event.keyCode == 13 && active === input) {
		let playerName = input.value;
		let cover = document.getElementById("cover");
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		if (vw < 1080) {
			let scoreBoard = document.getElementById("score-board-container");
			let gameContainer = document.getElementById("game-container");
			scoreBoard.classList.add("hide");
			gameContainer.classList.remove("hide");
		}
		cover.parentNode.removeChild(cover);
		button.style.display = "none;";
		newPlayer = new Player(playerName);
		newAI = new AIPlayer("Johnny Five");
		startGame();
	}
}

// Once players have been established, start the game by shuffling and dealing cards.
function startGame() {
	//Shuffle Deck
	newDeck.shuffle;
	//set turn count to 0
	turns = 0;
	//Create player space labels
	let playerArea = document.getElementById("player-card-area");
	let aiArea = document.getElementById("computer-card-area");

	//playerArea.appendChild(createElement("h2", newPlayer.name, "name-header"));
	//aiArea.appendChild(createElement("h2", newAI.name, "name-header"));

	//Deal 10 cards to each player
	for (let i = 0; i < 10; i++) {
		newPlayer.deal();
		newAI.deal();
	}

	//Render players' hands
	newPlayer.displayHand(playerArea);
	newAI.displayHand(aiArea);

	whosTurn();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
						GAME PLAY!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function whosTurn() {
	turns++
	//On odd turns, player's turn
	if (turns % 2 == 1) {
		playerTurn();
	} else {
		computerTurn();
    }
}

function playerTurn() {
	//Style name of active player
	let header = document.getElementById("player-card-area").firstChild;
	header.classList.add("active-player");

	//add eventListener to draw pile
	let cardContainer = document.getElementById("draw-pile");
	cardContainer.addEventListener("click", drawTopOfDrawPile);
}
// * * * * * * * * * * NEED TO REMOVE THE EVENT LISTENER AFTER THE DRAW PILE HAS BEEN CLICKED ONCE!
function drawTopOfDrawPile() {
	//draw the card
	let cardContainer = document.getElementById("draw-pile");
	newDeck.drawTopCard(cardContainer);
	//remove the event listener so the player can't draw another card
	cardContainer.removeEventListener("click", drawTopOfDrawPile);

	//set drag/drop event listeners
	makeDraggable();
}


function confirmCardPlacement() {
	//confirm drop is where you want it, then finish player turn
}

function finishPLayerTurn() {
	
	//remove active player class & pass the turn
	
}

function computerTurn() {

	whosTurn();
}







function makeDraggable() {
	let target = document.getElementById("draw-pile").children;
	console.log(target[1]);
	target[1].setAttribute("draggable", "true");
	target[1].addEventListener("dragstart", function (event) {
		//keep track of which card this is
		event.dataTransfer.setData("text", event.target.id);
		target[1].style.transform = "scale(.75, .75);";
	}, false);

	//Things can be dragged over empty discard pile
	let discardPile = document.getElementById("discard-pile");
	discardPile.addEventListener("dragover", function (event) {
		event.preventDefault();
	});

	// new cards can be dragged over the cards in the player's hand and the cards in the discard pile
	let containers = document.querySelectorAll(".card-front");
	for (let container of containers) {
		container.addEventListener("dragover", function (event) {
			event.preventDefault();
			container.classList.add("drag-over");
		})
		container.addEventListener("dragleave", function (event) {
			container.classList.remove("drag-over");
		})
	}

	for (container of containers) {
		container.addEventListener("drop", function (event) {

			//get the dataTransfer that kept track of which element this is and the id of the card it was dropped onto
			let targetCard = event.target.getAttribute("id");
			let newCard = event.dataTransfer.getData("text");
			//confirm drop location
			window.confirm(`Are you sure you want to replace #{targetCard}?`);

			//once card is dropped, move the card it dropped onto to the discard pile
			newDeck.discard(targetCard);
			//Put replaced the old card with the new card
			newPlayer.draw(targetCard, newCard);
			//display the new hand
			newPlayer.displayHand();
			//check for win condition
			newPlayer.win();
			//end turn- remove active player and continue the game!
			header.classList.remove("active-player");
			whosTurn();
		});
	}

}



//export { stuff }
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
						UTILITIES
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
						LOCAL STORAGE HELPERS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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