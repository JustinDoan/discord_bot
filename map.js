var tile = require("./tile")
var type = require("./type")


var mainMap = [
    
    [new tile("plains"),new tile("plains"),new tile("forest")],
    [new tile("plains"),new tile("forest"),new tile("forest")],
    [new tile("desert"),new tile("desert"),new tile("mountains")]


];

function gameMap(){
        this.mapLocation = [0,0];
}


gameMap.prototype.getTileDescription = function(){
    var x = this.mapLocation[0]
    var y = this.mapLocation[1]
    
    var tiletype =  mainMap[x][y].getType();
    
    switch(tiletype.areaType){
            //we can make a switch here for each type of area, and then add modifiers according to certain objects we hold or not.
            
        case "plains":
            return "You glance around, seeing a wide swath of golden grass flowing softly with the winds tendrils silding inbetween the blades."
            break;
        case "mountains":

            break;
        case "desert":

            break;
        case "forest":

            break;
        default:
            break;
                            }
}



gameMap.prototype.getTiletype = function(mapLocation){

    var firstArray = mainMap[mapLocation[0]];
    //console.log("Got first array")
    //console.log(firstArray);
    var tileObject = firstArray[mapLocation[1]];
    //console.log(tileObject);
    //console.log("Before tile.prototype.gettype");
    //console.log(tile.prototype.getType(tileObject));
    var typeReturn = tile.prototype.getType(tileObject)
    var stringsToReturn = [];
    
    
    stringsToReturn.push("Area Type: " + typeReturn["areaType"]);
    stringsToReturn.push("Speed Modifier: " + typeReturn["speedModifier"]);
    stringsToReturn.push("Chance Modifier: " + typeReturn["chanceModifier"]);
    //console.log(stringsToReturn)                 
    return stringsToReturn;
    
    
}

gameMap.prototype.move = function(direction){
     
    
    
    switch(direction){
            
        case "north":
            if(this.mapLocation[0] - 1 === mainMap.length - mainMap.length - 1){
                this.mapLocation[0] = mainMap.length - 1;
            }else{
                this.mapLocation[0] -= 1;
            }
            
            break;
        case "south":
            if(this.mapLocation[0] + 1 === mainMap.length){
                this.mapLocation[0] = mainMap.length - mainMap.length;
            }else{
                this.mapLocation[0] += 1;
            }
            
            
            break;
        case "west":
            if(this.mapLocation[1] - 1 === mainMap[0].length - mainMap[0].length - 1){
                this.mapLocation[1] = mainMap[0].length - 1;
            }else{
                this.mapLocation[1] -= 1;
            }
            
            break;
        case "east":
            if(this.mapLocation[1] + 1 === mainMap[0].length){
                this.mapLocation[1] = mainMap[0].length - mainMap[0].length;
            }else{
                this.mapLocation[1] += 1;
            }
            break;
                    }
}


gameMap.prototype.displayMap = function(){
    var display = [["-","-","-","\n"],["-","-","-","\n"],["-","-","-","\n"]]

    //get location of player

    firstCoord = this.mapLocation[0]
    secondCoord = this.mapLocation[1]
    //console.log("Is it this?")
    display[firstCoord][secondCoord] = "X"
    //console.log("is it this instead")
    var typeArray = gameMap.prototype.getTiletype(this.mapLocation);
    //console.log(typeArray)
    display =    "〰〰〰〰" + "\n" +
              "|"+display[0][0]+"|"+display[0][1]+"|"+display[0][2]+"|          " +  typeArray[0] + "\n" +
              "|"+display[1][0]+"|"+display[1][1]+"|"+display[1][2]+"|          " +  typeArray[1] + "\n" +
              "|"+display[2][0]+"|"+display[2][1]+"|"+display[2][2]+"|          " +  typeArray[2] + "\n" +
                 "〰〰〰〰" 
    
    
    return display;
}


module.exports = gameMap;