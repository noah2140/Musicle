document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("playButton");
    const audio = document.getElementById("audio");

    playButton.addEventListener("click", function() {
        audio.play();
    });
});