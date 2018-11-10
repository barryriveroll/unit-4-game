var goblins = {
    goblinArray: [
        goblin1 = {
            name: "Pirate Goblin",
            nameElement: $("#goblin-1-name"),
            maxHP: 150,
            currentHP: 110,
            currentAttack: 18,
            baseAttack: 18,
            healthText: $("#gob-1-health"),
            healthBar: $("#health-bar-1"),
            card: $("#goblin-1")
        },
        goblin2 = {
            name: "Fishing Goblin",
            nameElement: $("#goblin-2-name"),
            maxHP: 120,
            currentHP: 90,
            currentAttack: 10,
            baseAttack: 10,
            healthText: $("#gob-2-health"),
            healthBar: $("#health-bar-2"),
            card: $("#goblin-2")
        },
        goblin3 = {
            name: "Potion Goblin",
            nameElement: $("#goblin-3-name"),
            maxHP: 180,
            currentHP: 80,
            currentAttack: 15,
            baseAttack: 15,
            healthText: $("#gob-3-health"),
            healthBar: $("#health-bar-3"),
            card: $("#goblin-3")
        },
        goblin4 = {
            name: "Mobster Goblin",
            nameElement: $("#goblin-4-name"),
            maxHP: 100,
            currentHP: 100,
            currentAttack: 20,
            baseAttack: 20,
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
    // gobName1: $("#goblin-1-name").hide(),
    // gobName2: $("#goblin-2-name").hide(),
    // gobName3: $("#goblin-3-name").hide(),
    // gobName4: $("#goblin-4-name").hide(),
    goalText: $("#goal-text"),
    
    newGame: function() {
        for (var i = 0; i < goblins.goblinArray.length; i++) {
            // goblins.goblinArray[i].nameElement.hide();
            goblins.goblinArray[i].currentAttack = goblins.goblinArray[i].baseAttack;
            goblins.goblinArray[i].currentHP = goblins.goblinArray[i].maxHP;
            goblins.goblinArray[i].healthBar.css("width", 190);
            goblins.goblinArray[i].healthText.text(goblins.goblinArray[i].currentHP + "/" + goblins.goblinArray[i].maxHP);
            goblins.goblinArray[i].nameElement.text(goblins.goblinArray[i].name);
            goblins.goblinArray[i].nameElement.arctext({radius: 350});
        }
        $("#restart-button").hide();
        
        // game.gobName2.show().arctext({radius: 350});
        // game.gobName3.show().arctext({radius: 350});
        // game.gobName4.show().arctext({radius: 350});
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
            goblins.currentHero.currentHP -= goblins.currentEnemy.baseAttack;
            setTimeout (function() {
                game.changeCombatText("<div><span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span>attacked you for " + goblins.currentEnemy.baseAttack + " damage!");
            }, 400);
            
            if (goblins.currentHero.currentHP <= 0) {
                setTimeout (function() {
                    game.changeCombatText("<div><span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span> killed you! Click Restart!");
                    $("#restart-button").show();
                }, 401);
                
            }
        }
        this.updateGameText();
        goblins.currentHero.currentAttack += goblins.currentHero.baseAttack;

        
    },

    restartGame: function() {
        goblins.goblinArray = goblins.goblinArrayClone.slice();
        goblins.currentHero = "";
        goblins.currentEnemy = "";
        game.heroSelect = false;
        game.enemySelect = false;
        $(".goblin-card").removeClass("choose-enemy").addClass("choose-hero").show();
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

$(document).ready(function() {
    $(".goblin-card").on("click", function (e) {
        var classString = e.currentTarget.getAttribute('class');
        
        if (!game.enemySelect) {
            if (classString.includes('choose-hero')) {
                $("#enemy-select").css("width", "-=240px");
                goblins.goblinArrayClone = goblins.goblinArray.slice();
                var gobIndex = $(".choose-hero").index(this);
                $("#enemy-select").append($(".goblin-card"));
                $(".choose-hero").removeClass("choose-hero").addClass("choose-enemy");
                $("#current-hero").append($(this));
                $(this).removeClass("choose-enemy");
                goblins.currentHero = goblins.goblinArray[gobIndex];
                game.heroSelect = true;
                goblins.goblinArray.splice(gobIndex, 1);
                game.goalText.text("Choose your enemy...");
            } else if (classString.includes('choose-enemy')) {
                $("#enemy-select").css("width", "-=240px");
                var gobIndex = $(".choose-enemy").index(this);
                $("#current-enemy").append($(this));
                goblins.currentEnemy = goblins.goblinArray[gobIndex];
                game.enemySelect = true;
                goblins.goblinArray.splice(gobIndex, 1);
                game.goalText.text("Fight!!");
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
    }),
    
    game.newGame();
    
});