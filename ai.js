//AI logic for player 2
console.log("ai.js loaded successfully!");

// Global toggle for enabling/disabling the AI
let isAIActive = false;

// Toggle AI activation when pressing the "T" key
document.addEventListener('keydown', (e) => {
	if (e.code === "KeyT") {
		isAIActive = !isAIActive;
		console.log(`AI Active: ${isAIActive}`);
	}
});

let lastUpdateTime = 0;
let reactionDelay = 100;
let lastReactionTime = 0;

function updateAI() {
    if (!isAIActive) return; // If AI is not active, do nothing

	const currentTime = Date.now();
	if (currentTime - lastUpdateTime < 1000) {
		return;
	}
	if (currentTime - lastReactionTime < reactionDelay) {
		return;
	}
	lastUpdateTime = currentTime;
	lastReactionTime = currentTime;

    const predictedY = predictBallPosition(ball, player2.x);
    const paddleCenter = player2.y + player2.height / 2;

    const maxSpeed = 2.5 + Math.random() * 0.5;
    let movement = Math.min(maxSpeed, Math.abs(predictedY - paddleCenter));

    if (paddleCenter < predictedY - 10) {
        player2.VelocityY = movement;
    } else if (paddleCenter > predictedY + 10) {
        player2.VelocityY = -movement;
    } else {
        player2.VelocityY = 0;
    }
}


function predictBallPosition(ball, playerX) {
    if (ball.VelocityX === 0) return ball.y; // Avoid division by zero

    const timeToReach = (playerX - ball.x) / ball.VelocityX;
    let predictedY = ball.y + ball.VelocityY * timeToReach;

    while (predictedY < 0 || predictedY > boardHeight) {
        if (predictedY < 0) predictedY = -predictedY; 
        if (predictedY > boardHeight) predictedY = 2 * boardHeight - predictedY;
    }

	// Adding random error to the prediction
	const errorMargin = Math.random() * 100 - 10;
	predictedY += errorMargin;
    return predictedY;
}
