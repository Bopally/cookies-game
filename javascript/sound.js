///Music for Instruction and during the Game

// Upload the music
const backgroundMusic = new Audio("../audio/play-game.mp3");
backgroundMusic.loop = true;

// Fonction to launch the sound
function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
}

// Function to stop the sound
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}
