'use strict'

const WALL = '⬛'
const FOOD = '◽'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPERFOOD = '🍩'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var cherryInterval
var onSuperFood = false

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    // foodCountFunc()
    gGame.isOn = true
    cherryInterval = setInterval(createCherry, 15000)
}

function createCherry() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }

    var randomCell = emptyCells[getRandomIntInclusive(0, emptyCells.length)]
    
    gBoard[randomCell.i][randomCell.j] = CHERRY
    renderCell({ i: randomCell.i, j: randomCell.j }, CHERRY)
}

function foodCount() {
    var foodCount = 0
    for (var i = 0; i < gBoard.length ; i++) {
            for (var j = 0; j < gBoard[i].length ; j++) {
                if (gBoard[i][j] === FOOD) foodCount ++
            }
        }
        return foodCount
}

function superMode() {
    document.querySelector('h3').innerText = 'Seper Mode Is ON!'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[1][board.length-2]= board[board.length-2][board.length-2]= board[board.length-2][1] = SUPERFOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
    console.log(gGame.score)
    console.log(foodCount)
}

// function winGame() {
//     clearInterval(gIntervalGhosts)
//     clearInterval(cherryInterval)
//     gGame.isOn = false
//     document.querySelector('h2').innerText = 'You Win!'
//     var button = document.querySelector('.winner')
//     button.style.display = 'block'
// }

function gameOver(win) {
    if(win){
        document.querySelector('.winner').style.display = 'block'
        document.querySelector('h2').innerText = 'You Win!'
        console.log('win')
    } 
    else {
        renderCell(gPacman.location, '💀')
        document.querySelector('.gameOver')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    gGame.isOn = false
    var button = document.querySelector('.gameOver')
    button.style.display = 'block' 
    }
}

function onRestart() {
    gPacman.isSuper = false 
    gId = 1
    document.querySelector('.gameOver').style.display = 'none'
    document.querySelector('.winner').style.display = 'none'
    gGhosts = []
    gGame.score = 0
    document.querySelector('h2').innerHTML = 'Score: <span>0 </span>'
   
    onInit()
}