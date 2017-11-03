function Item(name,type,weight,itemLevel,atkdef) {

        this.name = name;
        this.type = type;
        this.weight = weight;
        this.itemLevel = itemLevel;
        this.equipped = false;
    
    
    if(type = "weapon"){
        this.attack = atkdef;
        
    }else{
        this.defense = atkdef;
    }
        
        
    
    //we want to have a damage/def for either one.
 
}



module.exports = Item;