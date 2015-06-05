/**
 * Created by Treem on 05.06.2015.
 */

class PlayerView extends View {

    initAnimations() {
        var me = this,
            list = Render.createList(),
            player = PIXI.Sprite.fromImage('img/cat.png');

        me.player = player;

        me.updatePlayer();

        player.z = 10;

        player.anchor.x = 0.5;
        player.anchor.y = 0.5;


        Render.addToStage(list, me.player);

        me.model.storeData('initAnimationsDone', true);
    }

    updatePlayer(){
        var me = this;

        me.player.position.x = me.model.readData('x');
        me.player.position.y = me.model.readData('y');
        me.player.rotation = me.model.readData('rotation');
    }
}