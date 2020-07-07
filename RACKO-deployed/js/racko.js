//import { pullListFromStorage, setListToStorage } from './ls.js';
//import { createElement } from './utilities.js';
let numbers, winner, newPlayer, newAI;
let turns = 0;
let scoreBoardList = [];

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
		this.discardPile.unshift(parseInt(card));
	}
	topDiscard() {
		this.discardPile.pop();
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
		this.hand.splice(index, 1, parseInt(newCard));
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
		for (let card of this.hand) {
			winningHand.push(parseInt(card))
		}
		winningHand.sort(function (a, b) { return b - a });
		console.log(`This Hand: ${this.hand}`);
		console.log(`Winning Hand: ${winningHand}`);
		let winner = true;
		for (let i = 0; i < this.hand.length; i++) {
			if (winningHand[i] != this.hand[i]) {
				winner=false
            }
		}
		console.log(`Winner = ${winner}`);
		return winner;
			
	}
	score() {
		let score = 0;
		for (let i = this.hand.length - 1; i > 0; i--) {
			if (this.hand[i] < this.hand[i - 1]) {
				score += 5;
            }
		}
		if (score == 50) {
			score += 75;
		}
		return score;
    }
}

class AIPlayer extends Player{
	constructor(name) {
		super(name);
		this.player = 2;
	}
	takeTurn(card) {
		//determine where card goes
		for (let i = 0; i < this.hand.length; i++) {
			if (card < this.hand[i]) {
				//place the card and discard replaced card
				if (i == 0) {
					newDeck.discard(this.hand[i])
					this.draw(this.hand[i], card);
					break;
				} else {
					newDeck.discard(this.hand[i-1])
					this.draw(this.hand[i - 1], card);
					break;
				}
            }
        }
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
	if (ifWin(newPlayer.win(), newPlayer.name)) {
		console.log(`${newPlayer.name} is the winner!`);

	} else if (ifWin(newAI.win(), newAI.name)) {
		console.log(`${newAI.name} is the winner!`)
	} else {
		//increment turns
		turns++
		//refill deck if necessary
		if (newDeck.deck.length == 0) {
			newDeck.refillDeck();
        }
		//On odd turns, player's turn
		if (turns % 2 == 1) {
			playerTurn();
		} else {
			computerTurn();
		}
	}
}

function playerTurn() {
	//Style name of active player
	let header = document.getElementById("player-card-area").firstChild;
	header.classList.add("active-player");

	//add eventListener to draw pile
	let cardContainer = document.getElementById("draw-pile");
	cardContainer.addEventListener("click", drawTopOfDrawPile);

	
	let target = document.querySelector("#discard-pile>.card-front");
	if (target) {
		//make discard draggable
		target.setAttribute("draggable", "true");
		//add event listener to top discarded 
		target.addEventListener("dragstart", drawTopOfDiscardPile);
	}
}

function drawTopOfDiscardPile(event) {
	//make draggable
	let target = document.querySelector("#discard-pile>.card-front");
	target.setAttribute("draggable", "true");
	event.dataTransfer.setData("text", event.target.id);
	//set drag/drop event listeners
	drawFromDiscard();
}

function drawTopOfDrawPile() {
	//draw the card
	let cardContainer = document.getElementById("draw-pile");
	newDeck.drawTopCard(cardContainer);
	//remove the event listeners so the player can't draw another card or try to take the discard after drawing
	cardContainer.removeEventListener("click", drawTopOfDrawPile);
	let discardedCard = document.querySelector("#discard-pile>.card-front");
	if (discardedCard) {
		discardedCard.removeEventListener("dragstart", drawTopOfDiscardPile);
	}
	//set drag/drop event listeners
	makeDraggableDraw();
}

function clearDrawPile() {
	let drawPile = document.getElementById("draw-pile");
	let deleteThis = document.querySelector("#draw-pile>.card-front");
	if (deleteThis) {
		drawPile.removeChild(deleteThis);
	}
	
}

function computerTurn() {
	//Style name of active player
	let header = document.getElementById("computer-card-area").firstChild;
	header.classList.add("active-player");

	let cardContainer = document.getElementById("draw-pile");
	newDeck.drawTopCard(cardContainer);

	let card = document.getElementById("draw-pile").children[1].getAttribute("id");
	console.log(`drawn card: ${card}`);
	console.log(`AI hand before turn: ${newAI.hand}`);
	//AI take turn, includes discarding the card
	newAI.takeTurn(card)
	console.log(`AI hand after turn: ${newAI.hand}`);
	//display discard pile
	newDeck.displayDiscard(); 
	//remove card element from draw pile
	clearDrawPile();
	//end turn- remove active player and continue the game!
	header.classList.remove("active-player");
	whosTurn();
}


function drawFromDiscard() {
	// new cards can be dragged over the cards in the player's hand
	let containers = document.getElementById("player-card-container").children;
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
			let targetCard = event.target.getAttribute("name");
			let newCard = event.dataTransfer.getData("text/plain");

			//remove the event listener so the player can't draw a card from the draw pile
			let cardContainer = document.getElementById("draw-pile");
			cardContainer.removeEventListener("click", drawTopOfDrawPile);

			//remove card element from draw pile
			clearDrawPile()
			
			//replace old card with the new card
			newPlayer.draw(targetCard, newCard);
			//remove drawn discard card from the discard pile
			newDeck.discardPile.splice(targetCard, 1);
			//display discard pile
			newDeck.displayDiscard();
			//display the new hand
			newPlayer.displayHand();
			//check for win condition
			newPlayer.win();
			//end turn- remove active player and continue the game!
			let header = document.getElementById("player-card-area").firstChild;
			header.classList.remove("active-player");
			whosTurn();
		});
	}


}

function makeDraggable() {
	// new cards can be dragged over the cards in the player's hand
	let containers = document.getElementById("player-card-container").children;
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
			let targetCard = event.target.getAttribute("name");
			let newCard = event.dataTransfer.getData("text/plain");

			//remove the event listener so the player can't draw a card from the draw pile
			let cardContainer = document.getElementById("draw-pile");
			cardContainer.removeEventListener("click", drawTopOfDrawPile);

			//remove card element from draw pile
			clearDrawPile()
			//once card is dropped, move the card it dropped onto to the discard pile
			newDeck.discard(targetCard);
			newDeck.displayDiscard();
			//Put replaced the old card with the new card
			newPlayer.draw(targetCard, newCard);
			//display the new hand
			newPlayer.displayHand();
			//check for win condition
			newPlayer.win();
			//end turn- remove active player and continue the game!
			let header = document.getElementById("player-card-area").firstChild;
			header.classList.remove("active-player");
			whosTurn();
		});
	}
}




function makeDraggableDraw() {
	//make drawn card draggable
	let target = document.querySelector("#draw-pile>.card-front");
	target.setAttribute("draggable", "true");
	target.addEventListener("dragstart", function (event) {
		//keep track of which card this is
		let id = event.target.id;
		event.dataTransfer.setData("text", event.target.id);
	}, false);

	//Things can be dragged over empty discard pile
	let discardPile = document.getElementById("discard-pile");
	discardPile.addEventListener("dragover", function (event) {
		event.preventDefault();
		discardPile.classList.add("drag-over");
	})
	discardPile.addEventListener("dragleave", function (event) {
		discardPile.classList.remove("drag-over");
	})

	// new cards can be dragged over the cards in the discard pile
	discardPile.addEventListener("drop", function (event) {
		//get the dataTransfer that kept track of which element this is and the id of the card it was dropped onto
		let targetCard = event.target.getAttribute("name");
		let newCard = parseInt(event.dataTransfer.getData("text/plain"));
		let discardPile = document.getElementById("discard-pile");
		discardPile.classList.remove("drag-over");
		//once card is dropped, move the card it dropped onto to the discard pile
		newDeck.discard(newCard);
		newDeck.displayDiscard();
		//remove card element from draw pile
		clearDrawPile()
		//end turn- remove active player and continue the game!
		let header = document.getElementById("player-card-area").firstChild;
		header.classList.remove("active-player");
		whosTurn();
	})
	//finish up
	makeDraggable()

}

function ifWin(win, player) {
	if (win == true) {
		let main = document.getElementsByTagName("main")[0];
		//declare winner
		let winDiv = main.appendChild(createElement("div", `${player} Wins!`, "winner"))
		winDiv.appendChild(createElement("div", `${newPlayer.name} scored ${newPlayer.score} points`));
		winDiv.appendChild(createElement("div", `${newAI.name} scored ${newAI.score} points`));
		//add eventlistener- click to dismiss win message
        winDiv.addEventListener("click", function () {
			//set winner name to local storage
			scoreBoardList.push(player)
			//update scoreboard from local storage
			setListToStorage()
			//reset();
        })
	} else {
		return false;
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
function pullListFromStorage(scoreBoardList) {
	//pull itemList from storage
	let storedList = JSON.parse(localStorage.getItem("list"));
	//set new itemList
	if (storedList != null) {
		scoreBoardList = storedList;
	}
}

function setListToStorage() {
	localStorage.setItem("list", JSON.stringify(scoreBoardList));
}