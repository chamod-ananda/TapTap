let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;


window.onload = function() {
    setGame();
}

document.getElementById("restartBtn").addEventListener("click", function() {
    setGame();
});

function setGame() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("score").innerText = "0";
    document.getElementById("restartBtn").style.display = "none";

    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // clear any existing intervals first
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
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

    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "Game Over! Final Score: " + score.toString();
        gameOver = true;
        document.getElementById("restartBtn").style.display = "inline-block";
    }
}