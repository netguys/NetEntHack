/**
 * Created by Treem on 05.06.2015.
 */

class PlayerView extends View {

    initAnimations() {
        var me = this,
            list = Render.createList();


        me.list = list;
    }

    createPlayerItem(playerData) {
        var me = this,
            list = Render.createList(),
            playerData = me.model.readData("remotePlayers")[playerData.id],
            imageConf = me.model.readData('playerImage'),
            baseTexture = PIXI.BaseTexture.fromImage(imageConf.image);

        baseTexture.width = imageConf.width;
        baseTexture.height = imageConf.height;

        var texture = new PIXI.Texture(baseTexture),
            newPlayer;

        texture.frame = me.model.readData('frames')[0];
        newPlayer = new PIXI.Sprite(texture);


        me.players = {};

        me.model.storeData('initAnimationsDone', true);
        newPlayer.z = 10;

        newPlayer.anchor.x = 0.5;
        newPlayer.anchor.y = 0.5;

        newPlayer.position.x = playerData ? playerData.x : me.model.readData('x');
        newPlayer.position.y = playerData ? playerData.y : me.model.readData('y');

        newPlayer.rotation = playerData ? playerData.rotation : me.model.readData('rotation');
        newPlayer.frameCounter = 0;

        Render.addMovable(newPlayer);

        me.players[playerData.id] = newPlayer;

        return newPlayer;
    }

    changeSprite(player){
        var me = this,
            player = player || me.player,
            frames = me.model.readData('frames');
        me.setFrameCounter(player);
        player.texture.frame = frames[player.frameCounter];
    }


    setFrameCounter(player){
        player.frameCounter++;
        player.frameCounter < 0 ? player.frameCounter = 3 : player.frameCounter > 3 ? player.frameCounter = 0 :
            player.frameCounter = player.frameCounter;
    }

    updatePlayer(data) {
        var me = this,
            player = me.players[data.id],
            frames = me.model.readData('frames');


        me.changeSprite(player);


        if (player) {
            player.position.x = data.x;
            player.position.y = data.y;
            player.scale.x = data.hp ? data.hp : 1;
            player.scale.y = data.hp ? data.hp : 1;
            player.rotation = data.rotation ? data.rotation : 0;
        }
    }

    createLocalPlayer (data) {
        var me = this,
            envPos = {},
            imageConf = me.model.readData('playerImage'),
            baseTexture = PIXI.BaseTexture.fromImage(imageConf.image);

        baseTexture.width = imageConf.width;
        baseTexture.height = imageConf.height;


        var texture = new PIXI.Texture(baseTexture),
            player;

        texture.frame = me.model.readData('frames')[0];
        player = new PIXI.Sprite(texture);


        me.players = {};

        me.model.storeData('initAnimationsDone', true);
        player.z = 10;

        player.anchor.x = 0.5;
        player.anchor.y = 0.5;

        player.position.x = 1280/2;
        player.position.y = 720/2;
        envPos.x = -data.x;
        envPos.y = -data.y;
        Render.moveMovable(envPos);
        player.rotation = data.rotation;

        //player.width = data.width;
        //player.height = data.height;
        player.frameCounter = 0;

        Render.addStatic(player);
        //Render.addToStage(me.list, player);

        me.player = player;
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
            envPos = {},
            player = me.player;

        if (!player) return;

        envPos.x = 1280/2 - me.model.readData('x');
        envPos.y = 720/2 - me.model.readData('y');
        Render.moveMovable(envPos);
        //player.position.x = me.model.readData('x');
        //player.position.y = me.model.readData('y');
        player.rotation = me.model.readData('rotation');

    }
}