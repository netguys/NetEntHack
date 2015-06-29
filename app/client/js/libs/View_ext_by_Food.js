/**
 * Created by Treem on 05.06.2015.
 */

class FoodView extends View {

    initAnimations() {
        var me = this,
            texture;

        me.foods = [];
    }

    createFood (arg) {
        let me = this,
            list,
            texture;

        list = Render.createList();

        texture = PIXI.Texture.fromImage('img/food.png');

        arg.forEach(function(param) {
            me.food = new PIXI.extras.TilingSprite(texture);

            me.food.scale.x = 0.25;
            me.food.scale.y = 0.25;

            me.food.position.x = param.x;
            me.food.position.y = param.y;

            me.food.z = 2;

            me.food.width = 256;
            me.food.height = 256;

            me.list = list;

            me.foods.push(me.food);

            Render.addToStage(me.list, me.food);
        });

    }

    deleteFood (data) {
        var me = this;


        //please, fix me!
        me.foods.forEach(function(food) {
            if ( food.x === data.x && food.y === data.y ) {
                food.scale.x = 0;
                food.scale.y = 0;


            }
        })

    }


    //createPlayerItem(playerData) {
    //    var me = this,
    //        list = Render.createList(),
    //        imageConf = me.model.readData('playerImage'),
    //        baseTexture = PIXI.BaseTexture.fromImage(imageConf.image);
    //
    //    baseTexture.width = imageConf.width;
    //    baseTexture.height = imageConf.height;
    //
    //
    //    var texture = new PIXI.Texture(baseTexture),
    //        newPlayer;
    //
    //    texture.frame = me.model.readData('frames')[0];
    //    newPlayer = new PIXI.Sprite(texture);
    //
    //
    //    me.players = {};
    //
    //    me.model.storeData('initAnimationsDone', true);
    //    newPlayer.z = 10;
    //
    //    newPlayer.anchor.x = 0.5;
    //    newPlayer.anchor.y = 0.5;
    //
    //    newPlayer.position.x = me.model.readData('x');
    //    newPlayer.position.y = me.model.readData('y');
    //    newPlayer.rotation = me.model.readData('rotation');
    //    newPlayer.frameCounter = 0;
    //
    //    Render.addToStage(list, newPlayer);
    //
    //
    //    me.players[playerData.id] = newPlayer;
    //
    //    return newPlayer;
    //}
    //
    //changeSprite(player){
    //    var me = this,
    //        player = player || me.player,
    //        frames = me.model.readData('frames');
    //    me.setFrameCounter(player);
    //    player.texture.frame = frames[player.frameCounter];
    //}
    //
    //
    //setFrameCounter(player){
    //    player.frameCounter++;
    //    player.frameCounter < 0 ? player.frameCounter = 3 : player.frameCounter > 3 ? player.frameCounter = 0 :
    //        player.frameCounter = player.frameCounter;
    //}
    //
    //updatePlayer(data) {
    //    var me = this,
    //        player = me.players[data.id],
    //        frames = me.model.readData('frames');
    //    me.changeSprite(player);
    //    if (player) {
    //
    //        player.position.x = data.x;
    //        player.position.y = data.y;
    //        player.scale.x = data.hp ? data.hp : 1;
    //        player.scale.y = data.hp ? data.hp : 1;
    //        player.rotation = data.rotation ? data.rotation : 0;
    //    }
    //}
    //
    //createLocalPlayer (data) {
    //    var me = this,
    //        imageConf = me.model.readData('playerImage'),
    //        baseTexture = PIXI.BaseTexture.fromImage(imageConf.image);
    //
    //    baseTexture.width = imageConf.width;
    //    baseTexture.height = imageConf.height;
    //
    //
    //    var texture = new PIXI.Texture(baseTexture),
    //        player;
    //
    //    texture.frame = me.model.readData('frames')[0];
    //    player = new PIXI.Sprite(texture);
    //
    //
    //    me.players = {};
    //
    //    me.model.storeData('initAnimationsDone', true);
    //    player.z = 10;
    //
    //    player.anchor.x = 0.5;
    //    player.anchor.y = 0.5;
    //
    //    player.position.x = data.x;
    //    player.position.y = data.y;
    //    player.rotation = data.rotation;
    //
    //    //player.width = data.width;
    //    //player.height = data.height;
    //    player.frameCounter = 0;
    //
    //
    //    Render.addToStage(me.list, player);
    //
    //    me.player = player;
    //}
    //
    //removePlayerItem(id){
    //    var me = this,
    //        list = me.list,
    //        player = me.players[id];
    //
    //    Render.removeFromStage(list, player);
    //
    //    delete me.players[id]
    //}
    //
    //updateMe() {
    //    var me = this,
    //        player = me.player;
    //
    //    if (!player) return;
    //
    //    player.position.x = me.model.readData('x');
    //    player.position.y = me.model.readData('y');
    //    player.rotation = me.model.readData('rotation');
    //
    //}
}