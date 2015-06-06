/**
 * Created by Treem on 05.06.2015.
 */

class PlayerView extends View {

    initAnimations() {
        var me = this,
            list = Render.createList();

        me.players = {};
        me.list = list;
    }

    createPlayerItem(playerData) {
        var me = this,
            list = me.list,
            newPlayer = PIXI.Sprite.fromImage('img/cat.png');


        newPlayer.width = playerData.width;
        newPlayer.height = playerData.height;

        newPlayer.z = 10;

        newPlayer.anchor.x = 0.5;
        newPlayer.anchor.y = 0.5;

        newPlayer.position.x = playerData.x;
        newPlayer.position.y = playerData.y;
        newPlayer.rotation = playerData.rotation;

        Render.addToStage(this.list, newPlayer);


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

    createLocalPlayer (data) {
        var player = PIXI.Sprite.fromImage('img/cat.png');


        player.z = 10;

        player.anchor.x = 0.5;
        player.anchor.y = 0.5;

        player.position.x = data.x;
        player.position.y = data.y;
        player.rotation = data.rotation;

        player.width = data.width;
        player.height = data.height;

        Render.addToStage(this.list, player);

        this.player = player;
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

        if (!player) return;

        player.position.x = me.model.readData('x');
        player.position.y = me.model.readData('y');
        player.rotation = me.model.readData('rotation');

    }
}