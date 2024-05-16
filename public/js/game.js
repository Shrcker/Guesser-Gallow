async function makeGuess(letter) {
    const response = await fetch('/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter })
    });
    const gameState = await response.json();
    updateGame(gameState);
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