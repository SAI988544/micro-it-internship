Micro IT Internship Web Application
Overview
This web application, developed for the Micro IT Internship, features a Simple Calculator and a Number Guessing Game. Built with HTML, CSS, and JavaScript, it offers a responsive, tab-based interface for performing arithmetic calculations and playing an interactive number guessing game with adjustable difficulty levels.
Features
Simple Calculator

Operations: Addition (+), subtraction (−), multiplication (×), division (÷), percentage (% - unary and binary), sign toggle (±).
Chained Calculations: Supports multiple expressions (e.g., 5 + 3 - 2 = 6).
History: Logs up to 5 past calculations (e.g., 5 + 3 − 2 = 6).
Keyboard Support:
Numbers (0-9), operators (+, −, ×, ÷, %), decimal point (.).
Enter: Computes result (same as =).
Escape or Backspace: Clears all expressions.


Error Handling: Shows "Error" for division by zero.
Formatting: Handles large numbers (exponential notation for ≥10¹²) and decimals (up to 6 digits).

Number Guessing Game

Gameplay: Guess a random number with feedback ("Too high!", "Too low!", "Correct!").
Difficulty Levels:
Easy: 1-50, 10 attempts.
Medium: 1-100, 7 attempts.
Hard: 1-200, 5 attempts.


Scoring: Awards 100 points + 10 points per remaining attempt for correct guesses.
History: Tracks guesses (e.g., "Guess #1: 50 - Too high!").
UI: Includes digit display, result modal, and difficulty selector.
Keyboard Support:
Enter: Submits guess.
Backspace: Edits input (native browser behavior).



General

Tab Navigation: Switch between Calculator and Game tabs.
Responsive Design: Adapts to desktop and mobile (<600px).
Instructions Modal: Guides users on tab switch or first load.
Input Isolation: Keyboard events are specific to the active tab.

Prerequisites

Modern web browser (Chrome, Firefox, Edge, etc.).
Optional: Local server (e.g., VS Code Live Server, Node.js http-server) for development.

Installation

Clone the Repository:
git clone https://github.com/<your-username>/micro-it-internship.git
cd micro-it-internship


Serve the Application:

Option 1: Open Directly:
Open index.html in a browser.
Note: Some browsers may restrict local file access; use a server for full functionality.


Option 2: Local Server (Node.js):
Install Node.js: nodejs.org.
Install http-server:npm install -g http-server


Run:http-server


Open http://localhost:8080 in your browser.


Option 3: VS Code Live Server:
Open the project in VS Code.
Install the Live Server extension.
Right-click index.html → "Open with Live Server".




Verify:

The app loads with the Calculator tab active, displaying "0".
Switch to the Number Game tab to start a game.



Usage
Calculator

Access: Click the "Calculator" tab.
Calculate:
Use buttons or keyboard to input expressions (e.g., 5 + 3 - 2).
Press = or Enter to compute (e.g., 6).
Percentage:
Unary: 30 % → 0.3.
Binary: 30 % 80 → 24.


Clear with C, Escape, or Backspace.
Toggle sign with ±.


History: View past calculations below the display.

Number Guessing Game

Access: Click the "Number Game" tab.
Play:
Choose difficulty (Easy, Medium, Hard).
Click "Start New Game" or use the default game.
Enter a guess and submit via "Submit Guess" or Enter.
Edit guesses with Backspace.
View feedback and guess history.


End Game:
Win: Correct guess shows a "Congratulations!" modal.
Lose: Out of attempts shows a "Game Over!" modal.
Use "Play Again" or "Close".



File Structure
micro-it-internship/
├── assets/
│   ├── images/
│   │   ├── calculator-screenshot.png  # Screenshot of calculator tab
│   │   ├── game-screenshot.png       # Screenshot of number guessing game tab
│   │   └── modal-screenshot.png      # Screenshot of a modal (e.g., game result)
├── index.html                        # Main HTML file
├── styles.css                        # CSS for styling
├── app.js                            # Tab navigation and modal logic
├── calculator.js                     # Calculator logic
├── number-game.js                    # Number guessing game logic
└── README.md                         # GitHub documentation

Contributing
Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature-name".
Push to the branch: git push origin feature-name.
Open a pull request with a description of changes.

Known Issues
None at this time. Report issues via GitHub Issues.

License
© 2025 Micro IT Internship. All rights reserved.

Acknowledgments
Built as part of the Micro IT Internship program.
Uses the Poppins font via Google Fonts (included via CSS).

