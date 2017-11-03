function player(UserId){
        this.UserId = UserId;
        this.health = 10;
        this.maxHealth = 10;
        this.mana = 20;
        this.maxMana = 20;
        this.carryLimit = 100;
        this.speed = 1.0;
        this.chance = 1.0;
        this.headItem = null;
        this.chestItem = null;
        this.pantsItem = null;
        this.weapon = null;
}


    player.prototype.getName = function(){
        return this.UserId;
    } 
    player.prototype.takeDamage = function(damage){
        this.health = this.health - damage
        if (this.health < 1){
            player.prototype.die();
            //This might not work how i think it will.
        }
        //maybe return health back to function?
    } 
    player.prototype.heal = function(healAmount){
        this.health = this.health + healAmount
        if (this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
        //maybe return amount healed?
    } 
    player.prototype.spendMana = function(manaCost){
        this.mana = this.mana - manaCost;
        
        //maybe return mana amount used? prob need to return whether we can even raise it, maybe return true/false so we can use in if statements easier.
    } 
    player.prototype.gainMana = function(manaAmount){
        this.mana = this.mana + manaAmount;
        if (this.mana > this.maxMana){
            this.mana  = this.maxMana;
        }
    }
    player.prototype.die = function(){
        //Maybe make saves hardcore, erase upon death.
    }
    
    player.prototype.unequip = function(itemToUnequip){
        
        itemsType = itemToUnequip.type;
        itemsType = itemsType.toLowerCase();
        //switch statement to pick the right place to equip item
        
        //we need to check if there is already an item equipped in the slot, so we set the current item equipped to not equipped
        
        
        
        
            //if we get an error, mostly likely because of a null object, we just continue.
        switch(itemsType){
            case "weapon":
                try{this.weapon.equipped = false;}catch(err){}
                this.weapon = null;
                break;
            case "helmet":
                try{this.headItem.equipped = false;}catch(err){}
                this.headItem = null;
                break;
            case "chestplate":
                try{this.chestItem.equipped = false;}catch(err){}
                this.chestItem = null;
                break;
            case "pants":
                try{this.pantsItem.equipped = false;}catch(err){}
                this.pantsItem = null;
                break;
        }
        
        
    }
    player.prototype.equip = function(itemToEquip){
        //here we equip items onto the player.
        
        //we need to check what type the item is and equip it accordlying.


        //we get the item object that's passed through, and set it equal to where it needs to be equiped.

        //we get the type from the item
        itemsType = itemToEquip.type;
        itemsType = itemsType.toLowerCase();
        //switch statement to pick the right place to equip item
        
        //we need to check if there is already an item equipped in the slot, so we set the current item equipped to not equipped
        
        
        
        
            //if we get an error, mostly likely because of a null object, we just continue.
        switch(itemsType){
            case "weapon":
                try{this.weapon.equipped = false;}catch(err){}
                this.weapon = itemToEquip;
                this.weapon.equipped = true;
                break;
            case "helmet":
                try{this.headItem.equipped = false;}catch(err){}
                this.headItem = itemToEquip;
                this.headItem.equipped = true;
                break;
            case "chestplate":
                try{this.chestItem.equipped = false;}catch(err){}
                this.chestItem = itemToEquip;
                this.chestItem.equipped = true;
                break;
            case "pants":
                try{this.pantsItem.equipped = false;}catch(err){}
                this.pantsItem = itemToEquip;
                this.pantsItem.equipped = true;
                break;
        }
        
        
        





    }
    player.prototype.getEquipment = function(){
        
        try{
            var headName = this.headItem.name;
        }catch(err){
            headName = "Nothing Equipped"
        }
        try{
            var chestName = this.chestItem.name;
        }catch(err){
            chestName = "Nothing Equipped"
        }
        try{
            var pantsName = this.pantsItem.name;
        }catch(err){
            pantsName = "Nothing Equipped"
        }
        try{
            var weaponName = this.weapon.name;
        }catch(err){
            weaponName = "Nothing Equipped"
        }
         

        
        
        
        
                               
        var listOfEquipment = "       Head: " +   headName  +    "\n"
        listOfEquipment = listOfEquipment + "       Chestplate: " +  chestName   +    "\n"
        listOfEquipment = listOfEquipment + "       Pants: " +  pantsName   +    "\n"
        listOfEquipment = listOfEquipment + "       Weapon: " +  weaponName   +    "\n"
                                  
        
        return listOfEquipment;
        
    }
    
module.exports = player;