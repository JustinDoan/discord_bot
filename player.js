function player(UserId){
        this.UserId = UserId;
        this.health = 10;
        this.maxHealth = 10;
        this.mana = 20;
        this.maxMana = 20;
        this.carryLimit = 100;
        this.speed = 1.0;
        this.chance = 1.0;
}


    player.prototype.getName = function(){
        return this.UserId;
    } 
    player.prototype.takeDamage = function(damage){
        this.health = this.health - damage
        if (this.health < 1){
            player.prototype.die();
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
    
    
    
module.exports = player;