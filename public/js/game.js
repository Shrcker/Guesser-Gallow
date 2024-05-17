document.addEventListener('DOMContentLoaded', async () => {
    // Fetch the random word from the server's API endpoint
    const response = await fetch('/api/randomWord');
    const wordData = await response.json();

    let gameState = {
        wordToGuess: wordData.split(''), // Split the word into an array of letters
        guessedLetters: [],
        incorrectGuesses: 0,
        maxIncorrectGuesses: 6
    };

    updateGame(gameState);

    // Bind event listeners to buttons
    const buttons = document.querySelectorAll('#letters-to-choose button');
    buttons.forEach(button => {
        button.addEventListener('click', () => makeGuess(button.textContent, gameState));
    });
});

function makeGuess(letter, gameState) {
    if (!gameState.guessedLetters.includes(letter)) {
        gameState.guessedLetters.push(letter);
        if (!gameState.wordToGuess.includes(letter)) {
            gameState.incorrectGuesses++;
        }
        updateGame(gameState);
    }
}

function updateGame(gameState) {
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