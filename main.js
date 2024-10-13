class Player {
  constructor() {
    this.width = 10;
    this.height = 5;
    this.positionX = 20;
    this.positionY = 0;
    this.domElement = null;

    this.createDomElement();
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
}

//Event Listener
document.addEventListener("DOMContentLoaded", () => {
  const player = new Player();
});
