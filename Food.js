/**************************************************
 ** GAME Food CLASS
 **************************************************/
var Food = function(startX, startY) {
    var x = startX,
        y = startY,
        id;

    // Getters and setters
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        id: id
    }
};

exports.Food = Food;