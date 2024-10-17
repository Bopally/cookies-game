class Player {
  constructor() {
    this.width = 60;
    this.height = 60;
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
      this.updateShieldIndicator();

      setTimeout(() => {
        this.shieldActive = false;
        this.shieldElement.style.display = "none";

        // Start recharge timer
        setTimeout(() => {
          this.shieldRecharge = false;
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
