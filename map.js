var tile = require("./tile")
var type = require("./type")


var mainMap = [
    
    [new tile("plains"),    new tile("cave"),  new tile("river"),      new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("river"),      new tile("river"),  new tile("forest"),  new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("cave"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("town"),  new tile("river"),  new tile("river"),      new tile("forest"), new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("plains"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("desert"),     new tile("desert"), new tile("river"),      new tile("river"),  new tile("forest"),  new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("river")],
    [new tile("plains"),    new tile("plains"), new tile("desert"),     new tile("desert"), new tile("desert"),  new tile("river"),  new tile("river"),      new tile("forest"), new tile("forest"), new tile("forest"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("desert")],
    [new tile("plains"),    new tile("desert"), new tile("desert"),  new tile("desert"), new tile("desert"),  new tile("desert"), new tile("river"),      new tile("river"),  new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("plains"),new tile("river"),new tile("desert")],
    [new tile("cave"),    new tile("desert"), new tile("desert"),     new tile("desert"), new tile("desert"),  new tile("desert"), new tile("desert"),  new tile("river"),  new tile("forest"), new tile("forest"),new tile("mountains"),new tile("mountains"),new tile("mountains"),new tile("forest"),new tile("forest"),new tile("plains"),new tile("river"),new tile("desert"),new tile("desert")],
 

];

var cave = [
    [new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),],
    [new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),],
    [new tile("cave"),new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),],
    [new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),new tile("rock"),]
]

function gameMap(){
        this.mapLocationMain = [0,0];
        this.mapLocationCave = [0,0];
        this.currentMap = "main";
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


//not being used yet
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

gameMap.prototype.enter = function(){
    
    
    //var first = this.mapLocationMain[0]
    //var second = this.mapLocationMain[1]
    
    if(this.currentMap == "main"){
        //console.log("Map is main");
        var first = this.mapLocationMain[0];
        var second = this.mapLocationMain[1];
        
        //console.log(first,second);
//console.log(mainMap[first][second].type);
        if(mainMap[first][second].type.areaType == "Cave"){
            //console.log("Set currentMap to Cave");
            this.currentMap = "cave";
            
            return true;
        }else{
           return false;
        }
        
        
        
    }else if(this.currentMap == "cave"){
        //console.log("Map is cave");
        var first = this.mapLocationCave[0];
        var second = this.mapLocationCave[1];
        
        
        if(cave[first][second].type.areaType == "Cave"){
            //console.log("Set currentMap to Main");
            this.currentMap = "main";
            return true;
        }else{
            //don't leave cave
            return false;
        }
    }
        
    
    
}



//have to make this work somehow
gameMap.prototype.move = function(direction){
     
    //we can copy paste this switch for each map
    //or make an if else to select the map to use.
    
    if(this.currentMap == "cave"){
        
        var Map = cave;
        var mapLocation = this.mapLocationCave;
    }else{
        
        var Map = mainMap;
        var mapLocation = this.mapLocationMain;
    }
    
    
    
    switch(direction){
            
        case "north":
            if(mapLocation[0] - 1 === Map.length - Map.length - 1){
                mapLocation[0] = Map.length - 1;
            }else{
                mapLocation[0] -= 1;
            }
            
            break;
        case "south":
            if(mapLocation[0] + 1 === Map.length){
                mapLocation[0] = Map.length - Map.length;
            }else{
                mapLocation[0] += 1;
            }
            
            
            break;
        case "west":
            if(mapLocation[1] - 1 === Map[0].length - Map[0].length - 1){
                mapLocation[1] = Map[0].length - 1;
            }else{
                mapLocation[1] -= 1;
            }
            
            break;
        case "east":
            if(mapLocation[1] + 1 === Map[0].length){
                mapLocation[1] = Map[0].length - Map[0].length;
            }else{
                mapLocation[1] += 1;
            }
            break;
                    }
    
    if(this.currentMap == "cave"){
        
        this.mapLocationCave = mapLocation;
          
    }else{
        
        this.mapLocationMain = mapLocation;
        
    }
    
    
    
}

//also have to make this work somehow
gameMap.prototype.displayMap = function(){

    if(this.currentMap == "cave"){
        
        var mapobject = cave;
        var mapLocation = this.mapLocationCave;
    }else{
        
        var mapobject = mainMap;
        var mapLocation = this.mapLocationMain;
    }
    
    
    
    //console.log(typeArray)
    var display = "" + " ";
       for(var a =0;a < mapobject[0].length; a++){
           display = display  +"IIII"
       }
    display = display + "I\n"
    
    
    
   for(var i =0;i < mapobject.length;i++){
       display = display + i + "| "
       for(var a =0;a < mapobject[i].length; a++){
           
           if(i == mapLocation[0] && a == mapLocation[1]){
                display = display  + "x"
               display = display + " | "
           }else{
               //console.log(mainMap[i][a])
               display = display  +mapobject[i][a].type.areaSym
               display = display + " | "
           }
           
       }
       display = display + "\n"
   }
    display = display  + " "
    for(var a =0;a < mapobject[0].length; a++){
           display = display +  "IIII"
    }
    display = display + "I\n" +" "
    for(var a =0;a < mapobject[0].length; a++){
        
        if(a>9){
            display = display + "| "+a+""
        }else{
            display = display + "| "+a+" "
        }
           
    }
    display = display + "|\n\n"
    
    display = display + "Key:  »:Plains   ʌ:Mountains   =:Desert   ±:Forest   п:Town   §:River   ɵ:Cave   0:Rock"
    return display;
}


module.exports = gameMap;