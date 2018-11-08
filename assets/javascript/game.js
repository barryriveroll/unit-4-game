var goblins = {
    goblinArray: [
        goblin1 = {
            name: "Testingname",
            maxHP: 150,
            currentHP: 110,
            currentAttack: 18,
            baseAttack: 18,
            healthText: $("#gob-1-health"),
            healthBar: $("#health-bar-1"),
            card: $("#goblin-1")
        },
        goblin2 = {
            name: "Goblin 2",
            maxHP: 120,
            currentHP: 90,
            currentAttack: 10,
            baseAttack: 10,
            healthText: $("#gob-2-health"),
            healthBar: $("#health-bar-2"),
            card: $("#goblin-2")
        },
        goblin3 = {
            name: "Goblin 3",
            maxHP: 180,
            currentHP: 80,
            currentAttack: 15,
            baseAttack: 15,
            healthText: $("#gob-3-health"),
            healthBar: $("#health-bar-3"),
            card: $("#goblin-3")
        },
        goblin4 = {
            name: "Goblin 4",
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
    gobName1: $("#goblin-1-name").hide(),
    gobName2: $("#goblin-2-name").hide(),
    gobName3: $("#goblin-3-name").hide(),
    gobName4: $("#goblin-4-name").hide(),
    
    newGame: function() {
        for (var i = 0; i < goblins.goblinArray.length; i++) {
            goblins.goblinArray[i].currentAttack = goblins.goblinArray[i].baseAttack;
            goblins.goblinArray[i].currentHP = goblins.goblinArray[i].maxHP;
            goblins.goblinArray[i].healthBar.css("width", 190);
        }
        $("#restart-button").hide();
        $("#gob-1-health").text(goblins.goblinArray[0].currentHP + "/" + goblins.goblinArray[0].maxHP);
        $("#gob-2-health").text(goblins.goblinArray[1].currentHP + "/" + goblins.goblinArray[1].maxHP);
        $("#gob-3-health").text(goblins.goblinArray[2].currentHP + "/" + goblins.goblinArray[2].maxHP);
        $("#gob-4-health").text(goblins.goblinArray[3].currentHP + "/" + goblins.goblinArray[3].maxHP);
        
        

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
        goblins.currentHero.card.animate({ left: "+=400px" }, 60);
        setTimeout (function() {
            goblins.currentHero.card.animate({ left: "-=400px" }, 450);
        }, 60);

        setTimeout (function() {
            goblins.currentEnemy.card.animate({ left: "-=400px" }, 60);

            setTimeout (function() {
                goblins.currentEnemy.card.animate({ left: "+=400px" }, 450);
            }, 60);
        }, 400);
        
        goblins.currentEnemy.currentHP -= goblins.currentHero.currentAttack;
        this.changeCombatText("<div>You attacked <span id='combat-enemy-name'>" + goblins.currentEnemy.name + " </span> for " + goblins.currentHero.currentAttack + " damage!");
        if (goblins.currentEnemy.currentHP <= 0) {
            this.changeCombatText("<div>You killed <span id='combat-enemy-name'>" + goblins.currentEnemy.name + "</span>!");
            this.enemySelect = false;
            $("#current-enemy").children().removeClass("choose-enemy").hide();
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
                goblins.goblinArrayClone = goblins.goblinArray.slice();
                var gobIndex = $(".choose-hero").index(this);
                $("#enemy-select").append($(".goblin-card"));
                $(".choose-hero").removeClass("choose-hero").addClass("choose-enemy");
                $("#current-hero").append($(this));
                $(this).removeClass("choose-enemy");
                goblins.currentHero = goblins.goblinArray[gobIndex];
                game.heroSelect = true;
            } else if (classString.includes('choose-enemy')) {
                var gobIndex = $(".choose-enemy").index(this);
                $("#current-enemy").append($(this));
                goblins.currentEnemy = goblins.goblinArray[gobIndex];
                game.enemySelect = true;
            }

            goblins.goblinArray.splice(gobIndex, 1);
        }
    });

    $("button").on("click", function(e) {
        var classString = e.currentTarget.getAttribute('id');
        if (classString.includes('attack-button')) {
            if (goblins.currentHero.currentHP <=0) {
                game.changeCombatText("<div>You died! Click Restart!");
            } else if (game.enemySelect == true) {
                game.attackButton();
            } else {
                game.changeCombatText("<div>There is nothing to attack!");
            }
        } else {
            game.restartGame();
        }
    }),
    
    game.newGame();
    $("#goblin-1-name").text(goblins.goblinArray[0].name);
    $("#goblin-2-name").text(goblins.goblinArray[1].name);
    $("#goblin-3-name").text(goblins.goblinArray[2].name);
    $("#goblin-4-name").text(goblins.goblinArray[3].name);
    game.gobName1.show().arctext({radius: 500});
    game.gobName2.show().arctext({radius: 500});
    game.gobName3.show().arctext({radius: 500});
    game.gobName4.show().arctext({radius: 500});
});