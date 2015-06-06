/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function(startX, startY, startRotation, startHp, width, height) {
    var x = startX,
        y = startY,
        hp = startHp || 1,
        width = width || 1,
        height = height || 1,
        rotation = startRotation || 0,

        id;

    // Getters and setters
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getWidth = function() {
        return width * hp;
    };

    var getHeight = function() {
        return height * hp;
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

    var getHp = function() {
        return hp;
    };

    var setHp = function(startHp) {
        hp = startHp;
    };

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getRotation : getRotation,
        setRotation : setRotation,
        getHp: getHp,
        setHp: setHp,
        getWidth : getWidth,
        getHeight : getHeight,
        id: id
    }
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;