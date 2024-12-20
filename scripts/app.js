// position the startGameButton to the center of the screen'


// create 4 div containers with ids for #startScreen, #howToPlayScreen, #gameScreen, #GameOverScreen
// on initial page load, hide all containers, except for startScreen => create .hide class with display:none
// create a function for startScreen(), howToPlayScreen(), gameScreen() and gameOver()
// #startScreen will contain title, and startButton => create hasGameStarted boolean
// on startButton press, set to true
// startButton => add an id of #start to the button
// create a startButton to be selected => const startButton = document.querySelector(#start)
// startButton will begin the game
// add click event to startButton which will show the #howToPlayScreen by removing the .hide class
// instructions on how to play the game will be displayed on the howToPlayScreen, with a click event on a continueButton once the player has finished reading.
// clicking on the continueButton will remove the .hide class to show the #gameScreen
// call the generateBoard() function


// to generate the board, will need a for index loop
// for(let i = 0; i < gridSize; i++){}
// create divElements with a constant of "div" => const divElements = document.createElement('div')
// add class of "cell" to the individual div elements => divElements.classList.add("cell")
// once the cells have been created, it will need to be appended to the gridContainer
// select the whole container by using => const gridContainer = document.querySelector(.grid)
// => gridContainer.appendChild(cell)
// then push the cell to the empty constant of cells => cells.push(div)


//  14 x 14 grid --> gridRows = 14, gridColumns = 14, gridSize = gridColumns * gridRows


// *** Movement ***
// movable assets will have a class of .alpaca .cows .logs
// when the "WASD" are pressed, it will move the alpaca's position
// "W" button moves the alpaca forward, "A" moves to the left, "D" moves to the right, "S" moves it backwards
// document.addEventListener("keypress", moveAlpaca)
// create a function called moveAlpaca
// create a function to add the alpaca => function addAlpaca(){}
// add a class of alpaca => const alpaca = document.classList.add(".alpaca")
// create a function to remove the alpaca from its current position => function removeAlpaca(){}
// remove the class of alpaca => alpaca.classList.remove("alpaca")

// to add the cows/logs, create an array of 'assets'
// appearance of movement will be adding/removing the class with a short interval using setInterval()
// each asset will decrement/increment an index of the cell
// depending on the direction of movement, ie if moving to the left of the screen, the index will be decremented, and if moving to the right the index will be incremented
// create a function for the assets to move to the left => function moveAssetsLeft()
// create a function for the assets to move to the right => function moveAssetsRight()
// this will be achieved using a for each loop to iterate through the index of cows/logs in the array


// *** Score ***
// create a scoreElement
// when the alpaca successfully lands on a log or on the grass, the player gets 100 points
// the score will increment by 100 points when there are two classes that occupy a cell, ie the log/grass area, and the alpaca
// create a global variable called let score = 0 
// increment the score += 100
// remove class of Alpaca
// for the score to be displayed => scoreElement.innerHTML = score

// *** Lives *** 
// when the alpaca collides with a cow, the number of lives will be decremented
// each time the number of lives decreases, the alpaca's position will be reset to its starting position
// create a variable => let lives = 3
// once the lives reach 0, the gameOver screen will be displayed with a "try again" button
// the try again button will reset the game => moving the alpaca back to its starting position, timer will be reset back to 30 seconds, and score reset back to 0


// *** Timer ***
// the player will have 30 seconds to move the alpaca to the top 'safe' part of the screen
// create a let = timeRemaining = 30
// then create a function that starts the timer on key press
// once the timer reaches 0, the gameOver will be displayed with a "try again" button


// create a resetGame function to reset the timer/score/lives
// which will be called when the ‘try again’ button is pressed




// Constants
const gridRows = 14
const gridColumns = 14
const gridSize = gridRows * gridColumns


// Variables
let cells = []
let score = 0
let timeRemaining = 30
let startPosition = randomStartPosition(12)
let currentPosition = startPosition
let lives = 3
let timeCountdownInterval
let hasGameStarted = false
let closestPositionToTopOfBoard

// Elements

const startScreen = document.getElementById("start-screen")
const gameScreen = document.getElementById("game-screen")
const howToPlayScreen = document.getElementById("how-to-play-screen")
const gameOverScreen = document.getElementById("game-over-screen")
const gameWonScreen = document.getElementById("game-won-screen")
const timesUpScreen = document.getElementById("times-up")
const startButton = document.getElementById("start-button")
const continueButton = document.getElementById("continue-button")
const tryAgainButton = document.getElementById("try-again-button")
const playAgainButton = document.getElementById("play-again-button")
const restartGameButton = document.getElementById("restart-button") 
const timesUpTryAgainButton = document.getElementById("times-up-try-again-button")

const gridContainer = document.querySelector(".grid")
const scoreElement = document.querySelector(".score")
const timerElement = document.querySelector(".timer")
const numberOfLives = document.querySelector(".lives")


// Functions

function randomStartPosition(rowNumber) {
    return Math.floor(Math.random() * gridColumns + (rowNumber * gridColumns))
}

function spawn(asset, startIndex, endIndex, numberOfCows, interval = 500) {
    let cellsTravelledCount = 0
    let classListItem
    if (asset === "cows") {
        classListItem = "cow-right"
    } else {
        classListItem = "logs-right"
    }
    let spawnMovementInterval = setInterval(() => {
        // Remove all cows
        for (let i = 0; i < numberOfCows; i++) {

            let spawnIndex = startIndex + i + cellsTravelledCount - numberOfCows
            cells[spawnIndex].classList.remove(classListItem)
        }

        for (let i = 0; i < numberOfCows; i++) {
            let spawnIndex = startIndex + i + cellsTravelledCount

            if (spawnIndex - i > endIndex) {
                clearInterval(spawnMovementInterval);
                spawn(asset, startIndex, endIndex, numberOfCows)
                return
            }
            if (spawnIndex > endIndex) {
                continue
            }
            cells[spawnIndex].classList.add(classListItem)

            removeLives(spawnIndex)
        }
        cellsTravelledCount++
    }, interval)
}


function increaseScore(cellIndex) {
    if (cells[cellIndex].classList.contains("alpaca") &&
        cells[cellIndex].classList.contains("logs-right")) {
        score += 100
        scoreElement.innerHTML = `Score: ${score}`
    }
}


function removeLives(cellIndex) {
    if (cells[cellIndex].classList.contains("alpaca") &&
        cells[cellIndex].classList.contains("cow-right")) {

        lives -= 1
        numberOfLives.innerHTML = `Lives: ${lives}`
        if (lives === 0) {
            gameOver()
        }
        startPosition = randomStartPosition(12)
        removeAlpaca(currentPosition)
        addAlpaca(startPosition)
        currentPosition = startPosition
    }
    if (
        cells[cellIndex].classList.contains("alpaca") &&
        cells[cellIndex].classList.contains("water") &&
        !cells[cellIndex].classList.contains("logs-right")
    ) {
        lives -= 1;
        numberOfLives.innerHTML = `Lives: ${lives}`;
        if (lives === 0) {
            gameOver()
            return
        }
        startPosition = randomStartPosition(12)
        removeAlpaca(currentPosition)
        addAlpaca(startPosition)
        currentPosition = startPosition
    }
}


function addAlpaca(position) {
    cells[position].classList.add("alpaca")
}


function removeAlpaca(position) {
    cells[position].classList.remove("alpaca")
}


function moveAlpaca(event) {

    const keyPress = event.code

    if (!hasGameStarted) {
        startTimer()
    }

    removeAlpaca(currentPosition)

    if (keyPress === "KeyW" && gridColumns <= currentPosition - 14) {
        currentPosition -= gridColumns
    } else if (keyPress === "KeyS" && currentPosition + gridColumns <= gridSize - 14) {
        currentPosition += gridColumns
    } else if (keyPress === "KeyA" && currentPosition % gridColumns !== 0) {
        currentPosition--
    } else if (keyPress === "KeyD" && currentPosition % gridColumns !== gridColumns - 1) {
        currentPosition++
    }

    addAlpaca(currentPosition)
    if (closestPositionToTopOfBoard > currentPosition) {
        closestPositionToTopOfBoard = currentPosition
        increaseScore(currentPosition)
    }
        removeLives(currentPosition)

    if (currentPosition >= gridColumns && currentPosition < gridColumns * 2) {
        gameWon()
    }
}


function dropCaca() {
    if (!hasGameStarted) return

    const cacaIndex = currentPosition
    cells[cacaIndex].classList.add("caca")

    setTimeout(() => {
        cells[cacaIndex].classList.remove("caca");
    }, 2000);
}

function startTimer() {
    timeCountdownInterval = setInterval(() => {

        if (!hasGameStarted) {
            clearInterval(timeCountdownInterval)
            return
        }

        timeRemaining -= 1
        timerElement.innerHTML = `Time Remaining: 0:${timeRemaining}`
        if (timeRemaining < 10) {
            timerElement.innerHTML = `Time Remaining: 0:0${timeRemaining}`
        }
        if (timeRemaining <= 0) {
            clearInterval(timeCountdownInterval)
            timesUp()
        }
    }, 1000);

    setTimeout(() => {
        if (hasGameStarted) {
            setInterval(dropCaca, 7000)
        }
    }, 7000)

    hasGameStarted = true
}


function displayInstructions() {
    startScreen.classList.add("hide")
    startScreen.classList.toggle("show")
    howToPlayScreen.classList.remove("hide")
    howToPlayScreen.classList.toggle("show")
}


function playGame() {
    gameScreen.classList.remove("hide")
    howToPlayScreen.classList.add("hide")
    howToPlayScreen.classList.toggle("show")
}


function gameOver() {
    gameOverScreen.classList.toggle("show")
    gameOverScreen.classList.remove("hide")
    gameScreen.classList.add("hide")
    timesUpScreen.classList.add("hide")
    clearInterval(timeCountdownInterval)
    
}

function timesUp() {
    gameOverScreen.classList.add("hide")
    timesUpScreen.classList.remove("hide")
    timesUpScreen.classList.add("show")
    gameScreen.classList.add("hide")
}


function gameWon() {
    hasGameStarted = false
    gameWonScreen.classList.remove("hide")
    gameWonScreen.classList.add("show")
    gameScreen.classList.add("hide")
    clearInterval(timeCountdownInterval)

}


function resetGame() {
    gameOverScreen.classList.add("hide")
    gameOverScreen.classList.remove("show")
    timesUpScreen.classList.add("hide")
    timesUpScreen.classList.remove("show")
    gameScreen.classList.remove("hide")
    gameWonScreen.classList.add("hide")
    gameWonScreen.classList.remove("show")
    startPosition = randomStartPosition(12)
    removeAlpaca(currentPosition)
    addAlpaca(startPosition)
    currentPosition = startPosition
    hasGameStarted = false
    timeRemaining = 30
    timerElement.innerHTML = `Time Remaining: 0:${timeRemaining}`
    clearInterval(timeCountdownInterval)
    score = 0
    scoreElement.innerHTML = `Score: ${score}`
    lives = 3
    numberOfLives.innerHTML = `Lives: ${lives}`

}


function generateBoard() {
    cells = []
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div')
        cell.classList.add("cell")

        const row = Math.floor(i / gridColumns)
        if (row === 0 || row === 13) {
            cell.classList.add("background")
        } else if (row === 12 || 
            row === 10 || 
            row === 7 || 
            row === 5 || 
            row === 3 || 
            row === 1) {
            cell.classList.add("grass")
        } else {
            cell.classList.add("water")
        }
        cell.style.width = `${1400 / gridColumns}%`
        cell.style.height = `${1400 / gridRows}%`
        gridContainer.appendChild(cell)
        cells.push(cell)
    }
    startPosition = randomStartPosition(12)
    removeAlpaca(currentPosition)
    addAlpaca(startPosition)
    currentPosition = startPosition
    closestPositionToTopOfBoard = startPosition
}

generateBoard()

// Events

startButton.addEventListener("click", displayInstructions)
continueButton.addEventListener("click", playGame)
tryAgainButton.addEventListener("click", resetGame)
timesUpTryAgainButton.addEventListener("click", resetGame)
document.addEventListener('keydown', moveAlpaca)
restartGameButton.addEventListener("click", resetGame)



spawn("logs", 28, 41, 4, 150)
spawn("cows", 42, 55, 2, 550)
spawn("logs", 56, 69, 5, 250)
spawn("cows", 70, 83, 3, 800)
spawn("logs", 84, 97, 4, 300)
spawn("cows", 98, 111, 3, 600)
spawn("logs", 112, 125, 4, 250)
spawn("logs", 126, 139, 5, 170)
spawn("cows", 140, 153, 2, 750)
spawn("logs", 154, 167, 5, 250)