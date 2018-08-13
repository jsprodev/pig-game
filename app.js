/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let score = [0, 0], currentScore = 0, activePlayer = 0 , dice = 0; 

dice = Math.round(Math.random() * 5) + 1;

let diceImg = document.querySelector('.dice');

// increment individual score
function incrementScore() {
    currentScore += dice;
    document.getElementById('current-' + activePlayer).innerHTML = currentScore;
}

// switch players
function switchPlayer() {
    diceImg.style.display = 'block';
    diceImg.setAttribute('src', 'dice-1.png');
    score[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById('current-' + activePlayer).innerHTML = currentScore;
    document.getElementById('score-' + activePlayer).innerHTML = score[activePlayer];
    if (score[activePlayer] >= 100) {
        document.querySelector('.btn-roll').classList.add('disabled');
        document.querySelector('.btn-hold').classList.add('disabled');
        document.querySelector('#name-' + activePlayer).innerHTML = 'Winner';
        return false;
    }
    if (activePlayer === 0) {
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    } else {
        activePlayer = 0;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
}

// roll dice
function turn() {
    dice = Math.floor(Math.random() * 5) + 1;
    console.log('Dice: ' + dice);
    if (dice === 1) {
        switchPlayer();
    } else {
        diceImg.style.display = 'block';
        diceImg.setAttribute('src', 'dice-' + dice + '.png');
        incrementScore();
    }
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    turn();
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    switchPlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
    diceImg.setAttribute('src', 'dice-1.png');
    document.querySelector('#name-' + activePlayer).innerHTML = 'Player' + (activePlayer + 1);
    score = [0, 0], currentScore = 0, activePlayer = 0 , dice = 0; 
    document.getElementById('current-0').innerHTML = currentScore;
    document.getElementById('current-1').innerHTML = currentScore;
    document.getElementById('score-0').innerHTML = score[activePlayer];
    document.getElementById('score-1').innerHTML = score[activePlayer];
    document.querySelector('.btn-roll').classList.remove('disabled');
    document.querySelector('.btn-hold').classList.remove('disabled');
});