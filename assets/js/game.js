var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// Game states
// "WIN" - Player defeated all enemy robots
//      * Fight all enemy robots
//      * defeat all enemy robots
// "LOSE" - Player health is zero or less


var fight = function(enemyName) {

    while (playerHealth > 0 && enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.prompt("Are you sure you want to quit?");

            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight!");
                playerMoney = playerMoney - 10;
                console.log(playerName, " has ", playerMoney, " coin.");
                break;
            }
        } else if (promptFight === "fight" || promptFight === "FIGHT") {

            // update healths and log them
            enemyHealth = enemyHealth - playerAttack;
            playerHealth = playerHealth - enemyAttack;
            
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        
            
            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break;
            } 
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

var startGame = function() {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            var pickedEnemyName = enemyNames[i];
            window.alert("Welcome to Robot Gladiators! Round " + (i+1) + "\nYou are fighting " + pickedEnemyName + "!");
            enemyHealth = 50;
            fight(pickedEnemyName);

            if (i < enemyNames.length - 1 && playerHealth > 0) {
                var shopConfirm = window.confirm("The fight is over. Visit shop before next round?");
                if (shopConfirm){
                    shop();
                }
            }

        } else {
            break;
        }
    }
    endGame();
}

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("You survived! Great job! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing robot gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
        
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

        case "LEAVE":
        case "leave":
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

startGame();