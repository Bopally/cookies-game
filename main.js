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

//Event Listener for our Dom Content
document.addEventListener("DOMContentLoaded", () => {
  const player = new Player();
});

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

// Function to start the Cookie Game
function startGame() {
  const board = document.getElementById("board");
  const player = new Player();
  const obstacleArr = [];

  // Initialization of Counter's life
  let lifeCounter = 3;

  const lifeCounterElement = document.getElementById("life-counter");
  lifeCounterElement.textContent = `Lifes : ${lifeCounter}`;

  setInterval(() => {
    const newObstacle = new Obstacle(board);
    obstacleArr.push(newObstacle);
  }, 3000);

  setInterval(() => {
    obstacleArr.forEach((obstacle, index) => {
      obstacle.moveDown();

      // Check for collision
      if (isColliding(player, obstacle)) {
        console.log("Collision detected!");
        lifeCounter--;
        obstacleArr.splice(index, 1);
        obstacle.domElement.remove();

        lifeCounterElement.textContent = `Life : ${lifeCounter}`;

        if (lifeCounter === 0) {
          console.log("Game Over");
        }
      }
      if (obstacle.positionY <= -50) {
        obstacle.domElement.remove();
      }
    });
  }, 40);
}

document.addEventListener("DOMContentLoaded", startGame);
