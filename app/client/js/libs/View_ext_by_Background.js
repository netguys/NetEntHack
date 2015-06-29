/**
 * Created by Treem on 05.06.2015.
 */

class BackgroundView extends View {


    initAnimations() {
        var me = this,
            list = Render.createList(),
            texture = PIXI.Texture.fromImage('img/grass.png'),
            background = new PIXI.extras.TilingSprite(texture);

        //console.log(background);

        background.position.x = 0;
        background.position.y = 0;

        background.z = 0;

        background.width = CONFIG.viewportWidth * 100;
        background.height = CONFIG.viewportHeight * 100;

        //background.scale.x = 3;
        //background.scale.y = 3;

        //background.tilePosition.x = 0;
        //background.tilePosition.y = 0;

        //background.width = 1;
        //background.height = 0.8;

        //background.rotation = 0;

        // center the sprite's anchor point
        //me._item.anchor.x = 0.5;
        //me._item.anchor.y = 0.5;

        //Render.addToStage(list, background);
        Render.addMovable(background);

    }

}