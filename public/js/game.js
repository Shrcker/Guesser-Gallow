document.addEventListener('DOMContentLoaded', async () => {
    let gameState = await initializeGame();

    // Select the input field for guessing letters
    const input = document.getElementById('letter-guess');

    // Add event listener for input field
    input.addEventListener('keydown', async function(event) {
        if (event.key === 'Enter') {
            const guessedLetter = event.target.value.toLowerCase(); // Get the guessed letter from the input field
            input.value = ''; // Clear the input field after getting the guess
            // Call your function to handle the guess
            await makeGuess(guessedLetter, gameState);
        }
    });
});

async function initializeGame() {
    const response = await fetch('/api/randomWord');
    const wordData = await response.json();
    let gameState = {
        wordToGuess: wordData.split(''), // Split the word into an array of letters
        guessedLetters: [],
        incorrectGuesses: 0,
        maxIncorrectGuesses: 6,
        gameOver: false,
        score: 0
    };
    updateGame(gameState);
    return gameState;
}

async function fetchNewWord() {
    const response = await fetch('/api/randomWord');
    const wordData = await response.json();
    return wordData.split('');
}


async function makeGuess(letter, gameState) {
    if (gameState.gameOver) {
        return;
    }

    if (!gameState.guessedLetters.includes(letter)) {
        gameState.guessedLetters.push(letter);
        if (!gameState.wordToGuess.includes(letter)) {
            gameState.incorrectGuesses++;
            if (gameState.incorrectGuesses >= gameState.maxIncorrectGuesses) {
                gameState.gameOver = true;
                alert('Game Over! The word was ' + gameState.wordToGuess.join(''));
                return;
            }
        } else {
            if (gameState.wordToGuess.every(l => gameState.guessedLetters.includes(l))) {
                gameState.score++;
                alert('You guessed the word! Your score is ' + gameState.score);
                gameState.wordToGuess = await fetchNewWord();
                gameState.guessedLetters = [];
                gameState.incorrectGuesses = 0;
            }
        }
        updateGame(gameState);
    }
}

function updateGame(gameState) {
    const wordToGuessElement = document.getElementById('word-to-guess');
    wordToGuessElement.innerHTML = ''; // Clear previous content

    gameState.wordToGuess.forEach(letter => {
        const span = document.createElement('span');
        span.classList.add('letter'); // Add a class for styling
        span.textContent = gameState.guessedLetters.includes(letter) ? letter : '_';
        wordToGuessElement.appendChild(span);
    });

    // Update the hangman display based on incorrect guesses
    document.querySelector('.head').classList.toggle('hidden', gameState.incorrectGuesses < 1);
    document.querySelector('.body').classList.toggle('hidden', gameState.incorrectGuesses < 2);
    document.querySelector('.left-arm').classList.toggle('hidden', gameState.incorrectGuesses < 3);
    document.querySelector('.right-arm').classList.toggle('hidden', gameState.incorrectGuesses < 4);
    document.querySelector('.left-leg').classList.toggle('hidden', gameState.incorrectGuesses < 5);
    document.querySelector('.right-leg').classList.toggle('hidden', gameState.incorrectGuesses < 6);

    document.getElementById('incorrect-guesses').textContent = `Incorrect Guesses: ${gameState.incorrectGuesses}`;

     // Update the guessed letters display
     const guessedLettersElement = document.getElementById('guessed-letters');
     guessedLettersElement.innerHTML = `Guessed Letters: ${gameState.guessedLetters.join(', ')}`;

      // Update the score display
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${gameState.score}`;
 }