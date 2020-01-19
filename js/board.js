function Board(game) {
    this.game = game;
    this.boardRoot = document.createElement("div");
    this.size = 3;
    this.cells = [];
    this.emptyCell = null;
    this.translateAmount = null;

    this.game.addMove(0, 0);

}


Board.prototype.setupView = function (difficulty) {
    this.size = difficulty;
    this.boardRoot.classList.add('boardRoot');
    let spacing = 2;
    let cellSize = (100 - spacing) / this.size - spacing;

    let values = [];
    for (let i = 0; i < this.size; i++) {
        values.push([]);
        for (let j = 0; j < this.size; j++) {
            values[i].push(j * this.size + i + 1);
        }
    }

    // let emptyCoords = shuffle(values, this.game);
    let emptyCoords = {
        x: this.size - 1,
        y: this.size - 1
    };

    for (let i = 0; i < this.size; i++) {
        let temp = [];
        for (let j = 0; j < this.size; j++) {
            let elem = document.createElement("div");
            let cell = {
                element: elem,
                x: i,
                y: j,
                translateX: 0,
                translateY: 0,
                value: values[i][j]
            };
            temp.push(cell);
            elem.classList.add("cell");
            elem.style.left = i * cellSize + (i + 1) * spacing + "%";
            elem.style.top = j * cellSize + (j + 1) * spacing + "%";
            elem.style.width = cellSize + "%";
            elem.style.height = cellSize + "%";
            elem.innerHTML = cell.value;
            this.boardRoot.appendChild(elem);
        }
        this.cells.push(temp);
    }
    this.emptyCell = this.cells[emptyCoords.x][emptyCoords.y];
    this.emptyCell.element.innerHTML = "";
    this.emptyCell.element.classList.add('empty');
    this.emptyCell.value = -1;
    this.game.container.appendChild(this.boardRoot);
};

Board.prototype.moveUp = function (animate) {
    let emptyCell = this.emptyCell;
    let translateAmount = parseFloat(getStyle(emptyCell.element, "width")) + parseFloat(getStyle(this.boardRoot, "width")) * 0.02;

    if (emptyCell.y > 0) {
        let upperCell = this.cells[emptyCell.x][emptyCell.y - 1];
        emptyCell.translateY -= translateAmount;
        upperCell.translateY += translateAmount;

        this.cells[emptyCell.x][emptyCell.y] = this.cells[emptyCell.x][emptyCell.y - 1];
        this.cells[emptyCell.x][emptyCell.y - 1] = emptyCell;

        emptyCell.element.style.transform = "translateX(" + emptyCell.translateX + "px) translateY(" + emptyCell.translateY + "px)";
        upperCell.element.style.transform = "translateX(" + upperCell.translateX + "px) translateY(" + upperCell.translateY + "px)";

        emptyCell.y--;
        upperCell.y++;

        this.game.addMove("up");
    }
};

Board.prototype.moveDown = function (animate) {
    let emptyCell = this.emptyCell;
    let translateAmount = parseFloat(getStyle(emptyCell.element, "width")) + parseFloat(getStyle(this.boardRoot, "width")) * 0.02;

    if (emptyCell.y < this.size - 1) {
        let lowerCell = this.cells[emptyCell.x][emptyCell.y + 1];

        emptyCell.translateY += translateAmount;
        lowerCell.translateY -= translateAmount;

        this.cells[emptyCell.x][emptyCell.y] = this.cells[emptyCell.x][emptyCell.y + 1];
        this.cells[emptyCell.x][emptyCell.y + 1] = emptyCell;

        emptyCell.element.style.transform = "translateX(" + emptyCell.translateX + "px) translateY(" + emptyCell.translateY + "px)";
        lowerCell.element.style.transform = "translateX(" + lowerCell.translateX + "px) translateY(" + lowerCell.translateY + "px)";

        emptyCell.y++;
        lowerCell.y--;

        this.game.addMove("down");
    }
};

Board.prototype.moveLeft = function (animate) {
    let emptyCell = this.emptyCell;
    let translateAmount = parseFloat(getStyle(emptyCell.element, "width")) + parseFloat(getStyle(this.boardRoot, "width")) * 0.02;

    if (emptyCell.x > 0) {
        let leftCell = this.cells[emptyCell.x - 1][emptyCell.y];

        emptyCell.translateX -= translateAmount;
        leftCell.translateX += translateAmount;

        this.cells[emptyCell.x][emptyCell.y] = this.cells[emptyCell.x - 1][emptyCell.y];
        this.cells[emptyCell.x - 1][emptyCell.y] = emptyCell;

        emptyCell.element.style.transform = "translateX(" + emptyCell.translateX + "px) translateY(" + emptyCell.translateY + "px)";
        leftCell.element.style.transform = "translateX(" + leftCell.translateX + "px) translateY(" + leftCell.translateY + "px)";

        emptyCell.x--;
        leftCell.x++;

        this.game.addMove("left");
    }
};

Board.prototype.moveRight = function (animate) {
    let emptyCell = this.emptyCell;
    let translateAmount = parseFloat(getStyle(emptyCell.element, "width")) + parseFloat(getStyle(this.boardRoot, "width")) * 0.02;

    if (emptyCell.x < this.size - 1) {
        let rightCell = this.cells[emptyCell.x + 1][emptyCell.y];

        emptyCell.translateX += translateAmount;
        rightCell.translateX -= translateAmount;

        this.cells[emptyCell.x][emptyCell.y] = this.cells[emptyCell.x + 1][emptyCell.y];
        this.cells[emptyCell.x + 1][emptyCell.y] = emptyCell;

        emptyCell.element.style.transform = "translateX(" + emptyCell.translateX + "px) translateY(" + emptyCell.translateY + "px)";
        rightCell.element.style.transform = "translateX(" + rightCell.translateX + "px) translateY(" + rightCell.translateY + "px)";

        emptyCell.x++;
        rightCell.x--;

        this.game.addMove("right");
    }
};
