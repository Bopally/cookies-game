class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.positionX = 0;
    this.positionY = 0;
    this.domElement = null;

    this.createDomElement();
    this.addKeyboardControls();
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

  addKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.moveRight();
      } else if (e.key === "ArrowLeft") {
        this.moveLeft();
      }
    });
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
    this.positionY -= 5;
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
    console.log(this.type);
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

// Function to start the Cookie Game
function startGame() {
  const board = document.getElementById("board");
  const player = new Player();
  const obstacleArr = [];
  const ingredientArr = [];

  // Initialization of Counter's life
  let lifeCounter = 3;

  const lifeCounterElement = document.getElementById("life-counter");
  lifeCounterElement.textContent = `Lives : ${lifeCounter}`;

  const gameOverMessage = document.getElementById("game-over-message");
  const victoryMessage = document.getElementById("victory-message");
  const startAgainButton = document.getElementById("start-again-button");

  gameOverMessage.style.display = "none";
  victoryMessage.style.display = "none";
  updateRecipeDisplay();

  // Obstacle: Interval & Loop
  const obstacleInterval = setInterval(() => {
    const newObstacle = new Obstacle(board);
    obstacleArr.push(newObstacle);
  }, 3000);

  const gameLoopInterval = setInterval(() => {
    obstacleArr.forEach((obstacle, index) => {
      obstacle.moveDown();

      // Check for collision
      if (isColliding(player, obstacle)) {
        console.log("Collision detected!");
        lifeCounter--;
        obstacleArr.splice(index, 1);
        obstacle.domElement.remove();

        lifeCounterElement.textContent = `Lives : ${lifeCounter}`;

        if (lifeCounter === 0) {
          console.log("Game Over");
          gameOverMessage.style.display = "block";
          clearInterval(obstacleInterval);
          clearInterval(gameLoopInterval);
          clearInterval(ingredientInterval);
        }
      }
      if (obstacle.positionY <= -50) {
        obstacle.domElement.remove();
      }
    });

    // Ingredients collected: update the recipe
    ingredientArr.forEach((ingredient, index) => {
      ingredient.moveDown();

      if (isColliding(player, ingredient)) {
        collectedIngredients[ingredient.type]++;
        ingredient.domElement.remove();
        ingredientArr.splice(index, 1);

        updateRecipeDisplay();

        if (isRecipeComplete()) {
          console.log("Recipe Complete! You win!");
          victoryMessage.style.display = "block";
          clearInterval(obstacleInterval);
          clearInterval(gameLoopInterval);
          clearInterval(ingredientInterval);
        }
      }
      if (ingredient.positionY <= -50) {
        ingredient.domElement.remove();
      }
    });
  }, 40);

  // Ingredients : Interval
  const ingredientInterval = setInterval(() => {
    const newIngredient = new Ingredient(board);
    ingredientArr.push(newIngredient);
  }, 3000);

  // Button Start again
  function resetGame() {
    gameOverMessage.style.display = "none";
    victoryMessage.style.display = "none";
    lifeCounter = 3;
    lifeCounterElement.textContent = `Lives : ${lifeCounter}`;

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

    player.domElement.remove();
    startGame();
  }

  document.querySelectorAll(".start-again-button").forEach((button) => {
    button.onclick = function () {
      resetGame();
    };
  });
}
document.addEventListener("DOMContentLoaded", startGame);
