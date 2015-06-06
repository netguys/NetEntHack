/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function(startX, startY, startRotation) {
    var x = startX,
        y = startY,
        rotation = startRotation,
        id;

    // Getters and setters
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    var getRotation = function() {
        return rotation;
    };

    var setRotation = function(newRotation) {
        rotation = newRotation;
    };

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getRotation : getRotation,
        setRotation : setRotation,
        id: id
    }
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;