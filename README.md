# Pixie Pong Assigment

**Author:** Lincoln Brown
**Class** WDV3322-O 01

## Description
# PixiJS Promise Game Assignment

**Author:** Lincoln Brown  
**Course:** [Insert Course Name/Number Here]

## Description
This project is a web-based application built using PixiJS that demonstrates asynchronous logic handling using JavaScript Promises.

The application was built to demonstrate skills I learned when studying/learning PixiJS, and JavaScript Promises.

## How It Works
1. The application creates a responsive canvas, four red borders, and a yellow circle.
2. The main game logic runs inside a function returning a `Promise`. It tracks which walls have been hit using a JavaScript `Set`.
3. Once the `Set` contains all 4 walls, the game loop stops, the Promise resolves, and an alert notifies the user of success.
4. Clicking "Ok" on the alert resets the game board and starts a new round.

## Extra Features Implemented
I have implemented the following extra features:

* **Pixel-Perfect Hit Detection:**
    * Calculations include the radius of the circle (`circle.x + radius`), ensuring the edge of the circle bounces off the wall rather than the center point.
* **Border Color Change:**
    * Borders dynamically change from **Red** to **Green** upon collision to visually indicate the "hit" state.
* **Random Circle Movement:**
    * The circle spawns at a random coordinate (within safe bounds) and moves in a randomized starting direction (velocity).
* **Bonus Addition: Game Restart**
    * After clicking "Ok" on the alert, the gameplay loop restarts again.
* **Bonus Addition: Multi-Device Responsiveness:**
    * Multi-Device responsiveness has been added allowing the game to be played on a multitude of devices. 
    * If playing on Desktop and using Browser Inspect, you can test this by selecting the Mobile layout, selecting a device, and then refreshing the browser. The borders, ball, and window will resize appropriately to take up the correct amount of space.

## Technologies I Used
* HTML5 / CSS3
* JavaScript (ES6+)
* PixiJS (v7 via CDN)

## How to Run
1.  Clone this repository or download the files.
2.  Open `index.html` in any modern web browser **OR** run `index.html` in VS Code (or another IDE) using Live Server (or similar).