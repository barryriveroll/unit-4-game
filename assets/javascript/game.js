var goblins = {
    goblinArray: [
        goblin1 = {
            name: "Pirate Goblin",
            nameElement: $("#goblin-1-name").hide(),
            maxHP: 95,
            currentHP: 120,
            currentAttack: 18,
            baseAttack: 8,
            counterAttack: 10,
            healthText: $("#gob-1-health"),
            healthBar: $("#health-bar-1"),
            card: $("#goblin-1")
        },
        goblin2 = {
            name: "Fishing Goblin",
            nameElement: $("#goblin-2-name").hide(),
            maxHP: 85,
            currentHP: 90,
            currentAttack: 10,
            baseAttack: 12,
            counterAttack: 8,
            healthText: $("#gob-2-health"),
            healthBar: $("#health-bar-2"),
            card: $("#goblin-2")
        },
        goblin3 = {
            name: "Potion Goblin",
            nameElement: $("#goblin-3-name").hide(),
            maxHP: 125,
            currentHP: 80,
            currentAttack: 15,
            baseAttack: 4,
            counterAttack: 13,
            healthText: $("#gob-3-health"),
            healthBar: $("#health-bar-3"),
            card: $("#goblin-3")
        },
        goblin4 = {
            name: "Mobster Goblin",
            nameElement: $("#goblin-4-name").hide(),
            maxHP: 100,
            currentHP: 100,
            currentAttack: 20,
            baseAttack: 5,
            counterAttack: 25,
            healthText: $("#gob-4-health"),
            healthBar: $("#health-bar-4"),
            card: $("#goblin-4")
        }
    ],
    goblinArrayClone: [],
    currentHero: "",
    currentEnemy: ""
}

var game = {
    heroSelect: false,
    enemySelect: false,
    combatText: $("#combat-text"),
    goalText: $("#goal-text"),
    
    newGame: function() {
        for (var i = 0; i < goblins.goblinArray.length; i++) {
            goblins.goblinArray[i].currentAttack = goblins.goblinArray[i].baseAttack;
            goblins.goblinArray[i].currentHP = goblins.goblinArray[i].maxHP;
            goblins.goblinArray[i].healthBar.css("width", 190);
            goblins.goblinArray[i].healthText.text(goblins.goblinArray[i].currentHP + "/" + goblins.goblinArray[i].maxHP);
            goblins.goblinArray[i].nameElement.show().arctext({radius: 350});
        }
        $("#restart-button").hide();
        game.goalText.text("Choose your goblin!");
        $("#enemy-select").css("width", "960px");
    },

    updateGameText: function() {
        goblins.currentEnemy.healthText.text(goblins.currentEnemy.currentHP + "/" + goblins.currentEnemy.maxHP);
        goblins.currentHero.healthText.text(goblins.currentHero.currentHP + "/" + goblins.currentHero.maxHP);

        var newEnemyHealthScale = Math.floor((goblins.currentEnemy.currentHP / goblins.currentEnemy.maxHP) * 190);
        var newHeroHealthScale = Math.floor((goblins.currentHero.currentHP / goblins.currentHero.maxHP) * 190);

        goblins.currentEnemy.healthBar.animate({ width: newEnemyHealthScale}, "fast");
        goblins.currentHero.healthBar.animate({ width: newHeroHealthScale}, "fast");
    },

    attackButton: function() {
        goblins.currentHero.card.animate({ left: "+=550px" }, 60);
        $("#attack-button").attr("id", "disable-button");
        setTimeout (function() {
            goblins.currentHero.card.animate({ left: "-=550px" }, 450);
        }, 60);

        setTimeout (function() {
            goblins.currentEnemy.card.animate({ left: "-=550px" }, 60);

            setTimeout (function() {
                goblins.currentEnemy.card.animate({ left: "+=550px" }, 450);
            }, 60);
        }, 400);

        setTimeout (function() {
            $("#disable-button").attr("id", "attack-button");
        }, 700);
        
        
        goblins.currentEnemy.currentHP -= goblins.currentHero.currentAttack;
        this.changeCombatText("<div>You attacked <span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span> for " + goblins.currentHero.currentAttack + " damage!");
        if (goblins.currentEnemy.currentHP <= 0) {
            this.changeCombatText("<div>You killed <span id='combat-enemy-name'>" + goblins.currentEnemy.name + "</span>!");
            this.enemySelect = false;
            $("#current-enemy").children().removeClass("choose-enemy").hide();
            if (goblins.goblinArray.length === 0) {
                game.goalText.text("You won!!!");
                $("#restart-button").show();
            } else {
                game.goalText.text("Choose your next enemy...");
            }
        } else {
            goblins.currentHero.currentHP -= goblins.currentEnemy.counterAttack;
            setTimeout (function() {
                game.changeCombatText("<div><span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span>attacked you for " + goblins.currentEnemy.counterAttack + " damage!");
            }, 400);
            
            if (goblins.currentHero.currentHP <= 0) {
                goblins.currentHero.currentHP = 0;
                setTimeout (function() {
                    game.changeCombatText("<div><span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span> killed you! Click Restart!");
                    game.goalText.text("You died! Click Restart!");
                    $("#restart-button").show();
                }, 401);
                
            }
        }
        this.updateGameText();
        goblins.currentHero.currentAttack += goblins.currentHero.baseAttack;

        
    },


    moveToHero: function(goblinID, goblinObj) {
        $("#enemy-select").append($(".goblin-card"));
        $(".choose-hero").removeClass("choose-hero").addClass("choose-enemy");
        
        var newTop = "+=440px";
        var newLeft = "";
        var defaultTop = "-=440px";
        var defaultLeft = "";

        $(goblinObj).after("<div class='empty-gob-div'></div>");
        $("#current-hero").append(goblinObj);
        $(goblinObj).removeClass("choose-enemy");
        goblins.currentHero = goblins.goblinArray[goblinID];
        switch (goblinID) {
            case 0:
                newLeft = "-=0px";
                defaultLeft = "+=0px";
                break;
            case 1:
                newLeft = "+=240px";
                defaultLeft = "-=240px";
                break;
            case 2:
                newLeft = "+=480px";
                defaultLeft = "-=480px";
                break;
            case 3:
                newLeft = "+=720px";
                defaultLeft = "-=720px";
                break;  
        }
        goblins.currentHero.card.animate({ left: newLeft, top: newTop }, 1);
        $(".empty-gob-div").animate({ width: "0px" }, "fast");
        setTimeout (function() {
            goblins.currentHero.card.animate({ left: defaultLeft, top: defaultTop }, 200);
            
        }, 5)
        $("#enemy-select").animate({ width: "-=240px" }, "fast");
        game.heroSelect = true;
        goblins.goblinArray.splice(goblinID, 1);
        game.goalText.text("Choose your enemy...");
    },

    moveToEnemy: function(goblinID, goblinObj) {
        var newTop = "+=440px";
        var newLeft = "";
        var defaultTop = "-=440px";
        var defaultLeft = "";

        $(goblinObj).after("<div class='empty-gob-div'></div>");
        $("#current-enemy").append(goblinObj);
        goblins.currentEnemy = goblins.goblinArray[goblinID];
        var multiplier = 0;

        switch (goblins.goblinArray.length) {
            case 1:
                multiplier = 3;
                break;
            case 2:
                multiplier = 2;
                break;
            case 3:
                multiplier = 1;
                break;
        }
        switch (goblinID) {
            case 0:
                newLeft = "-=" + (720 - (120 * multiplier)) + "px";
                defaultLeft = "+=" + (720 - (120 * multiplier)) + "px";
                break;
            case 1:
                newLeft = "-=" + (480 - (120 * multiplier)) + "px";
                defaultLeft = "+=" + (480 - (120 * multiplier)) + "px";
                break;
            case 2:
                newLeft = "-=" + (240 - (120 * multiplier)) + "px";
                defaultLeft = "+=" + (240 - (120 * multiplier)) + "px";
                break;  
        }

        goblins.currentEnemy.card.animate({ left: newLeft, top: newTop }, 1);
        $(".empty-gob-div").animate({ width: "0px" }, "fast");
        $("#enemy-select").animate({ width: "-=240px" }, "fast");
        setTimeout (function() {
            goblins.currentEnemy.card.animate({ left: defaultLeft, top: defaultTop }, 200);
            
        }, 5)
        game.enemySelect = true;
        goblins.goblinArray.splice(goblinID, 1);
        game.goalText.text("Fight!!");
    },

    restartGame: function() {
        goblins.goblinArray = goblins.goblinArrayClone.slice();
        goblins.currentHero = "";
        goblins.currentEnemy = "";
        game.heroSelect = false;
        game.enemySelect = false;
        $(".goblin-card").removeClass("choose-enemy").addClass("choose-hero").show();
        $(".empty-gob-div").remove();
        this.combatText.children().remove();
        this.newGame();
        for (var i = 0; i < goblins.goblinArray.length; i++) {
            $("#hero-select").append(goblins.goblinArray[i].card);
        }
    },

    changeCombatText: function(string) {
        this.combatText.children().animate({ opacity: "-=0.18"}, 5);
        this.combatText.prepend(string);
    }
}

function init () {
    for (var i = 0; i < goblins.goblinArray.length; i++) {
        goblins.goblinArray[i].nameElement.text(goblins.goblinArray[i].name);
        goblins.goblinArray[i].nameElement.show().arctext({radius: 350});
    }
    game.newGame();
}

$(document).ready(function() {
    init();
    $(".goblin-card").on("click", function (e) {
        var classString = e.currentTarget.getAttribute('class');
        if (!game.enemySelect) {
            if (classString.includes('choose-hero')) {
                goblins.goblinArrayClone = goblins.goblinArray.slice();
                var gobIndex = $(".choose-hero").index(this);
                game.moveToHero(gobIndex, this);
            } else if (classString.includes('choose-enemy')) {
                var gobIndex = $(".choose-enemy").index(this);
                game.moveToEnemy(gobIndex, this);
            }
        }
    });

    $("button").on("click", function(e) {
        var idString = e.currentTarget.getAttribute('id');
        if (idString.includes('attack-button')) {
            if (goblins.currentHero.currentHP <=0) {
                game.changeCombatText("<div>You died! Click Restart!");
            } else if (game.enemySelect == true) {
                game.attackButton();
            } else {
                game.changeCombatText("<div>There is nothing to attack!");
            }
        } else if (idString.includes('disable-button')) {
            game.changeCombatText("<div>Attacking...");
        } else {
            game.restartGame();
        }
    });   
});