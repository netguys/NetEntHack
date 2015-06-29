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
    return {
        checkUsersCollide: checkUsersCollide
    };
})();
exports.Collider = Collider;