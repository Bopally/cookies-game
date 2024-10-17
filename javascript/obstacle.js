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
    (
      player.positionX > obstacle.positionX + obstacle.width ||
      player.positionX + player.width < obstacle.positionX ||
      player.positionY > obstacle.positionY + obstacle.height ||
      player.positionY + player.height - 4 < obstacle.positionY
    ) // Collision is more realistic, with -4 the gap between player and obstacle decrease
  );
}
