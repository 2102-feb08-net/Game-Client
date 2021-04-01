# Game-Client
# Project Description #
Reventure is a web-browser adventure game where players can explore an open world to slay mobs and gain experience to reach the leaderboard's top score.
However, the mobs the player faces are strong and may appear in large numbers, being capable of defeating the player if the player is not careful.

# Technologies #
* C#
* Entity Framework
* HTML/CSS
* JavaScript
* Angular
* Microsoft Azure
* SQL Server

# Features #
* Player can fight mobs.
* Mobs target player within a specific range.
* Player can acquire mob loot which increases character exp.
* Leaderboards based on player's total exp.

To-do list:
* Refactor authentication with Okta to allow multiple users to login to the game.

# Getting Started #
Use the commands below to clone the client and server repositories:
* git clone https://github.com/2102-feb08-net/Game-Client.git
* git clone https://github.com/2102-feb08-net/Game-Server.git
Open Visual Studio Code and follow the instructions below:
* Open the folder that contains the Game-Client repository.
* Open a new terminal in Visual Studio Code.
* In the terminal:
   * Use the cd command to move to the directory 'browser-game.'
   * Run the command 'npm install' to get all the packages and dependencies needed for the project to run. 
   * Once the installation is finished, run the command 'ng serve' to launch the application; if a tab is not opened automatically in the browser, you can click on the link produced by command to enter the game.
In the browser tab:
* Select the option 'LogIn' and enter the credentials to access the game.
Alternatively, you can enter the game through the following link:
* https://reventure-game-client.azurewebsites.net/
* NOTE: The steps in the 'In the browser tab' section still need to be followed to access the game.

# Usage #
Controls:
* W - Move up.
* A - Move left.
* S - Move down.
* D - Move right.
* Spacebar - Attack (The character will not be able to move when attacking).
Options:
* Stats - displays the current health, attack, defense, and other attributes of the player's character.
* Leaderboard - displays a list of players with the highest amount of exp.
* Logout - closes the player's session.
* Login - allows player to access the game and its character.
Objective
* As mentioned in the project description, Reventure is an open world game where the player can kill mobs to gather exp and get to the top of the leaderboard. Mobs spawn at random locations in the map and may appear in big groups; they are strong and can bring the player down if the player is not careful.

# Contributors #
* Cole Samuelsen
* Hamza Butt
* Diego Rincon
