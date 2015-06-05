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

}