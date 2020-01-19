function Game(container) {
    this.difficulty = 3;
    this.container = container;
    this.moves = [];
    this.board = new Board(this);
    this.isAnimationOn = true;
    this.timer = new Timer(document.getElementById("timer"));
    this.moveCountHolder = document.getElementById("moves");
    this.initialMoveCount = 0;
    this.autoMode = false;
    this.isUndoing = false;
    this.isStarted = false;
}

Game.prototype.toggleAnimation = function (animate) {
    this.isAnimationOn = animate;
    for (let i = 0; i < this.board.cells.length; i++) {
        for (let j = 0; j < this.board.cells.length; j++) {
            this.board.cells[i][j].element.style.transitionDuration = (animate ? 0.3 : 0) + 's';
        }
    }
};

Game.prototype.addMove = function (move) {
    if(!this.isStarted) return;
    if(!this.autoMode && !this.isUndoing) {
        this.moves.push(move);
        if (this.isAnimationOn) {
            this.moveCountHolder.innerHTML = this.moves.length - this.initialMoveCount + " moves";
        }
    }
};

Game.prototype.randomMove = function (i, prev) {
    this.toggleAnimation(false);
    let choice = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"][Math.floor(Math.random() * 4)];
    let board = this.board;
    let self = this;
    switch (choice) {
        case "ArrowUp":
            if (prev !== "ArrowDown") {
                board.moveUp(false);
            } else {
                self.randomMove(i, prev);
                return;
            }
            break;
        case "ArrowDown":
            if (prev !== "ArrowUp") {
                board.moveDown(false);
            } else {
                self.randomMove(i, prev);
                return;
            }
            break;
        case "ArrowLeft":
            if (prev !== "ArrowRight") {
                board.moveLeft(false);
            } else {
                self.randomMove(i, prev);
                return;
            }
            break;
        case "ArrowRight":
            if (prev !== "ArrowLeft") {
                board.moveRight(false);
            } else {
                self.randomMove(i, prev);
                return;
            }
            break;
    }
    if (i < this.board.size * this.board.size) {
        setTimeout(function () {
            self.randomMove(i + 1, choice);
        }, this.isAnimationOn ? 300 : 0);
    } else {
        this.toggleAnimation(true);
    }
};

Game.prototype.autoSolve = function (i) {
    if(!this.isStarted) return;
    if (!this.autoMode) return;
    let board = this.board;
    if (i === undefined) {
        i = this.moves.length - 1;
    }
    switch (this.moves[i]) {
        case "down":
            board.moveUp(true);
            break;
        case "up":
            board.moveDown(true);
            break;
        case "right":
            board.moveLeft(true);
            break;
        case "left":
            board.moveRight(true);
            break;
    }
    this.moves.pop();

    if (i > 0) {
        let self = this;
        setTimeout(function () {
            self.autoSolve(i - 1);
        }, 300);
    }
};

Game.prototype.registerLister = function (window) {
    let board = this.board;
    let self = this;
    window.onkeyup = function (event) {
        if(!self.isStarted) return;
        switch (event.key) {
            case "ArrowUp":
                board.moveUp(true);
                break;
            case "ArrowDown":
                board.moveDown(true);
                break;
            case "ArrowLeft":
                board.moveLeft(true);
                break;
            case "ArrowRight":
                board.moveRight(true);
                break;
        }
    };
};

Game.prototype.undo = function() {
    if(!this.isStarted) return;
    this.isUndoing = true;
    let board = this.board;
    switch (this.moves.pop()) {
        case "down":
            board.moveUp(true);
            break;
        case "up":
            board.moveDown(true);
            break;
        case "right":
            board.moveLeft(true);
            break;
        case "left":
            board.moveRight(true);
            break;
    }
    this.isUndoing = false;
};

Game.prototype.start = function (difficulty) {
    this.board.setupView(difficulty);
    this.randomMove(0);
    this.timer.start();
    this.isStarted = true;
    this.initialMoveCount = this.moves.length;
};
