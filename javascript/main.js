let player;
let timeLeft;
let lifeCounter;

const obstacleArr = [];
const ingredientArr = [];

let instructionsMessage;
let startGameButton;
let gameOverMessage;
let victoryMessage;

let countdownInterval;
let gameLoopInterval;
let ingredientInterval;
let obstacleInterval;

// Function Countdown Timer
function createCountdownInterval() {
  const timeCounterElement = document.getElementById("timer-counter");
  return setInterval(() => {
    timeLeft--;
    timeCounterElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      gameOverMessage.style.display = "block";
      clearIntervals();
    }
  }, 1000);
}

function createObstaclesInterval() {
  // Obstacle: Interval
  return setInterval(() => {
    const newObstacle = new Obstacle(board);
    obstacleArr.push(newObstacle);
  }, 500);
}

function createIngredientsInterval() {
  // Ingredients : Interval
  return setInterval(() => {
    const newIngredient = new Ingredient(board);
    ingredientArr.push(newIngredient);
  }, 1000);
}

function createGameLoopInterval() {
  return setInterval(() => {
    obstacleArr.forEach((obstacle, index) => {
      obstacle.moveDown();

      // Check for collision
      if (!player.shieldActive && isColliding(player, obstacle)) {
        lifeCounter--;
        updateHearts(lifeCounter); // update our lifes counter
        obstacle.domElement.remove();
        obstacleArr.splice(index, 1);
        playCollisionSound();

        if (lifeCounter === 0) {
          gameOverMessage.style.display = "block";
          clearIntervals();
          stopBackgroundMusic();
          playGameOverSound();
        }
      }
      if (obstacle.positionY <= -50) {
        obstacle.domElement.remove();
        return;
      }
    });

    // Ingredients collected: update the recipe
    ingredientArr.forEach((ingredient, index) => {
      ingredient.moveDown();

      if (isColliding(player, ingredient)) {
        ingredient.domElement.remove();
        ingredientArr.splice(index, 1);

        // Check if the ingredient is needed
        if (collectedIngredients[ingredient.type] < recipe[ingredient.type]) {
          collectedIngredients[ingredient.type]++;
          updateRecipeDisplay();
          playcollectIngredientSound();
        } else {
          // If the ingredient is not needed lose one life
          lifeCounter--;
          updateHearts(lifeCounter); // update our lifes counter
          playCollisionSound();
        }

        if (lifeCounter === 0) {
          gameOverMessage.style.display = "block";
          clearIntervals();
        }

        if (isRecipeComplete()) {
          victoryMessage.style.display = "block";
          clearIntervals();
          stopBackgroundMusic();
          playVictorySound();
        }
      }
      if (ingredient.positionY <= -50) {
        ingredient.domElement.remove();
        ingredientArr.splice(index, 1);
      }
    });
  }, 40);
}

// Function to Clear all Intervals
function clearIntervals() {
  clearInterval(obstacleInterval);
  clearInterval(ingredientInterval);
  clearInterval(gameLoopInterval);
  clearInterval(countdownInterval);
}

// Button Start again
function resetGame() {
  gameOverMessage.style.display = "none";
  victoryMessage.style.display = "none";

  obstacleArr.forEach((obstacle, index) => {
    obstacle.domElement.remove();
  });
  obstacleArr.length = 0;

  ingredientArr.forEach((ingredient, index) => {
    ingredient.domElement.remove();
  });
  ingredientArr.length = 0;

  for (let ingredient in collectedIngredients) {
    collectedIngredients[ingredient] = 0;
  }

  // Clear all intervals, remove all dom elements
  player.domElement.remove();
  player = null;

  clearIntervals();
  startGame();
  playBackgroundMusic();
}

// Function to start the Cookie Game
function startGame() {
  playBackgroundMusic();
  if (player) {
    player.domElement.remove();
  }

  player = new Player();

  timeLeft = 40;
  lifeCounter = 3;

  const lifeCounterElement = document.getElementById("life-counter");
  updateHearts(lifeCounter);

  const timeCounterElement = document.getElementById("timer-counter");
  if (!timeCounterElement) {
    return;
  }
  timeCounterElement.textContent = timeLeft;

  //const startAgainButton = document.getElementById("start-again-button");

  gameOverMessage.style.display = "none";
  victoryMessage.style.display = "none";
  updateRecipeDisplay();

  countdownInterval = createCountdownInterval();
  gameLoopInterval = createGameLoopInterval();
  ingredientInterval = createIngredientsInterval();
  obstacleInterval = createObstaclesInterval();

  document.querySelectorAll(".start-again-button").forEach((button) => {
    button.onclick = () => resetGame();
  });
}

// Introduction & Start the Game
document.addEventListener("DOMContentLoaded", () => {
  instructionsMessage = document.getElementById("instructions-message");
  startGameButton = document.getElementById("start-game-button");
  gameOverMessage = document.getElementById("game-over-message");
  victoryMessage = document.getElementById("victory-message");

  // Display instructions initially
  instructionsMessage.style.display = "block";

  // Set up event listener for the "Start Game" button
  startGameButton.onclick = function () {
    instructionsMessage.style.display = "none";
    startGame();
  };
});

// Function Life Counter
function updateHearts(lifeCounter) {
  const heartsContainer = document.getElementById("hearts");
  if (!heartsContainer) {
    return;
  }
  heartsContainer.innerHTML = ""; // Clear existing hearts

  for (let i = 0; i < lifeCounter; i++) {
    const heart = document.createElement("img");
    heart.src = "./Images/heart.png";
    heart.alt = "Life";
    heartsContainer.appendChild(heart);
  }
}

// Initialisation of game
document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("start-game-button");
  const instructionsMessage = document.getElementById("instructions-message");

  startGameButton.onclick = function () {
    instructionsMessage.style.display = "none";
    startGame();
  };
});
