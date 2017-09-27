var gameMap = require("./map");
/*
All of the different types
attack
defense
speed
chance
*/


function type(areaType){

    switch(areaType){
        
        case "plains":
            this.areaType = "Plains"
            this.speedModifier = 1;
            this.chanceModifier = 1;
            this.areaSym = "»"
            break;
        case "river":
            this.areaType = "River"
            this.speedModifier = 1;
            this.chanceModifier = 1;
            this.areaSym = "§"
            break;
            
        case "cave":
            this.areaType = "Cave"
            this.speedModifier = 1;
            this.chanceModifier = 1;
            this.areaSym = "ɵ"
            break;
        case "town":
            this.areaType = "Town"
            this.speedModifier = 1;
            this.chanceModifier = 1;
            this.areaSym = "п"
            break;         
        case "mountains":
            this.areaType = "Mountains"
            this.speedModifier = 0.3;
            this.chanceModifier = 1.5;
            this.areaSym = "ʌ"
            break;
        case "desert":
            this.areaType = "Desert"
            this.speedModifier = 0.6;
            this.chanceModifier = 0.5;
            this.areaSym = "="
            break;
        case "forest":
            this.areaType = "Forest"
            this.speedModifier = 0.7;
            this.chanceModifier = 1.2;
            this.areaSym = "±"
            break;
        default:
            break;
               }
    //this is to test, change
    //percent based 0.00 - 1.00 - 2.00
    
}
//tileType.set(2,Type.snow);
/*
function snow(){
    this.speedModifier = 0.5;
    this.chanceModifier = 1;
}
//tileType.set(3,Type.desert);
function desert(){
    this.speedModifier = 0.5;
    this.chanceModifier = 1;
}
//tileType.set(4,Type.plain);
function plain(){
    this.speedModifier = 1.5;
    this.chanceModifier = 1;
}
//tileType.set(5,Type.mountain);
function mountain(){
    this.speedModifier = 0.5;
    this.chanceModifier = 1;
}
//tileType.set(6,Type.forest);
function forest(){
    this.speedModifier = 1;
    this.chanceModifier = 1;
}
//tileType.set(7,Type.heavyforest);
function heavyforest(){
    this.speedModifier = 0.7;
    this.chanceModifier = 1;
}
*/
module.exports = type;