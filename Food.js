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
    }
};

exports.Food = Food;