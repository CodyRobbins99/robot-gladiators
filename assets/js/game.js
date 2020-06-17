var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
var playerMoney = 10;

var fight = function(enemyName) {
    // repeat and execute as long as the enemy robot is alive 
    while(enemyHealth > 0) {
        // Alert users that they are starting the round
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

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
                }
                else {
                    window.alert(playerName + " still has " + playerHealth + " health left.");
                }
            }
            // If a player choses to skip
            else if (promptFight === "skip" || promptFight === "SKIP") {
                
                // Confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
                    // If yes (true), leave fight
                    if (confirmSkip) {
                    window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                    // Subtract money from playerMoney for skipping 
                    playerMoney = playerMoney - 2;
                    // Log a resulting message to the console so we know that it worked.
                    console.log(
                        playerName + " has lost 2 money." + playerName + " now has " + playerMoney + " money remaining."
                    );
                }
                // If no (false), ask question again by running fight() again
                else {
                    fight();
                }
            }
        
            // If player enters an option that is not valid
            else {
                window.alert("You need to pick a valid option. Try again!");
            }
    } 
};
for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}