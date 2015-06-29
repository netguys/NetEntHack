/**
 * Created by Treem on 05.06.2015.
 */

class PlayerModel extends Model {

    setupData() {
        var me = this;

        me.data.x = 1280/2 * 100;
        me.data.y = 720 / 2 * 100;
        me.data.rotation = 0;
        me.data.rotationSpeed = 0.1;
        me.data.step = 5;
        me.data.frames = [
            {x:0,y:0,width:61,height:56},
            {x:61,y:0,width:61,height:56},
            {x:122,y:0,width:61,height:56},
            {x:183,y:0,width:61,height:56},
            {x:244,y:0,width:61,height:56}
        ];
        me.data.playerImage = {
            image : 'img/2.png',
            width : 309,
            height : 56
        };
        me.data.width = 200;
        me.data.height = 200;

        me.data.remotePlayers = {};
    }

    makeStep(correction) {
        var me = this,
            changedX = me.data.x + me.data.step * Math.cos(me.data.rotation) * correction,
            changedY = me.data.y + me.data.step * Math.sin(me.data.rotation) * correction,
            imageOffsetX = (me.data.playerImage.width / 5) / 2,
            imageOffsetY = me.data.playerImage.height / 2;

        //if (
        //    changedX >= CONFIG.viewportWidth - imageOffsetX  ||
        //    changedX <= imageOffsetX ||
        //    changedY >= CONFIG.viewportHeight - imageOffsetY||
        //    changedY <= imageOffsetX
        //) return;

        me.data.x = changedX;
        me.data.y = changedY;
    }

    addRemotePlayer(data){
        var me = this;

        me.data.remotePlayers[data.id] = data;
    }

    turnPlayer(correction){
        var me = this;

        me.data.rotation = me.data.rotation + me.data.rotationSpeed * correction;
    }

    get x(){
        return this.data.x;
    }

    get y(){
        return this.data.y;
    }

    get rotation(){
        return this.data.rotation;
    }

    get width() {
        return this.data.width;
    }

    get height() {
        return this.data.height;
    }


}