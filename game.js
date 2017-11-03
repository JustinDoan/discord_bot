
var player = require("./player");
var gameMap = require("./map");
var inventory = require("./inv");



function game(userId,gameState,messageObject){
        this.player = new player(userId);
        this.inventory = new inventory();
        this.gameState = gameState;
        this.gameMap = new gameMap();
        this.messageObject = messageObject;
        this.currentEnemy = null;
        this.battleState = false;
    }
    

game.prototype.setGameState = function(gameState){
        this.gameState = gameState;
    }

module.exports = game;