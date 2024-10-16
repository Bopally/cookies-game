let player;
// version
class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.positionX = 0;
    this.positionY = 0;
    this.domElement = null;
    this.shieldElement = null;
    this.shieldElement = null;
    this.shieldActive = false; //shield
    this.shieldRecharge = false; //shield

    this.createDomElement();
    this.addKeyboardControls();
    this.updateShieldIndicator();
  }
  createDomElement() {
    const board = document.getElementById("board");
    this.positionX = (board.offsetWidth - this.width) / 2;

    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.borderRadius = "50%";
    this.domElement.style.position = "absolute"; // set up the player position based on the board

    // Create Shield Element
    this.shieldElement = document.createElement("div");
    this.shieldElement.id = "shield";
    this.shieldElement.style.display = "none";
    this.domElement.appendChild(this.shieldElement);

    //Append the dom
    board.appendChild(this.domElement);
  }

  // Movments of Player
  moveRight() {
    const boardWidth = document.getElementById("board").offsetWidth;
    if (this.positionX + this.width < boardWidth) {
      this.positionX = Math.min(this.positionX + 20, boardWidth - this.width);
      this.domElement.style.left = this.positionX + "px";
    }
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX = Math.max(this.positionX - 20, 0);
      this.domElement.style.left = this.positionX + "px";
    }
  }

  // Activate shield on space bar press, if not recharging
  activateShield() {
    if (!this.shieldRecharge && !this.shieldActive) {
      // Check for space bar and recharge status
      this.shieldActive = true;
      this.shieldElement.style.display = "block";
      this.shieldRecharge = true;
      console.log("Shield activated!");
      this.updateShieldIndicator();

      setTimeout(() => {
        this.shieldActive = false;
        this.shieldElement.style.display = "none";
        console.log("Shield deactivated!");

        // Start recharge timer
        setTimeout(() => {
          this.shieldRecharge = false;
          console.log("Shield recharged!");
          this.updateShieldIndicator();
        }, 10000); // 10 second recharge time
      }, 5000); // Desactivate shield after 5 seconds
    }
  }

  updateShieldIndicator() {
    const shieldIndicator = document.getElementById("shield-indicator");
    const shieldIcon = document.getElementById("shield-icon");
    const shieldText = document.getElementById("shield-text");

    if (this.shieldRecharge) {
      shieldText.textContent = "Shield: Unavailable";
      shieldIndicator.classList.add("unavailable");
    } else {
      shieldText.textContent = "Shield: Available";
      shieldIndicator.classList.remove("unavailable");
    }
  }

  addKeyboardControls() {
    //delete all event listtener
    document.removeEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    if (e.key === "ArrowRight") {
      this.moveRight();
    } else if (e.key === "ArrowLeft") {
      this.moveLeft();
    } else if (e.key === " ") {
      this.activateShield();
    }
  }
}

class Obstacle {
  constructor(board) {
    this.width = 50;
    this.height = 50;
    this.positionX = Math.floor(
      Math.random() * (board.offsetWidth - this.width)
    );
    this.positionY = 750;
    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    const board = document.getElementById("board");

    this.domElement = document.createElement("div");
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.position = "absolute";

    board.appendChild(this.domElement);
  }
  // Movments of Obstacle
  moveDown() {
    this.positionY -= 10;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

// Function to check for collision
function isColliding(player, obstacle) {
  return !(
    player.positionX > obstacle.positionX + obstacle.width ||
    player.positionX + player.width < obstacle.positionX ||
    player.positionY > obstacle.positionY + obstacle.height ||
    player.positionY + player.height < obstacle.positionY
  );
}

// Ingredients & Recipe
const ingredientTypes = ["flour", "milk", "egg", "chocolate"];
const recipe = {
  flour: 1,
  milk: 1,
  egg: 2,
  chocolate: 1,
};
const collectedIngredients = {
  flour: 0,
  milk: 0,
  egg: 0,
  chocolate: 0,
};

class Ingredient {
  constructor(board) {
    this.width = 50;
    this.height = 50;
    this.positionX = Math.floor(
      Math.random() * (board.offsetWidth - this.width)
    );
    this.positionY = board.offsetHeight;
    this.domElement = null;
    this.type =
      ingredientTypes[Math.floor(Math.random() * ingredientTypes.length)];
    //console.log(this.type);
    this.createDomElement();
  }

  createDomElement() {
    const board = document.getElementById("board");

    this.domElement = document.createElement("div");
    this.domElement.className = "ingredient " + this.type;
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.position = "absolute";

    board.appendChild(this.domElement);
  }

  moveDown() {
    this.positionY -= 5;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

// Function to update the recipe display
function updateRecipeDisplay() {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = ""; // Clear the list

  for (let ingredient in recipe) {
    const remaining = recipe[ingredient] - collectedIngredients[ingredient];
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient}: ${Math.max(0, remaining)} left`;
    recipeList.appendChild(listItem);
  }
}

// Function to check the recipe
function isRecipeComplete() {
  for (let ingredient in recipe) {
    if (collectedIngredients[ingredient] < recipe[ingredient]) {
      return false;
    }
  }
  return true;
}

// Introduction & Start the Game
document.addEventListener("DOMContentLoaded", () => {
  const instructionsMessage = document.getElementById("instructions-message");
  const startGameButton = document.getElementById("start-game-button");

  // Display instructions initially
  instructionsMessage.style.display = "block";

  // Set up event listener for the "Start Game" button
  startGameButton.onclick = function () {
    instructionsMessage.style.display = "none";
    startGame();
  };
});

// Function LifeCounter
function updateHearts(lifeCounter) {
  const heartsContainer = document.getElementById("hearts");
  if (!heartsContainer) {
    console.error("Element #hearts not found in the DOM");
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

// Initialisation du jeu

document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("start-game-button");
  const instructionsMessage = document.getElementById("instructions-message");

  startGameButton.onclick = function () {
    instructionsMessage.style.display = "none";
    startGame();
  };
});
// Function to start the Cookie Game
function startGame() {
  const board = document.getElementById("board");
  if (player) {
    player.domElement.remove();
  }

  player = new Player();
  //let player = new Player();
  const obstacleArr = [];
  const ingredientArr = [];
  let timeLeft = 40;

  // Initialization of the Shield
  let shieldActive = false;

  // Initialization of the Shield recharge status
  let shieldRecharge = false;

  // Initialization of the Counter's life
  let lifeCounter = 3;

  const lifeCounterElement = document.getElementById("life-counter");
  console.log("Starting game, initializing hearts.");
  updateHearts(lifeCounter);

  const timeCounterElement = document.getElementById("timer-counter");
  if (!timeCounterElement) {
    // Vérifie que l'élément existe
    console.error('Element with ID "timer-counter" not found in the DOM');
    return;
  }
  timeCounterElement.textContent = timeLeft;

  const gameOverMessage = document.getElementById("game-over-message");
  const victoryMessage = document.getElementById("victory-message");
  const startAgainButton = document.getElementById("start-again-button");

  gameOverMessage.style.display = "none";
  victoryMessage.style.display = "none";
  updateRecipeDisplay();

  // Countdown timer
  const countdownInterval = setInterval(() => {
    timeLeft--;
    timeCounterElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      console.log("Time's up!");
      gameOverMessage.style.display = "block";
      clearIntervals();
    }
  }, 1000);

  // Obstacle: Interval
  const obstacleInterval = setInterval(() => {
    const newObstacle = new Obstacle(board);
    obstacleArr.push(newObstacle);
  }, 500);

  // Ingredients : Interval
  const ingredientInterval = setInterval(() => {
    const newIngredient = new Ingredient(board);
    ingredientArr.push(newIngredient);
  }, 1000);

  const gameLoopInterval = setInterval(() => {
    obstacleArr.forEach((obstacle, index) => {
      obstacle.moveDown();

      // Check for collision
      if (!player.shieldActive && isColliding(player, obstacle)) {
        console.log("Collision detected!");
        lifeCounter--;
        updateHearts(lifeCounter); // update our lifes counter
        obstacle.domElement.remove();
        obstacleArr.splice(index, 1);

        if (lifeCounter === 0) {
          console.log("Game Over");
          gameOverMessage.style.display = "block";
          clearIntervals();
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
        } else {
          // If the ingredient is not needed lose one life
          console.log(`Unnecessary ingredient collected: ${ingredient.type}`);
          lifeCounter--;
          updateHearts(lifeCounter); // update our lifes counter
        }

        if (lifeCounter === 0) {
          console.log("Game Over");
          gameOverMessage.style.display = "block";
          clearIntervals();
        }

        if (isRecipeComplete()) {
          console.log("Recipe Complete! You win!");
          victoryMessage.style.display = "block";
          clearIntervals();
        }
      }
      if (ingredient.positionY <= -50) {
        ingredient.domElement.remove();
        ingredientArr.splice(index, 1);
      }
    });
  }, 40);

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
  }

  document.querySelectorAll(".start-again-button").forEach((button) => {
    button.onclick = resetGame;
  });
}
