var type = require("./type")

function tile(areaType){
        this.type = new type(areaType);
        

}

tile.prototype.getType = function(tile){
    return tile.type;
}
module.exports = tile;