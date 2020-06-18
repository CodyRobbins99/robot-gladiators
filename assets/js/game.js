var fight = function(enemy) {
    while (enemy.health > 0 && playerInfo.health > 0) {
        // Ask user if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

            // If a player choses to skip confirm and then stop the loop
            if (promptFight === "skip" || promptFight === "SKIP") {       
                // Confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
                    // If yes (true), leave fight
                    if (confirmSkip) {
                        window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                        // Subtract money from playerInfo.money for skipping 
                        playerInfo.money = Math.max(0, playerInfo.money - 10);
                        // Log a resulting message to the console so we know that it worked.
                        console.log("playerInfo.money", playerInfo.money)
                        break;
                    }
                    // If no (false), ask question again by running fight() again
                    else {
                        fight();
                    }
            }

            // If player choses to fight, then fight
            if (promptFight === "fight" || promptFight === "FIGHT") {

                // Generate random damage value based on player's attack power
                var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

                enemy.health = Math.max(0, enemy.health - damage);
                // Log a resulting message to the console so we know that it worked.
                console.log(
                    playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
                );

                // Check enemy's health 
                if (enemy.health <= 0) {
                    window.alert(enemy.name + " has died!");
                    break;
                }
                else {
                    window.alert(enemy.name + " still has " + enemy.health + " health left.");
                }

                // Generate random damage value based on Enemy's attack power
                var damage = randomNumber(enemy.attack - 3, enemy.attack);

                playerInfo.health = Math.max(0, playerInfo.health - damage);
                // Log a resulting message to the console so we know that it worked.
                console.log(
                    enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
                );

                // Check player's health
                if (playerInfo.health <=0) {
                    window.alert(playerInfo.name + " has died!");
                    break;
                }
                else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
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
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
        
            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
        
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // If we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            // Increase health and decrease money
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            // increase attack and decrease money
            playerInfo.upgradeAttack();
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

// Function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
};

// Player and enemy info arrays 
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma!
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }, // comma!
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();