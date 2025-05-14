/* Game variables */
let minRange = 1;
let maxRange = 100;
let maxAttempts = 7;
let attemptsLeft = 7;
let targetNumber = 0;
let gameActive = false;
let gameScore = 0;
let guessHistory = [];

/* DOM Elements */
const difficultySelect = document.getElementById('difficulty');
const startGameBtn = document.getElementById('start-game');
const gameMessage = document.getElementById('game-message');
const hundreds = document.getElementById('hundreds');
const tens = document.getElementById('tens');
const ones = document.getElementById('ones');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess');
const attemptsLeftDisplay = document.getElementById('attempts-left');
const scoreDisplay = document.getElementById('score');
const guessHistoryList = document.getElementById('guess-history');
const resultModal = document.getElementById('result-modal');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again-btn');
const closeResultBtn = document.getElementById('close-result-btn');

/* Initialize game */
function initGame() {
    /* Set up event listeners */
    difficultySelect.addEventListener('change', updateDifficulty);
    startGameBtn.addEventListener('click', startNewGame);
    guessForm.addEventListener('submit', handleGuessSubmit);
    playAgainBtn.addEventListener('click', () => {
        hideResultModal();
        startNewGame();
    });
    closeResultBtn.addEventListener('click', hideResultModal);

    /* Keyboard input for guess submission */
    guessInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && gameActive && activeTab === 'game') {
            e.preventDefault();
            handleGuessSubmit(e);
        }
    });

    /* Auto-focus input when game starts */
    guessInput.focus();

    /* Start a new game */
    startNewGame();
}

/* Update difficulty settings */
function updateDifficulty() {
    const difficulty = difficultySelect.value;
    const settings = getDifficultySettings(difficulty);
    
    minRange = settings.min;
    maxRange = settings.max;
    maxAttempts = settings.attempts;
    
    /* Update guess input range */
    guessInput.min = minRange;
    guessInput.max = maxRange;
    guessInput.placeholder = `Enter your guess (${minRange}-${maxRange})`;
    
    /* If game is active, restart it */
    if (gameActive) {
        startNewGame();
    }
}

/* Get difficulty settings */
function getDifficultySettings(difficulty) {
    const settings = {
        easy: { min: 1, max: 50, attempts: 10 },
        medium: { min: 1, max: 100, attempts: 7 },
        hard: { min: 1, max: 200, attempts: 5 }
    };
    
    return settings[difficulty];
}

/* Start a new game */
function startNewGame() {
    /* Generate random number */
    targetNumber = generateRandomNumber(minRange, maxRange);
    attemptsLeft = maxAttempts;
    gameActive = true;
    guessHistory = [];
    
    /* Update UI */
    gameMessage.textContent = `I'm thinking of a number between ${minRange} and ${maxRange}...`;
    gameMessage.className = 'game-message';
    attemptsLeftDisplay.textContent = `Attempts remaining: ${attemptsLeft}`;
    scoreDisplay.textContent = `Score: ${gameScore}`;

    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    
    /* Reset number display */
    hundreds.textContent = '-';
    tens.textContent = '-';
    ones.textContent = '-';
    
    /* Clear history display */
    updateGuessHistory();

    /* Focus input if game tab is active */
    if (activeTab === 'game') {
        guessInput.focus();
    }
}

/* Generate random number */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Handle guess submission */
function handleGuessSubmit(e) {
    e.preventDefault();  /* Prevent form default behavior */

    if (!gameActive || activeTab !== 'game') return;

    /* Get and validate guess */
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < minRange || guess > maxRange) {
        gameMessage.textContent = `Please enter a number between ${minRange} and ${maxRange}`;
        gameMessage.className = 'game-message';
        guessInput.value = '';
        guessInput.focus();
        return;
    }

    /* Decrease attempts */
    attemptsLeft--;
    attemptsLeftDisplay.textContent = attemptsLeft;

    /* Check guess */
    let result = '';

    if (guess === targetNumber) {
        result = 'correct';
        const attemptsMade = maxAttempts - attemptsLeft;

        /* Update score */
        const newPoints = 100 + (attemptsLeft * 10);
        gameScore += newPoints;
        scoreDisplay.textContent = `Score: ${gameScore}`;

        /* End game - player won */
        endGame(true, attemptsMade);
    } else if (attemptsLeft === 0) {
        /* End game - player lost */
        result = guess < targetNumber ? 'low' : 'high';
        endGame(false, maxAttempts);
    } else if (guess < targetNumber) {
        result = 'low';
        gameMessage.textContent = 'Too low!';
        gameMessage.className = 'game-message result-low';
    } else {
        result = 'high';
        gameMessage.textContent = 'Too high!';
        gameMessage.className = 'game-message result-high';
    }

    /* Add to history */
    const guessNumber = maxAttempts - attemptsLeft;
    const historyItem = {
        guessNumber: guessNumber,
        guess: guess,
        result: result
    };

    guessHistory.unshift(historyItem);

    /* Update display */
    updateGuessDisplay(guess);
    updateGuessHistory();

    /* Clear input */
    guessInput.value = '';
    guessInput.focus();
}

/* Update guess display */
function updateGuessDisplay(guess) {
    const guessStr = guess.toString().padStart(3, '0');
    hundreds.textContent = guessStr[0];
    tens.textContent = guessStr[1];
    ones.textContent = guessStr[2];
}

/* Update guess history display */
function updateGuessHistory() {
    if (guessHistory.length === 0) {
        guessHistoryList.innerHTML = '<li class="empty-history">No guesses yet</li>';
        return;
    }
    
    guessHistoryList.innerHTML = '';
    
    guessHistory.forEach(item => {
        const li = document.createElement('li');
        
        const guessText = document.createElement('span');
        guessText.textContent = `Guess #${item.guessNumber}: ${item.guess}`;
        
        const resultText = document.createElement('span');
        resultText.className = `result-${item.result}`;
        resultText.textContent = getResultText(item.result);
        
        li.appendChild(guessText);
        li.appendChild(resultText);
        guessHistoryList.appendChild(li);
    });
}

/* Get readable result text */
function getResultText(result) {
    switch (result) {
        case 'correct': return 'Correct!';
        case 'low': return 'Too low!';
        case 'high': return 'Too high!';
        default: return 'Unknown';
    }
}

/* End game */
function endGame(won, attemptsMade) {
    gameActive = false;
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    
    if (won) {
        gameMessage.textContent = 'Correct!';
        gameMessage.className = 'game-message result-correct';
    } else {
        gameMessage.textContent = `Game over! The number was ${targetNumber}.`;
        gameMessage.className = 'game-message';
    }
    
    showResultModal(won, attemptsMade);
}

function showResultModal(won, attemptsMade) {
    resultTitle.textContent = won ? 'Congratulations!' : 'Game Over!';
    
    if (won) {
        resultMessage.textContent = `You guessed the number ${targetNumber} in ${attemptsMade} attempts!`;
    } else {
        resultMessage.textContent = `The number was ${targetNumber}. Better luck next time!`;
    }
    
    resultModal.classList.add('active');
}

function hideResultModal() {
    resultModal.classList.remove('active');
    if (activeTab === 'game') {
        guessInput.focus();
    }
}

/* Initialize game when DOM is loaded */
document.addEventListener('DOMContentLoaded', initGame);