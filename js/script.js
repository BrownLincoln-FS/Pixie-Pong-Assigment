// Creates the Pixi Application
const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0x1099bb 
});
document.body.appendChild(app.view);


// Wall thickness, "ball" radius, and "ball" speed.
const thickness = 10;
const radius = 10;
const speed = 2.5;

// Variables needed tracked globally
let dx = 0;
let dy = 0;
let hits = new Set(); // Tracks which walls are hit

// Creates game objects.
function createBorder(x, y, width, height, name) {
    const border = new PIXI.Graphics();
    // Draws rectangle in a specific way to make resetting easier later on
    drawRedRect(border, width, height);
    border.x = x;
    border.y = y;
    border.name = name;
    app.stage.addChild(border);
    return border;
}

// Helper to draw a red rectangle
function drawRedRect(graphicsObj, w, h) {
    graphicsObj.clear();
    graphicsObj.beginFill(0xFF0000); // Red
    graphicsObj.drawRect(0, 0, w, h);
    graphicsObj.endFill();
}

const topWall = createBorder(0, 0, app.screen.width, thickness, 'top');
const bottomWall = createBorder(0, app.screen.height - thickness, app.screen.width, thickness, 'bottom');
const leftWall = createBorder(0, 0, thickness, app.screen.height, 'left');
const rightWall = createBorder(app.screen.width - thickness, 0, thickness, app.screen.height, 'right');

// Creates Circle (the ball)
const circle = new PIXI.Graphics();
circle.beginFill(0xFFFF00); 
circle.drawCircle(0, 0, radius);
circle.endFill();
app.stage.addChild(circle);

// Game loop and logic

// This function resets the board to "Start" conditions
function resetGame() {
    // Clears the "hits" memory
    hits.clear();

    // Resets Walls to Red
    // Uses the helper function we made earlier
    drawRedRect(topWall, app.screen.width, thickness);
    drawRedRect(bottomWall, app.screen.width, thickness);
    drawRedRect(leftWall, thickness, app.screen.height);
    drawRedRect(rightWall, thickness, app.screen.height);

    // Randomizes Circle Position
    const minX = thickness + radius;
    const maxX = app.screen.width - thickness - radius;
    const minY = thickness + radius;
    const maxY = app.screen.height - thickness - radius;

    circle.x = minX + Math.random() * (maxX - minX);
    circle.y = minY + Math.random() * (maxY - minY);

    // Randomizes Direction
    dx = Math.random() > 0.5 ? speed : -speed;
    dy = Math.random() > 0.5 ? speed : -speed;
}

// The core game logic wrapped in a Promise
function runGameRound() {
    return new Promise((resolve, reject) => {
        
        // Defines the movement function
        function gameTicker() {
            circle.x += dx;
            circle.y += dy;

            // --- Hit Logic ---
            if (circle.x + radius >= rightWall.x) {
                dx = -speed;
                circle.x = rightWall.x - radius;
                handleHit('right', rightWall);
            }
            if (circle.x - radius <= leftWall.width) {
                dx = speed;
                circle.x = leftWall.width + radius;
                handleHit('left', leftWall);
            }
            if (circle.y + radius >= bottomWall.y) {
                dy = -speed;
                circle.y = bottomWall.y - radius;
                handleHit('bottom', bottomWall);
            }
            if (circle.y - radius <= topWall.height) {
                dy = speed;
                circle.y = topWall.height + radius;
                handleHit('top', topWall);
            }
        }

        // Adds movement function to Pixi's ticker loop
        app.ticker.add(gameTicker);

        // Handles Hits
        function handleHit(wallName, wallObject) {
            if (hits.has(wallName)) return;

            hits.add(wallName);

            // Changes color to Green
            const w = wallObject.width;
            const h = wallObject.height;
            wallObject.clear();
            wallObject.beginFill(0x00FF00);
            wallObject.drawRect(0, 0, w, h);
            wallObject.endFill();

            // Checks Win Condition
            if (hits.size === 4) {
                // Stops the ticker so the ball freezes
                app.ticker.remove(gameTicker);
                // Resolves the promise
                resolve();
            }
        }
    });
}

// Main async game loop
async function startGameLoop() {

    // Resets everything
    resetGame();

    // Waits for the game round to finish (Promise)
    await runGameRound();

    // Allows the browser to render the last frame (all green walls)
    setTimeout(() => {

        // Shows alert
        alert("Success! The circle has bounced off all 4 borders.");
        
        // When user clicks "Ok" on the alert, restarts the loop
        startGameLoop();
    }, 100);
}

// Starts the first game
startGameLoop();