// DOM Elements
const calculatorTab = document.getElementById('calculatorTab');
const gameTab = document.getElementById('gameTab');
const calculatorSection = document.getElementById('calculatorSection');
const gameSection = document.getElementById('gameSection');
const instructionsModal = document.getElementById('instructions-modal');
const calculatorInstructions = document.getElementById('calculator-instructions');
const gameInstructions = document.getElementById('game-instructions');
const closeModalBtn = document.querySelector('.close-modal');
const gotItBtn = document.getElementById('got-it-btn');

// Global variable to track active tab
let activeTab = 'calculator';

// Initialize app
function initApp() {
    // Set up tab navigation
    calculatorTab.addEventListener('click', () => switchTab('calculator'));
    gameTab.addEventListener('click', () => switchTab('game'));
    
    // Set up instructions modal
    closeModalBtn.addEventListener('click', hideInstructionsModal);
    gotItBtn.addEventListener('click', hideInstructionsModal);
    
    // Show instructions on first load
    showInstructionsModal('calculator');
}

// Switch between tabs
function switchTab(tab) {
    activeTab = tab;
    if (tab === 'calculator') {
        calculatorTab.classList.add('active');
        gameTab.classList.remove('active');
        calculatorSection.classList.add('active-section');
        gameSection.classList.remove('active-section');
        showInstructionsModal('calculator');
    } else {
        calculatorTab.classList.remove('active');
        gameTab.classList.add('active');
        calculatorSection.classList.remove('active-section');
        gameSection.classList.add('active-section');
        showInstructionsModal('game');
        // Focus the guess input when switching to game
        document.getElementById('guess-input').focus();
    }
}

// Show instructions modal
function showInstructionsModal(tab) {
    if (tab === 'calculator') {
        calculatorInstructions.style.display = 'block';
        gameInstructions.style.display = 'none';
    } else {
        calculatorInstructions.style.display = 'none';
        gameInstructions.style.display = 'block';
    }
    instructionsModal.classList.add('active');
}

// Hide instructions modal
function hideInstructionsModal() {
    instructionsModal.classList.remove('active');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);