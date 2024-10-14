class Player {
  constructor() {
    this.width = 10;
    this.height = 5;
    this.positionX = 20;
    this.positionY = 0;
    this.domElement = null;

    this.createDomElement();
    this.addKeyboardControls();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //Append the dom
    const board = document.getElementById("board");
    board.appendChild(this.domElement);
  }

  // Movments of Player
  moveRight() {
    if (this.positionX < 100 - this.width) {
      this.positionX++;
      this.domElement.style.left = this.positionX + "vw";
    }
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.domElement.style.left = this.positionX + "vw";
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
