function Itemtype(itemType) {

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

module.exports = ItemType