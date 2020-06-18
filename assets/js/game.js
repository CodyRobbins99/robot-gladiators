var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
var playerMoney = 10;

var fight = function(enemyName) {
    while (enemyHealth  > 0 && playerHealth > 0) {
        // Ask user if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

            // If a player choses to skip confirm and then stop the loop
            if (promptFight === "skip" || promptFight === "SKIP") {       
                // Confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
                    // If yes (true), leave fight
                    if (confirmSkip) {
                        window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                        // Subtract money from playerMoney for skipping 
                        playerMoney = playerMoney - 10;
                        // Log a resulting message to the console so we know that it worked.
                        console.log("playerMoney", playerMoney)
                        break;
                    }
                    // If no (false), ask question again by running fight() again
                    else {
                        fight();
                    }
            }

            // If player choses to fight, then fight
            if (promptFight === "fight" || promptFight === "FIGHT") {

                // Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
                enemyHealth = enemyHealth - playerAttack;
                // Log a resulting message to the console so we know that it worked.
                console.log(
                    playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
                );

                // Check enemy's health 
                if (enemyHealth <= 0) {
                    window.alert(enemyName + " has died!");
                    break;
                }
                else {
                    window.alert(enemyName + " still has " + enemyHealth + " health left.");
                }

                // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
                playerHealth = playerHealth - enemyAttack;
                // Log a resulting message to the console so we know that it worked.
                console.log(
                    enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
                );

                // Check player's health
                if (playerHealth <=0) {
                    window.alert(playerName + " has died!");
                    break;
                }
                else {
                    window.alert(playerName + " still has " + playerHealth + " health left.");
                }
            }
            
            // If player enters an option that is not valid
            else {
                window.alert("You need to pick a valid option. Try again!");
            }
    } 
};

// Function to start the game 
var startGame = function() {

    // Reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
        
            // reset enemyHealth before starting new fight
            enemyHealth = 50;
        
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // If we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {

                // ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                    // if yes, take them to the store() function
                    if (storeConfirm) {
                        shop();
                    }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// Function to end the entire game 
var endGame = function() {
    // If player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // Ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// Function for the shop
var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
        
                // Increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
            
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            // Do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // Call shop() again to force player to pick a valid option.
            shop();
            break;
    }
};

// start the game when the page loads
startGame();