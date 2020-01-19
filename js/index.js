let game, difficulty, customDifficulty;


function newGame() {
    for(let child of document.querySelector("#game").children) {
        document.querySelector("#game").removeChild(child);
    }
    if(game) {
        game.timer.clear();
    }
    game = new Game(document.getElementById("game"));
    difficulty = 3;
    customDifficulty = false;
    game.registerLister(window);
    document.querySelector(".overlay").classList.remove("hidden");
}


function autoSolve() {
    game.autoMode = !game.autoMode;
    if(game.autoMode) {
        document.getElementById("auto-solve").classList.add("active");
    }
    else {
        document.getElementById("auto-solve").classList.remove("active");
    }
    game.autoSolve();
}

function undo() {
    game.undo();
}

function setDifficulty(level, event) {
    difficulty = level;
    document.querySelector(".difficulty-value").innerHTML = difficulty;
    document.querySelectorAll(".difficulty-btn").forEach(function (btn) {
        btn.classList.remove('selected');
    });

    event.target.classList.add('selected');
}

function changeDifficulty(by) {
    if(difficulty === 3 && by === -1) {
        return
    }
    if(difficulty === 7 && by === 1) {
        return
    }
    difficulty += by;
    document.querySelector(".difficulty-value").innerHTML = difficulty;
}

function changeDifficultyMode() {
    customDifficulty = !customDifficulty;
    difficulty = 3;
    document.querySelectorAll(".difficulty-btn").forEach(function (btn) {
        btn.classList.remove('selected');
    });
    if(customDifficulty) {
        document.querySelectorAll(".custom-selector > button").forEach(function (btn) {
            btn.disabled = false;
        });
        document.querySelectorAll(".difficulty-btn").forEach(function (btn) {
            btn.disabled = true;
        });
    }
    else {
        document.querySelectorAll(".custom-selector > button").forEach(function (btn) {
            btn.disabled = true;
        });
        document.querySelectorAll(".difficulty-btn").forEach(function (btn) {
            btn.disabled = false;
        });
    }
    document.querySelector(".difficulty-value").innerHTML = difficulty;
}

function startGame() {
    document.querySelector(".overlay").classList.add('hidden');
    game.start(difficulty);
}

newGame();
