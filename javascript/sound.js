///Music for Instruction and during the Game///

// Upload the music
const backgroundMusic = new Audio("../audio/play-game.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.6;

// Function to launch the sound
function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
}

// Function to stop the sound
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

/// Music for Game Over///
const gameOverSound = new Audio("../audio/game-over.wav");
gameOverSound.volume = 1.5;

// Function to launch the sound
function playGameOverSound() {
  gameOverSound.currentTime = 0;
  gameOverSound.play();
}
