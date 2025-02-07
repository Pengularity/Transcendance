// AI activation with key "T"
let isAIActive = false;
document.addEventListener('keydown', (e) => {
    if (e.code === "KeyT") {
        isAIActive = !isAIActive;
        console.log("IA Active : " + isAIActive);
    }
});

let targetY = boardHeight / 2;
let currentKey = null;
let lastSimulatedDirection = null; 

function simulateKeyPress(key) {
    if (currentKey !== key) {
        if (currentKey !== null) simulateKeyRelease(currentKey);
        document.dispatchEvent(new KeyboardEvent("keydown", { code: key, key: key }));
        currentKey = key;
    }
}

function simulateKeyRelease(key) {
    if (currentKey === key) {
        document.dispatchEvent(new KeyboardEvent("keyup", { code: key, key: key }));
        currentKey = null;
    }
}

function releaseAllKeys() {
    if (currentKey !== null) simulateKeyRelease(currentKey);
}

// AI vision refresh
function refreshAIVision() {
    if (!isAIActive) return;
    if (ball.VelocityX <= 0) {
        targetY = boardHeight / 2;
    } else {
        targetY = predictBallPosition(ball, player2.x);
    }
}

// Update AI Movement
function updateAIMovement() {
    if (!isAIActive) {
        releaseAllKeys();
        return;
    }

    const paddleCenter = player2.y + player2.height / 2;
    const tolerance = 10;
    let newDirection = null;

    if (Math.abs(targetY - paddleCenter) >= tolerance) {
        newDirection = (targetY > paddleCenter) ? "ArrowDown" : "ArrowUp";
    }

    if (newDirection !== lastSimulatedDirection) {
        if (newDirection) simulateKeyPress(newDirection);
        else releaseAllKeys();
        lastSimulatedDirection = newDirection;
    }
}

// Ball prediction
function predictBallPosition(ball, playerX) {
    if (ball.VelocityX === 0) return ball.y;

    let timeToReach = (playerX - ball.x) / ball.VelocityX;
    if (timeToReach <= 0) timeToReach = 0;
    timeToReach = Math.min(timeToReach, 1);

    let predictedY = ball.y + ball.VelocityY * timeToReach;
    const period = 2 * boardHeight;
    predictedY = ((predictedY % period) + period) % period;
    if (predictedY > boardHeight) predictedY = period - predictedY;
    predictedY += Math.random() * 20 - 10;
    return Math.max(0, Math.min(predictedY, boardHeight));
}