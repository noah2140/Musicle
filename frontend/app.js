document.addEventListener('DOMContentLoaded', () => {
    const promptContainer = document.getElementById('prompt-container');
    const audioPlayer = document.getElementById('audio-player');
    const input = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-guess');
    const resultContainer = document.getElementById('result');

    fetch('http://localhost:5000/api/game/puzzle')
        .then(response => response.json())
        .then(data => {
            const puzzle = data.puzzle;
            promptContainer.textContent = puzzle.prompt;
            audioPlayer.src = `http://localhost:5000/audio/${puzzle.audio}`;

            submitButton.addEventListener('click', () => {
                const guess = input.value;
                if (guess.toLowerCase() === puzzle.answer.toLowerCase()) {
                    resultContainer.textContent = 'Correct!';
                } else {
                    resultContainer.textContent = 'Try again!';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching puzzle:', error);
        });
});
