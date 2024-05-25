document.addEventListener("DOMContentLoaded", function() {
    const startDate = new Date('5/25/2024');
    let currentDate = new Date();
    let diffTime = Math.abs(currentDate - startDate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let attempts = 0;
    let puzzle = [];
    let isSolved = false;

    function setDailyPuzzle() {
        let dateStr = "Day" + diffDays + "_";
        for(let i = 1; i <= 6; i++) {
            let audio = new Audio('/AudioFiles/' + dateStr + i + '.mp3');
            puzzle.push(audio);
        }
    }

    const playButton = document.getElementById("playButton");

    playButton.addEventListener("click", function() {
        if (attempts < puzzle.length) {
            puzzle[attempts].play();
        }
    });

    const skipButton = document.getElementById("skipButton");

    skipButton.addEventListener("click", function() {
        attempts++;
        displayAttempts();
    });

    function displayAttempts() {
        let i=0;
        const numbers = document.getElementsByClassName('number');
        while(i<attempts) {
            numbers[i].style.backgroundColor = 'red';
            i++;
        }
        if(isSolved) numbers[i].style.backgroundColor = 'green';
    }

    function saveDailyProgress() {
        const progress = {
            currDate: currentDate,
            attempts: attempts,
            puzzle: puzzle,
            isSolved: isSolved
        };
        localStorage.setItem('dailyProgress', JSON.stringify(progress));
    }

    function loadDailyProgress() {
        const savedProgress = localStorage.getItem('dailyProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            attempts = progress.attempts;
            puzzle = progress.puzzle;
            isSolved = progress.isSolved;
        }
        else {
            setDailyPuzzle();
        }
    }

    function checkAndResetProgress() {
        const savedDateStr = localStorage.getItem('currDate');
        const savedDate = new Date(savedDateStr);
        const currentDateWithoutTime = new Date(currentDate);
        currentDateWithoutTime.setHours(0, 0, 0, 0); 
        if (!savedDate || savedDate.getTime() !== currentDateWithoutTime.getTime()) {
            localStorage.setItem('currDate', currentDateWithoutTime.toDateString());
            localStorage.removeItem('dailyProgress');
            location.reload(); 
        }
    }

    setDailyPuzzle();

});