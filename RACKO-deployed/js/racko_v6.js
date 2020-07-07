import { pullListFromStorage, setListToStorage } from './ls.js';
let newPlayer, newAI, numbers;
let turns = 0;
let scoreBoardList = [];

(function () {
	scoreBoard();

	let playButton = document.getElementById("play-button");
	playButton.addEventListener("click", getPlayerName);

	let quitButton = document.getElementById("quit-button");
	quitButton.addEventListener("click", reset);
})()

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
		if (isPrime(card)) {
			cardHeader.classList.add("prime");
		}
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
	clearHand() {
		this.hand = [];
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
		let winner = true;
		for (let i = 0; i < this.hand.length; i++) {
			if (winningHand[i] != this.hand[i]) {
				winner = false
			}
		}
		return winner;

	}
	score() {
		let score = 0;
		for (let i = this.hand.length - 1; i > 0; i--) {
			if (this.hand[i] < this.hand[i - 1]) {
				score += 5;
			}

		}
		score += 5;
		if (score == 50) {
			score += 75;
		}
		return score;
	}
}

class AIPlayer extends Player {
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
					//if discarded card was prime, decrement turn count to allow additional turn;
					if (isPrime(this.hand[i])) {
						turns--;
					}
					newDeck.discard(this.hand[i])
					this.draw(this.hand[i], card);
					break;
				} else {
					//if discarded card was prime, decrement turn count to allow additional turn;
					if (isPrime(this.hand[i - 1])) {
						turns--;
					}
					newDeck.discard(this.hand[i - 1])
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
	let button = document.getElementById("play-button")
	cover.setAttribute("id", "cover");
	cover.appendChild(createElement("div", "What is your name?"));
	let input = cover.appendChild(createElement("input"));
	input.setAttribute("id", "player-name");
	input.addEventListener("keypress", enterPlayerName);
	input.focus();
	button.style.zIndex = "-1";
}

// After player's name is entered, set playerName and remove the elements no longer needed.
function enterPlayerName(event) {
	let input = document.getElementById("player-name");
	let active = document.activeElement
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
		newPlayer = new Player(playerName);
		newAI = new AIPlayer("Johnny Five");

		startGame();
	}
}

// Once players have been established, start the game by shuffling and dealing cards.
function startGame() {
	//Start with new deck
	newDeck.createDeck();
	//Shuffle Deck
	newDeck.shuffle();
	//set turn count to 0
	turns = 0;
	//Create player space labels
	let playerArea = document.getElementById("player-card-area");
	let aiArea = document.getElementById("computer-card-area");
	//Ensure hand is empty (in case player has already played)
	newPlayer.clearHand();
	newAI.clearHand();
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
	if (newPlayer.win()) {
		console.log(`${newPlayer.name} is the winner!`);
		ifWin(newPlayer.win(), newPlayer.name);
	} else if (newAI.win()) {
		console.log(`${newAI.name} is the winner!`);
		ifWin(newAI.win(), newAI.name);
	} else {
		//increment turns
		turns++
		console.log(`Turn: ${turns}`);
		console.log(`DiscardPile: ${newDeck.discardPile}`);

		//refill deck if necessary
		if (newDeck.deck.length == 0) {
			newDeck.refillDeck();
		}
		//On odd turns, player's turn
		if (turns % 2 == 1) {
			//Style name of active player
			let header = document.getElementById("player-card-area").firstChild;
			header.classList.add("active-player");
			//Begin player's turn
			playerTurn();
		} else {
			computerTurn();
		}
	}
}

function playerTurn() {
	//add eventListener to draw pile
	let cardContainer = document.getElementById("draw-pile");
	cardContainer.addEventListener("click", drawTopOfDrawPile);

	//Make discard,if there is one, draggable
	let target = document.querySelector("#discard-pile>.card-front");
	if (target) {
		//make discard draggable
		target.setAttribute("draggable", "true");
		//add event listener to top discarded 
		target.addEventListener("dragstart", drawTopOfDiscardPile);
	}
	//Next thing depends on if player draws a new card or draws a discarded card
}

//Player draws to of discard pile for turn
function drawTopOfDiscardPile(event) {
	event.dataTransfer.setData("text", event.target.id);
	//set drag event listeners
	setDragOver();
	//set drop event listeners
	setDropFromDiscard();
}

function setDragOver() {
	// cards can be dragged over the cards in the player's hand and styled
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
}


function setDropFromDiscard() {
	let containers = document.getElementById("player-card-container").children;

	for (let container of containers) {
		container.addEventListener("drop", discardListener);
	}
}

function discardListener(event) {
	//get the dataTransfer that kept track of which element this is and the id of the card it was dropped onto
	let targetCard = event.target.getAttribute("name");
	let newCard = parseInt(event.dataTransfer.getData("text/plain"));

	//remove the event listener so the player can't draw a card from the draw pile
	let cardContainer = document.getElementById("draw-pile");
	cardContainer.removeEventListener("click", drawTopOfDrawPile);

	//remove top discard card from the discard pile
	newDeck.topDiscard()

	//replace old card with the new card
	newPlayer.draw(targetCard, newCard);

	//discard replaced card
	newDeck.discard(targetCard);

	//display discard pile
	newDeck.displayDiscard();

	//display the new hand
	newPlayer.displayHand();

	//if discarded card was prime, decrement turn count to allow additional turn;
	if (isPrime(targetCard)) {
		turns--;
	}

	//end turn- remove active player and continue the game!
	let header = document.getElementById("player-card-area").firstChild;
	header.classList.remove("active-player");
	whosTurn();
}

//Player draws new card from draw-pile
function drawTopOfDrawPile() {
	//draw the card
	let cardContainer = document.getElementById("draw-pile");
	newDeck.drawTopCard(cardContainer);
	//remove the event listeners so the player can't draw another card or try to take the discard after drawing
	cardContainer.removeEventListener("click", drawTopOfDrawPile);
	let discardedCard = document.querySelector("#discard-pile>.card-front");
	if (discardedCard) {
		discardedCard.removeEventListener("dragstart", drawTopOfDiscardPile);
		discardedCard.setAttribute("draggable", false);
	}
	//Make drawn card draggable
	drawnCardDraggable();

	//set drag event listeners
	setDragOver();
	//discardDragOver();
	//set drop event listeners
	setDropFromDraw();
}


function drawnCardDraggable() {
	//make drawn card draggable
	let target = document.querySelector("#draw-pile>.card-front");
	target.setAttribute("draggable", "true");
	target.addEventListener("dragstart", function (event) {
		//keep track of which card this is
		let id = event.target.id;
		event.dataTransfer.setData("text", event.target.id);
	}, false);
}

function setDropFromDraw() {
	// new cards can be dragged over the cards in the player's hand
	let containers = document.getElementById("player-card-container").children;
	for (let container of containers) {
		container.removeEventListener("drop", discardListener);
		container.addEventListener("dragover", function (event) {
			event.preventDefault();
			container.classList.add("drag-over");
		})
		container.addEventListener("dragleave", function (event) {
			container.classList.remove("drag-over");
		})
	}

	for (let container of containers) {
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

			//if discarded card was prime, decrement turn count to allow additional turn;
			if (isPrime(targetCard)) {
				turns--;
			}
			//end turn- remove active player and continue the game!
			let header = document.getElementById("player-card-area").firstChild;
			header.classList.remove("active-player");
			whosTurn();
		});
	}
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

	//AI take turn, includes discarding the card
	newAI.takeTurn(card)

	let promiseA = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(clearDrawPile());
			promiseB
		}, 1000)
	})

	let promiseB = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(newDeck.displayDiscard());
			//end turn- remove active player and continue the game!
			let header = document.getElementById("computer-card-area").firstChild;
			header.classList.remove("active-player");
			whosTurn();
		}, 1000)
	})
	//delays so human player can perceive ai turn
	promiseA

}

function ifWin(win, player) {
	if (win == true) {
		let main = document.getElementsByTagName("main")[0];
		let playerscore = newPlayer.score();
		let aiscore = newAI.score();
		//declare winner
		let winDiv = main.appendChild(createElement("div", `${player} Wins!`, "winner"))
		winDiv.setAttribute("id", "winner");
		//fireworks
		let pyro = winDiv.appendChild(createElement("div", "", "pyrotechnics"));

		//add eventlistener- click to dismiss win message
		winDiv.addEventListener("click", function () {
			//set winner name to local storage
			scoreBoardList.push(player);
			//update scoreboard from local storage
			setListToStorage(scoreBoardList);
			//reset
			let child = document.getElementById("winner");
			main.removeChild(child);
			scoreBoard();
			reset();
		})
	} else {
		return false;
	}
}


function reset() {
	let computerPlayArea = document.getElementById("computer-card-area");
	let playerPlayArea = document.getElementById("player-card-area");
	let discardPile = document.getElementById("discard-pile");
	let drawPile = document.getElementById("draw-pile")
	let child = drawPile.children[1]
	//clear playing elements from page
	computerPlayArea.innerHTML = "";
	playerPlayArea.innerHTML = "";
	discardPile.innerHTML = "";
	let children = document.getElementById("discard-pile").children;
	for (let child of children) {
		drawPile.removeChild(child);
	}
	//show scoreboard - hide game container
	let scoreBoard = document.getElementById("score-board-container");
	let gameContainer = document.getElementById("game-container");
	scoreBoard.classList.remove("hide");
	gameContainer.classList.add("hide");
	//show play button
	let button = document.getElementById("play-button");
	button.style.zIndex = "2";
}

function scoreBoard() {
	let scoreBoard = document.getElementById("score-board");
	scoreBoardList = pullListFromStorage(scoreBoardList);
	for (let item of scoreBoardList) {
		scoreBoard.appendChild(createElement("p", item, "score-board-item"));
	}
}



//fetch the data from the numbers API and set to the global variable "numbers"
//retrieve with numbers[i]
try {
	fetch('https://nancinewell.github.io/wdd330/numbersapi.json', {
		method: 'GET',
		mode: 'cors',
		redirect: 'follow',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
		.then(response => {
			console.log(response);
			return response.json();
		})

		.then(numbersObject => {
			numbers = numbersObject
		})
} catch{
	for (let i = 0; i < 60; i++) {
		numbers[i] = i + 1;
	}
}

function createElement(tag, text, className, name) {
	const genElement = document.createElement(tag);
	if (text) { genElement.textContent = text; }
	if (className) { genElement.classList.add(className); }
	if (name) { genElement.setAttribute("name", name); }
	return genElement;
}


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

export { scoreBoardList }