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
  constructor() {
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

function startGame() {
  const board = document.getElementById("board");
  const obstacleArr = [];

  setInterval(() => {
    const newObstacle = new Obstacle(board);
    obstacleArr.push(newObstacle);
    console.log("new obstacle");
  }, 3000);

  setInterval(() => {
    obstacleArr.forEach((obstacle, index) => {
      obstacle.moveDown();
      if (obstacle.positionY <= -20) {
        obstacle.domElement.remove();
      }
    });
  }, 40);
}

document.addEventListener("DOMContentLoaded", startGame);
