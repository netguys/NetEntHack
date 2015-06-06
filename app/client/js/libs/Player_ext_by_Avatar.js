/**
 * Created by Treem on 05.06.2015.
 */

class Avatar extends Player {

    constructor(initX, initY) {
        super();
        this._item = null;
        super.setCoords(initX, initY);
    }

    createPIXIItem() {
        var me = this;


        // create a texture from an image path
        var texture = PIXI.Texture.fromImage('img/cat.png');

        // create a new Sprite using the texture
        me._item = new PIXI.Sprite(texture);

        // center the sprite's anchor point
        me._item.anchor.x = 0.5;
        me._item.anchor.y = 0.5;

        me._item.z = 10;

        this.setCoordsToItem();
    }

    updateUser(){
        super.updateUser();
        this.setCoordsToItem();
    }

    makeStep(){
        super.makeStep();
    }

    getItem() {
        return this._item;
    }

    setCoordsToItem(){
        var me = this;

        // move the sprite to the center of the screen
        me._item.position.x = me._x;
        me._item.position.y = me._y;
        me._item.rotation = me._directionAngle;

    }

}