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
  recipeList.innerHTML = "";

  for (let ingredient in recipe) {
    const needed = recipe[ingredient];
    const collected = collectedIngredients[ingredient];

    for (let i = 0; i < needed; i++) {
      const listItem = document.createElement("li");
      listItem.className = "ingredient-recipe";
      const imgElement = document.createElement("img");
      imgElement.src = `./Images/${ingredient}.png`;
      imgElement.alt = ingredient;
      imgElement.className = "ingredient-img";

      if (i < collected) {
        imgElement.classList.add("collected");
      }

      listItem.appendChild(imgElement);
      recipeList.appendChild(listItem);
    }
  }
}

function collectIngredient(ingredient) {
  ingredient.domElement.remove();
  ingredientArr.splice(index, 1);

  if (collectedIngredients[ingredient.type] < recipe[ingredient.type]) {
    collectedIngredients[ingredient.type]++;
    updateRecipeDisplay();
  } else {
    lifeCounter--;
    updateHearts(lifeCounter);
  }

  if (lifeCounter === 0) {
    gameOverMessage.style.display = "block";
    clearIntervals();
  }

  if (isRecipeComplete()) {
    victoryMessage.style.display = "block";
    clearIntervals();
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
