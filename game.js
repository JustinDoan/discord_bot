
var player = require("./player");
var gameMap = require("./map");
var inventory = require("./inv");



function game(userId,gameState){
        this.player = new player(userId);
        this.inventory = new inventory();
        this.gameState = gameState;
        this.gameMap = new gameMap();
    }
    

game.prototype.setGameState = function(gameState){
        this.gameState = gameState;
    }

module.exports = game;