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

var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    
    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    } else if (promptFight === "fight") {
        return false;
    } else {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    

    if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        shop();
        return true;
    }
    return false;
}

var fight = function(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {

        if(fightOrSkip()) {
            break;
        }

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
    var shopOptionPrompt = window.prompt("Would you like to... \n 1) REFILL your health\n 2) UPGRADE your attack\n 3) LEAVE the store\n\nPlease enter number to make a choice.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();

        case 3:
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}



startGame();