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


// *** Timer ***
// the player will have 1 minute (60 seconds) to move the alpaca to the top 'safe' part of the screen
// create a let = timeRemaining = 60
// then create a function that starts the timer on key press




// Constants
const gridRows = 14
const gridColumns = 14
const gridSize = gridRows * gridColumns
const cells = []
const startPosition = 174


// Variables
let cowIndex = [45, 46, 47]

let score = 0
let timeRemaining = 30
let currentPosition = startPosition

// Elements

const startScreen = document.getElementById("start-screen")
const gameScreen = document.getElementById("game-screen")
const howToPlayScreen = document.getElementById("how-to-play-screen")

const gridContainer = document.querySelector(".grid")
const startButton = document.getElementById("start-button")
const scoreElement = document.querySelector(".score")
const timerElement = document.querySelector(".timer")
const continueButton = document.getElementById("continue-button")

// Functions


function addLeftFacingCows() {
    setInterval(() => {

        let originalCowIndex = [...cowIndex]

        cowIndex.forEach((position) => {
            console.log(position)
            cells[position].classList.add("cow-left")
        })

        for (let i = 0; i < cowIndex.length; i++) {
            cowIndex[i] -= 1
        }

        setInterval(() => {
            originalCowIndex.forEach((index) => {
                cells[index].classList.remove("cow-left")
            })
        }, 600)
        
    }, 200)

}


function addAlpaca(position) {
    cells[position].classList.add("alpaca")
}

function removeAlpaca(position) {
    cells[position].classList.remove("alpaca")
}

function moveAlpaca(event) {
    const keyPress = event.code

    if (keyPress === "KeyW" && gridColumns <= currentPosition) {
        if (!hasGameStarted) {
            startTimer()
        }
        removeAlpaca(currentPosition)
        currentPosition -= gridColumns
        addAlpaca(currentPosition)
    } else if (keyPress === "KeyS" && currentPosition + gridColumns <= gridSize - 1) {
        removeAlpaca(currentPosition)
        currentPosition += gridColumns
        addAlpaca(currentPosition)
    } else if (keyPress === "KeyA" && currentPosition % gridColumns !== 0) {
        removeAlpaca(currentPosition)
        currentPosition--
        addAlpaca(currentPosition)
    } else if (keyPress === "KeyD" && currentPosition % gridColumns !== gridColumns - 1) {
        removeAlpaca(currentPosition)
        currentPosition++
        addAlpaca(currentPosition)

    }
}

let timeCountdownInterval
let hasGameStarted = false
function startTimer() {
    timeCountdownInterval = setInterval(() => {
        timeRemaining -= 1
        timerElement.innerHTML = `Time Remaining: 0:${(timeRemaining)}`
        if (timeRemaining < 10) {
            timerElement.innerHTML = `Time Remaining: 0:0${timeRemaining}`
        }
        if (timeRemaining <= 0) {
            clearInterval(timeCountdownInterval)
        }
    }, 1000);
    hasGameStarted = true
}

function displayInstructions() {
    startScreen.classList.add("hide")
    startScreen.classList.remove("show")
    howToPlayScreen.classList.remove("hide")
}

function playGame() {
    howToPlayScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    console.log("playing game")
}

function generateBoard() {
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div')
        cell.classList.add("cell")

        const row = Math.floor(i / gridColumns)
        if (row === 0 || row === 13) {
            cell.classList.add("background")
        } else if (row % 2 === 0) {
            cell.classList.add("water")
        } else {
            cell.classList.add("grass")
        }
        cell.innerHTML = i
        cell.style.width = `${1400 / gridColumns}%`
        cell.style.height = `${1400 / gridRows}%`
        gridContainer.appendChild(cell)
        cells.push(cell)
    }

    addAlpaca(startPosition)
}

generateBoard()
addLeftFacingCows(cowIndex)

// Events

startButton.addEventListener("click", displayInstructions)
continueButton.addEventListener("click", playGame)
document.addEventListener('keydown', moveAlpaca)