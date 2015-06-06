/**
 * Created by Treem on 05.06.2015.
 */

class PlayerModel extends Model {

    setupData() {
        var me = this;

        me.data.x = 300;
        me.data.y = 300;
        me.data.rotation = 0;
        me.data.rotationSpeed = 0.1;
        me.data.step = 5;
        me.data.frames = [
            {x:0,y:0,width:89,height:134},
            {x:89,y:0,width:89,height:134},
            {x:178,y:0,width:89,height:134},
            {x:267,y:0,width:89,height:134}
        ];


        me.data.width = 200;
        me.data.height = 200;
    }

    makeStep(correction) {
        var me = this;

        me.data.x = me.data.x + me.data.step * Math.cos(me.data.rotation) * correction;
        me.data.y = me.data.y + me.data.step * Math.sin(me.data.rotation) * correction;
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