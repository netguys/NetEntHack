var Collider = (function(){

    function checkUsersCollide(item1, item2){
        return ((item1.getX() + item1.getWidth() >= item2.getX()
            && item1.getX() + item1.getWidth() <= item2.getX() + item2.getWidth())
            || (item1.getX() >= item2.getX()
            && item1.getX() <= item2.getX() + item2.getWidth()))

        && ((item1.getY() + item1.getHeight() >= item2.getY()
            && item1.getY() + item1.getHeight() <= item2.getY() + item2.getHeight())
            || (item1.getY() >= item2.getY()
            && item1.getY() <= item2.getY() + item2.getHeight()));
    }
    
    function checkSimpleCollide(rect1, rect2) {
        return  (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y)
    }
    
    return {
        checkUsersCollide: checkUsersCollide,
        checkSimpleCollide : checkSimpleCollide
    };
})();
exports.Collider = Collider;