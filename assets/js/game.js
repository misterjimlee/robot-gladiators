var randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your player's name is " + name + ".");
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7){
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

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

var fight = function(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.prompt("Are you sure you want to quit?");

            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log(playerInfo.name, " has ", playerInfo.money, " coin.");
                break;
            }
        } else if (promptFight === "fight" || promptFight === "FIGHT") {

            // update healths and log them
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        
            
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                break;
            } 
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

var startGame = function() {
    playerInfo.reset();

    for(i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            var pickedEnemyObj = enemyInfo[i];
            window.alert("Welcome to Robot Gladiators! Round " + (i+1) + "\nYou are fighting " + pickedEnemyObj.name + "!");
            
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
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
    if (playerInfo.health > 0) {
        window.alert("You survived! Great job! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
        
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();

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