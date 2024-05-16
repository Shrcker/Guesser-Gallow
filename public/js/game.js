let gameState = {
    wordToGuess: initialWord.split(''),
    guessedLetters: [],
    incorrectGuesses: 0,
    maxIncorrectGuesses: 6
};

document.addEventListener('DOMContentLoaded', () => {
    updateGame();

    // Bind event listeners to buttons
    const buttons = document.querySelectorAll('#letters-to-choose button');
    buttons.forEach(button => {
        button.addEventListener('click', () => makeGuess(button.textContent));
    });
});

async function makeGuess(letter) {
    if (!gameState.guessedLetters.includes(letter)) {
        gameState.guessedLetters.push(letter);
        if (!gameState.wordToGuess.includes(letter)) {
            gameState.incorrectGuesses++;
        }
        updateGame();
    }
}

function updateGame() {
    const wordToGuessElement = document.getElementById('word-to-guess');
    wordToGuessElement.innerHTML = '';
    gameState.wordToGuess.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = gameState.guessedLetters.includes(letter) ? letter : '_';
        wordToGuessElement.appendChild(span);
    });

    document.querySelector('.head').classList.toggle('hidden', gameState.incorrectGuesses < 1);
    document.querySelector('.body').classList.toggle('hidden', gameState.incorrectGuesses < 2);
    document.querySelector('.left-arm').classList.toggle('hidden', gameState.incorrectGuesses < 3);
    document.querySelector('.right-arm').classList.toggle('hidden', gameState.incorrectGuesses < 4);
    document.querySelector('.left-leg').classList.toggle('hidden', gameState.incorrectGuesses < 5);
    document.querySelector('.right-leg').classList.toggle('hidden', gameState.incorrectGuesses < 6);

    document.getElementById('incorrect-guesses').textContent = `Incorrect Guesses: ${gameState.incorrectGuesses}`;
}
