function enemy(type,level) {
    
    // convert level into decimal for multiplying stats
        
    
    
    
        switch(type){
        
        case "goblin":
            this.health = 10 + (10 * level);
            this.atk = 1 + (1 * level);
            this.def = 1 + (1 * level);
            this.speed = .5 + (.5 * level);
            this.alive = true;
            this.enemyName = "Goblin";
            break;
        case "orc":
            this.health = 10 + (10 * level);
            this.atk = 1 + (1 * level);
            this.def = 1 + (2 * level);
            this.speed = .5 + (.5 * level);
            this.alive = true;
            this.enemyName = "Orc";
            break;
            
        case "elf":
            this.health = 10 + (10 * level);
            this.atk = 1 + (2 * level);
            this.def = 1 + (1 * level);
            this.speed = .5 + (.5 * level);
            this.alive = true;
            this.enemyName = "Elf";
            break;
        default:
            break;
               }
    
    
    
    
    
        
 
}


enemy.prototype.takeDamage = function(damage){
    
    this.health = this.health - damage;

    
}

enemy.prototype.checkIfDead = function(){
    
    //we double check that the enemy is really dead
    //could also call this the update function
    //but really we're just checking if the enemy is dead
    if(this.health > 0){
        return false;
    }else{
        return true;
    } 
    //we simply delete the object by removing any refrence to it, so set current enemy in our gamefile to null.
    //we have to do this in the main app, we're just checking if enemy is dead for sure.
    //we return true for dead, false for not dead, we can call this everytime an action is done.
    
}   
    
    

module.exports = enemy;