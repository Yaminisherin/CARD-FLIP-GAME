const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restart");

let cards = [];
let flippedCards = [];
let matchedCards = [];
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

// Shuffle the card values using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = '?'; // Show question mark initially

    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            flipCard(card);
        }
    });

    return card;
}

function flipCard(card) {
    card.classList.add('flipped');
    card.innerHTML = card.dataset.value; // Reveal card value
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        // Cards match
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('You Win!'), 500);
        }
    } else {
        // Cards don't match, flip them back after a short delay
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
        }, 1000);
    }
}

function initializeGame() {
    gameBoard.innerHTML = ''; // Clear the board
    flippedCards = [];
    matchedCards = [];

    shuffle(cardValues);
    cards = cardValues.map(value => createCard(value));

    cards.forEach(card => {
        gameBoard.appendChild(card);
    });
}

restartButton.addEventListener('click', initializeGame);

// Initialize the game for the first time
initializeGame();