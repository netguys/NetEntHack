/**
 * Created by Treem on 05.06.2015.
 */

class PlayerView extends View {

    initAnimations() {
        var me = this,
            list = Render.createList(),

            //var    renderTexture = new PIXI.RenderTexture(Render, 534, 134);
            //renderTexture.render(sprite);
            //renderTexture.frame = (new PIXI.Rectangle(0,0,89,134));
            ////var    texture = new PIXI.Texture(renderTexture);
            player = PIXI.Sprite.fromImage('img/cat.png');


        me.players = {};

        me.model.storeData('initAnimationsDone', true);
        player.z = 10;

        player.anchor.x = 0.5;
        player.anchor.y = 0.5;

        player.position.x = me.model.readData('x');
        player.position.y = me.model.readData('y');
        player.rotation = me.model.readData('rotation');

        //player.frame = new PIXI.Rectangle(0,0,89,134);

        Render.addToStage(list, player);

        me.player = player;

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
        newPlayer.rotation = playerData.rotation;

        Render.addToStage(list, newPlayer);

        me.players[playerData.id] = newPlayer;

        return newPlayer;
    }

    updatePlayer(data) {
        var me = this,
            player = me.players[data.id];

        if (player) {
            player.position.x = data.x;
            player.position.y = data.y;
            player.scale.x = data.hp ? data.hp : 1;
            player.scale.y = data.hp ? data.hp : 1;
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

    updateMe() {
        var me = this,
            player = me.player;

        //if (player) {
            player.position.x = me.model.readData('x');
            player.position.y = me.model.readData('y');
            player.rotation = me.model.readData('rotation');
        //}


    }
}