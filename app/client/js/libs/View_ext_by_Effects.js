class EffectsView extends View {

    initAnimations() {
        var me = this,
            texture,
            list = Render.createList();

        texture = PIXI.Texture.fromImage('img/food.png');
        me.food = new PIXI.extras.TilingSprite(texture);

        me.food.scale.x = 0.25;
        me.food.scale.y = 0.25;

        me.food.position.x = 0;
        me.food.position.y = 0;

        me.food.z = 45;

        me.food.width = 256;
        me.food.height = 256;

        me.list = list;

        Render.addToStage(me.list, me.food);
    }

}