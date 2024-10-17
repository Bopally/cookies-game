///Music for Instruction and during the Game///

// Upload the music
const backgroundMusic = new Audio("./audio/play-game.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

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

/// Music for Game Over ///
const gameOverSound = new Audio("./audio/game-over.wav");
gameOverSound.volume = 0.2;

// Function to launch the sound
function playGameOverSound() {
  gameOverSound.currentTime = 0;
  gameOverSound.play();
}

/// Music for Victory ///
const victorySound = new Audio("./audio/victory.wav");
victorySound.volume = 0.2;

// Function to launch the sound
function playVictorySound() {
  victorySound.currentTime = 0;
  victorySound.play();
}

/// Music for Collision & wrong ingredients ///
const collisionSound = new Audio("./audio/collision.mp3");
collisionSound.volume = 1;

// Function to launch the sound
function playCollisionSound() {
  collisionSound.currentTime = 0;
  collisionSound.play();
}

/// Music for good ingredients ///
const collectIngredientSound = new Audio("./audio/collect-ingredients.mp3");
collectIngredientSound.volume = 1;

// Function to launch the sound
function playcollectIngredientSound() {
  collectIngredientSound.currentTime = 0;
  collectIngredientSound.play();
}
