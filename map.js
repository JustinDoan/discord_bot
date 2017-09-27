var tile = require("./tile")
var type = require("./type")


var mainMap = [
    
    [new tile("plains"),    new tile("plains"),  new tile("river"),      new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("river"),      new tile("river"),  new tile("forest"),  new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("cave"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("town"),  new tile("river"),  new tile("river"),      new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("desert"),     new tile("desert"), new tile("river"),      new tile("river"),  new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("desert"),     new tile("desert"), new tile("desert"),  new tile("river"),  new tile("river"),      new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("desert")],
    [new tile("plains"),    new tile("desert"), new tile("desert"),  new tile("desert"), new tile("desert"),  new tile("desert"), new tile("river"),      new tile("river"),  new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("desert")],
    [new tile("cave"),    new tile("desert"), new tile("desert"),     new tile("desert"), new tile("desert"),  new tile("desert"), new tile("desert"),  new tile("river"),  new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("river"),new tile("desert"),new tile("desert")],
 

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

    //console.log(typeArray)
    var display = "" + " ";
       for(var a =0;a < mainMap[0].length; a++){
           display = display  +"IIII"
       }
    display = display + "I\n"
    
    
    
   for(var i =0;i < mainMap.length;i++){
       display = display + i + "| "
       for(var a =0;a < mainMap[i].length; a++){
           
           if(i == this.mapLocation[0] && a == this.mapLocation[1]){
                display = display  + "x"
               display = display + " | "
           }else{
               //console.log(mainMap[i][a])
               display = display  + mainMap[i][a].type.areaSym
               display = display + " | "
           }
           
       }
       display = display + "\n"
   }
    display = display  + " "
    for(var a =0;a < mainMap[0].length; a++){
           display = display +  "IIII"
    }
    display = display + "I\n" +" "
    for(var a =0;a < mainMap[0].length; a++){
        
        if(a>9){
            display = display + "| "+a+""
        }else{
            display = display + "| "+a+" "
        }
           
    }
    display = display + "|\n\n"
    
    display = display + "Key:  »:Plains   ʌ:Mountains   =:Desert   ±:Forest   п:Town   §:River   ɵ:Cave"
    return display;
}


module.exports = gameMap;