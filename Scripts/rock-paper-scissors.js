let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
    };

    updateScoreElement();

    let isautoplaying = false;
    let intervalid;

    function autoplay() {
    if (!isautoplaying) {
    intervalid = setInterval( () => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
        }, 1000);
        isautoplaying = true;
        document.querySelector('.js-autoplay-button').innerHTML = '<b>Stop Auto Play<b>';
    } else {
        clearInterval(intervalid);
        isautoplaying= false;
        document.querySelector('.js-autoplay-button').innerHTML = '<b>Auto Play<b>';
    }
    }
    
    function resetScore() {
    score.Wins = 0; 
    score.Losses = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    }


    document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

    document.querySelector('.js-reset-button')
    .addEventListener('click', () => { 
        resetScore();
    });

    document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoplay();
    });

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            playGame('rock');
        } else if (event.key === 'p') {
            playGame('paper')
        } else if (event.key === 's') {
            playGame('scissors')
        } else if (event.key === 'a') {
            autoplay();
        } else if (event.key === 'Backspace' || event.key === 'Delete') {
            resetScore
        }
    });

    function playGame(playerMove) {

    const computerMove = pickComputerMove();
    
    let result = '';

    if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
        result = 'You Lose';
    }
    else if (computerMove === 'paper') {
        result = 'You Won!';
    }
    else if (computerMove === 'scissors') {
        result = 'Tie';
    }
    }
    
    else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
        result = 'Tie';
    }
    else if (computerMove === 'paper') {
        result = 'You Lose';
    }
    else if (computerMove === 'scissors') {
        result = 'You Won!';
    }
    }

    else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
        result = 'You Won!';
    }
    else if (computerMove === 'paper') {
        result = 'You Tie';
    }
    else if (computerMove === 'scissors') {
        result = 'You Lose';
    }
    }

    if (result === 'You Won!') {
        score.Wins += 1;
    }
    else if (result === 'You Lose') {
        score.Losses += 1;
    }
    else if (result === 'Tie') {
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `Your move: ${playerMove} Computer move: ${computerMove} `;
    }

    function updateScoreElement() {
        document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}!, Losses: ${score.Losses}, Ties: ${score.Ties}`;
    }

    function pickComputerMove () {

    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
            computerMove = 'rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3 ) {
            computerMove = 'paper';
    }
    else if (randomNumber >=2/3 && randomNumber < 1) {
            computerMove = 'scissors';
    }

    return computerMove;
         
    }