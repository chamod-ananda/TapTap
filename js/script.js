let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;


window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return; // stop the game if it's over
    }

    if (currMoleTile) {
        // remove mole from previous tile
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "/assets/images/monty-mole.png";

    // mole randome placing in one tile
    let num = getRandomTile();

    if (currPlantTile && currPlantTile.id === num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return; // stop the game if it's over
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "/assets/images/piranha-plant.png";

    let num = getRandomTile();

    if (currMoleTile && currMoleTile.id === num) {
        return;
    }

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return; // do nothing if the game is over
    }
    
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // update score display
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "Game Over! Final Score: " + score.toString();
        gameOver = true;
    }
}