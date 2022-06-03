var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);

    if (promptFight === "fight" || promptFight === "FIGHT") {

    
        // update healths and log them
        enemyHealth = enemyHealth - playerAttack;
        playerHealth = playerHealth - enemyAttack;
        
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
    
        
        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        } 
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.prompt("Are you sure you want to quit?");

        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight!");
            playerMoney = playerMoney - 2;
        } else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }
};

fight();