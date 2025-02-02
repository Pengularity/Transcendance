//board
let board;
let boardWidth = 800;
let boardHeight = 500;
let context;


//ball

let ballWidth = 10;
let ballHeight = 10;

let ball = {
    x: boardWidth / 2 - ballWidth / 2,
    y: boardHeight / 2 - ballHeight / 2,
    width: ballWidth,
    height: ballHeight,
    VelocityX: 2,
    VelocityY: 2
};


//players

let playerHeight = 100;
let playerWidth = 10;
let playerVelocityY = 0;


let player1 = {
    x: 10,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    VelocityY : playerVelocityY,
    score : 0
};


let player2 = {
    x: boardWidth - 10 - playerWidth,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    VelocityY : playerVelocityY,
    score : 0
};




window.onload = function() {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d');

    //draw player1
    context.fillStyle = 'skyblue';
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //draw player2
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //loop
    requestAnimationFrame(update);

    //key listeners
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', stopPlayer);
}

function update() {
    //update
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    //draw player1
    context.fillStyle = 'skyblue';
    let nextPlayer1Y = player1.y + player1.VelocityY;
    if(!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //draw player2
    context.fillStyle = 'orange';
	if (isAIActive) {
		updateAI();
	}
	let nextPlayer2Y = player2.y + player2.VelocityY;
	if (!outOfBounds(nextPlayer2Y)) {
		player2.y = nextPlayer2Y; // Always update player2.y
	}
 
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //draw middle line
    context.fillStyle = 'white';
    for (let i = 0; i < boardHeight; i += 30) {
        context.fillRect(boardWidth / 2 - 1, i, 2, 20);
    }

    //draw score
    context.font = '30px Arial';
    context.fillStyle = 'white';
    context.fillText(player1.score, boardWidth / 4, 50);
    context.fillText(player2.score, boardWidth * 3 / 4, 50);

    //move ball
    ball.x += ball.VelocityX;
    ball.y += ball.VelocityY;

    //ball collision with top and bottom walls
    if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
        ball.VelocityY = -ball.VelocityY;
    }

    //ball collision with players
    if (ball.x <= player1.x + player1.width && ball.y >= player1.y && ball.y <= player1.y + player1.height) {
        ball.VelocityX = -ball.VelocityX;
        increaseBallSpeed();
    }
    if (ball.x >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.height) {
        ball.VelocityX = -ball.VelocityX;
        increaseBallSpeed();
    }

    //score player1
    if (ball.x > boardWidth - ball.width) {
        player1.score++;
        resetGame(-1);
    }

    //score player2
    if (ball.x < 0) {
        player2.score++;
        resetGame(1);
    }

    //draw ball
    context.fillStyle = 'white';
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function outOfBounds(yPosition) {
    return yPosition < 0 || yPosition > boardHeight - playerHeight;
}

function movePlayer(e) {
    //player1
    if(e.code == "KeyS") {
        player1.VelocityY = 3;
    }
    else if(e.code == "KeyW") {
        player1.VelocityY = -3;
    }

    //player2
    if(e.code == "ArrowUp") {
        player2.VelocityY = -3;
    }
    else if(e.code == "ArrowDown") {
        player2.VelocityY = 3;
    }
}

function stopPlayer(e) {
    //player1
    if(e.code == "KeyS" && player1.VelocityY > 0) {
        player1.VelocityY = 0;
    } else if(e.code == "KeyW" && player1.VelocityY < 0) {
        player1.VelocityY = 0;
    }
    //player2
    if(e.code == "ArrowDown" && player2.VelocityY > 0) {
        player2.VelocityY = 0;
    } else if(e.code == "ArrowUp" && player2.VelocityY < 0) {
        player2.VelocityY = 0;
    }
}

function increaseBallSpeed() {
    ball.VelocityX *= 1.1;
    ball.VelocityY *= 1.1;
}

function resetGame(direction) {
    ball = {
        x: boardWidth / 2 - ballWidth / 2,
        y: boardHeight / 2 - ballHeight / 2,
        width: ballWidth,
        height: ballHeight,
        VelocityX: direction * 2,
        VelocityY: 2
    }
}