const $hostoryMoveList = document.querySelector(".history-card-list")

const game = {
    start: true,
    currentMove: 'X',
    bot: {
        active : false
    },
    player: {
        scoreOne: 0,
        scoreTwo: 0
    }
}

function getField(fieldNumber) {
    const $field = document.querySelector(`.scenary-field-${fieldNumber}`)
    return $field
}

function toggleCurrentMove() {
    if(game.currentMove === "X") {
        game.currentMove = "O"
    } else if(game.currentMove === 'O') {
        game.currentMove = "X"
    }
}


function verifyFields(firstdField, secondField, thirdField) {
    const $filedList = document.querySelectorAll(".scenary-field-big")

    const hasWinner = $filedList[firstdField].textContent != '' 
    && $filedList[firstdField].textContent === $filedList[secondField].textContent 
    && $filedList[secondField].textContent === $filedList[thirdField].textContent

    return hasWinner
}

function getWinner() {
    
    if(verifyFields(0, 1, 2)) {
        return game.currentMove
    } else if(verifyFields(3, 4, 5)) {
        return game.currentMove
    } else if(verifyFields(6, 7, 8)) {
        return game.currentMove
    } else if(verifyFields(0, 3, 6)) {
        return game.currentMove
    } else if(verifyFields(1, 4, 7)) {
        return game.currentMove
    } else if(verifyFields(2, 5, 8)) {
        return game.currentMove
    } else if(verifyFields(0, 4, 8)) {
        return game.currentMove
    } else if(verifyFields(2, 4, 6)) {
        return game.currentMove
    }

    return ""
}

function addPlayerScore(winner) {
    if(winner === "X") {
        game.player.scoreOne += 1
    } else if(winner === "O") {
        game.player.scoreTwo += 1
    }
}

function printPlayerScore() {
    const [ $scoreOne, $scoreTwo] = document.querySelectorAll(".score")

    $scoreOne.textContent = game.player.scoreOne.toString().padStart(2, '0')
    $scoreTwo.textContent = game.player.scoreTwo.toString().padStart(2, '0')
}

function resetBoard() {
    const $filedList = document.querySelectorAll(".scenary-field-big")

    for(const field of $filedList) {
        field.textContent = ""
    }
}

function getPlayerName(move) {
    if(move === "X") {
        const $inputPlayerOne = document.querySelector(".player-field-one")
        return $inputPlayerOne.value
    } else if(move === "O") {
        const $inputPlayerTwo = document.querySelector(".player-field-two")
        return $inputPlayerTwo.value
    }
}

function printWinnerName(name) {
    const $playerName = document.querySelector(".score-separetor")
    $playerName.textContent = name
}

function configSwitcher(className, callback) {
    const $switcher = document.querySelector(`.${className}`)

    $switcher.addEventListener("click", () => {
        $switcher.classList.toggle("switcher-active")
        callback()
        console.log(game.bot.active)
    })
}

function botMove() { 
    const move = ramdomNumber(8)

    const field = getField(move)

    const canPlay = draw()

    if(canPlay) return 

    if(field.textContent !== '') {
        return botMove()
    }

    play(field, move)

}

function draw() {
    const $fieldList = document.querySelectorAll(".scenary-field-big")
    let filledFields = 0

    for(const $field of $fieldList) {
        if($field.textContent) filledFields++
    }

    const winner = getWinner()

    if(filledFields === 9 && !winner) {
        const $playerName = document.querySelector(".score-separetor")
        $playerName.textContent = "Empate"
        return true
    }

    return false
}

function play(field, position) {
    if(field.textContent !== "" || game.start == false) return
        const { currentMove } = game
        field.textContent = currentMove

        const winner = getWinner()
        
        if(winner !== "") {
            addPlayerScore(winner)
            printPlayerScore()

            setTimeout(() => {
                resetBoard()
            }, 1000)

            game.start = false

            setTimeout(() => {
                game.start = true
            }, 1000);

            const winnerName = getPlayerName(winner)
            printWinnerName(winnerName)
        }

        const hasDraw = draw()

        if(hasDraw) {
            setTimeout(() => {
                resetBoard()
            }, 1000)
        }

        const currentPlayerName = getPlayerName(game.currentMove)
        console.log(currentPlayerName)

        createHistoryMoveCard(game.currentMove, currentPlayerName, position)
        getWinner()
        toggleCurrentMove()
}


function createHistoryMoveCard(move, player, position) {
    const postionsLebals = [
        "Primeira Quadrado", 
        "Segundo Quadrado",
        "Terceiro Quadrado",
        "Quarto Quadrado",
        "Quinto Quadrado",
        "Sexto Quadrado",
        "Sétimo Quadrado",
        "Oitavo Quadrado",
        "Nono Quadrado"
    ]

    $hostoryMoveList.innerHTML += `
    <li class="history-move-card">
            <span class="move-name">${move}</span>
        <div class="move-player-wrapper">
            <span class="move-player-name">${player}</span>
            <span class="move-label">${postionsLebals[position]}</span>
        </div>
    </li>
    `
}

function ramdomNumber(max) {
    const number = Math.floor(Math.random() * max + 1)

    return number
}

for(let i = 0 ; i < 9 ; i++) {
    const field = getField(i)

    field.addEventListener('click', () => {
        play(field, i)
        if(game.bot.active) {
            setTimeout(() => {
                botMove()
            }, 200)
        }
    })
}

configSwitcher("switcher-bot", function() {
    game.bot.active = !game.bot.active
})


configSwitcher("switcher-white", function() {
    
})
