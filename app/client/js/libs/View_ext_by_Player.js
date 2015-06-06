/**
 * Created by Treem on 05.06.2015.
 */

class PlayerView extends View {

    initAnimations() {
        var me = this,
            list = Render.createList(),
            player = PIXI.Sprite.fromImage('img/cat.png');

        me.players = {};

        me.model.storeData('initAnimationsDone', true);

        me.list = list;
    }

    createPlayerItem(playerData) {
        var me = this,
            list = me.list,
            newPlayer = PIXI.Sprite.fromImage('img/cat.png');

        newPlayer.z = 10;

        newPlayer.anchor.x = 0.5;
        newPlayer.anchor.y = 0.5;

        newPlayer.position.x = playerData.x;
        newPlayer.position.y = playerData.y;
        newPlayer.rotation = 0;

        Render.addToStage(list, newPlayer);

        me.players[playerData.id] = newPlayer;
    }

    updatePlayer(data) {
        var me = this,
            player = me.players[data.id];

        if (player) {
            player.position.x = data.x;
            player.position.y = data.y;
            player.rotation = data.rotation ? data.rotation : 0;
        }


    }

    removePlayerItem(id){
        var me = this,
            list = me.list,
            player = me.players[id];

        Render.removeFromStage(list, player);

        delete me.players[id]
    }

    updateMe(id) {
        var me = this,
            player = me.players[id];

        if (player) {
            player.position.x = me.model.readData('x');
            player.position.y = me.model.readData('y');
            player.rotation = me.model.readData('rotation');
        }


    }
}