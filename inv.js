var underscore = require('underscore');

function inventory(){
        this.items = [];
        this.gold = 0;

}


inventory.prototype.getItems = function(){
    var itemList = "";
    var itemArray = [];
    var flag = true;
    //console.log("Getting Item List");
    for(i=0;i<this.items.length; i++){
        //console.log(i);
        
       for(v=0;v<itemArray.length; v++){
           //console.log(v);
           
           
           try{
               //console.log(this.items[i].name + "is being compared to " + itemArray[v][0].name + "\n");
               //console.log(underscore.isEqual(this.items[i],itemArray[v][0]));
               if(underscore.isEqual(this.items[i],itemArray[v][0])){
                   flag = false;
                    itemArray[v][1] = itemArray[v][1] + 1;
                    //console.log("Found same item");
               }else{
                   
               }
           }catch(err){
               //push item to array if we out of bounds, usually due to first item.
               //itemArray.push([this.items[i],1])
               //console.log("out of array bounds error")
               break;
           }
           
           
       }
       if(flag){
           if(this.items[i].equipped){
               //console.log("Item was already equipped")
               //break;
           }else{
               //console.log("Item was not equipped, added to list to display")
               itemArray.push([this.items[i],1])
           }
           
           
       }
       
        
        
    //console.log(itemArray);    
        
        //spaces for spacing
       //itemList = itemList + "\["+this.items[i].name +"\]" + "\n       "
        
    }
    
    //console.log("At print for loop");
    for(i=0;i<itemArray.length;i++){
        //console.log("added item");
        itemList = itemList + "\["+itemArray[i][0].name +"\] x" + itemArray[i][1] + "\n       "
    }
    
    
    
    
    return itemList;
    
    //underscore.isEqual(object,object) to compare two objects
}
inventory.prototype.inspect = function(itemToInspect){
    var itemInfo = "";
    
    for(i=0;i<this.items.length; i++){
        //console.log(this.items[i].name === itemToInspect);
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
inventory.prototype.getItemByName = function(itemName){
    
    //if we need to get an item object when we only have the name of the item

    for(i=0;i<this.items.length; i++){
        //console.log(this.items[i].name === itemToInspect);
        if(this.items[i].name === itemName){
            
               return this.items[i];
        }
        
        
    }
    
    
    
    
    
    
}

module.exports = inventory;