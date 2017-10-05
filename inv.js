function inventory(){
        this.items = [];
        this.gold = 0;

}


inventory.prototype.getItems = function(){
    var itemList = "";
    for(i=0;i<this.items.length; i++){
                                                            //spaces for spacing
       itemList = itemList + "\["+this.items[i].name +"\]" + "\n       "
        
    }
    return itemList;
}
inventory.prototype.inspect = function(itemToInspect){
    var itemInfo = "";
    for(i=0;i<this.items.length; i++){
        console.log(this.items[i].name === itemToInspect);
        if(this.items[i].name === itemToInspect){
            
            itemInfo = itemInfo +  this.items[i].name + " Lv. " + this.items[i].itemLevel+ "\n" +
                "   Type: " + this.items[i].type + "\n" +
                "   Weight: " + this.items[i].weight + "\n" 
            itemInfo = itemInfo + "-------------------------------------" + "\n"     
        }
        
        
    }
    
    
    
   return itemInfo; 
}
inventory.prototype.getGold = function(){
    return this.gold;
}
inventory.prototype.addItem = function(item){
    this.items.push(item);
}

module.exports = inventory;