function inventory(){
        this.items = [];
        this.gold = 0;

}


inventory.prototype.getItems = function(){
    return this.items;
}
inventory.prototype.getGold = function(){
    return this.gold;
}

module.exports = inventory;