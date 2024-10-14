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
