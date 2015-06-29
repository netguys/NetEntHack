/**************************************************
 ** GAME Food CLASS
 **************************************************/
var Food = {
    //var x = startX,
    //    y = startY,
    //    id;

    size : 64,

    food : [
        {x: 1, y : 1},
        {x: 200, y : 200}
    ],

    getFood : function() {
        return this.food;
    },

    deleteFood : function(obj) {
        for (var i = 0; i < this.food.length; i++) {
            if ( this.food[i].x === obj.x && this.food[i].y === obj.y ) {
                this.food.splice(i, 1);
            }
        }
    }
};

exports.Food = Food;