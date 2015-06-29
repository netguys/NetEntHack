class EffectsController extends Controller {

    constructor(view, model) {
        super(view, model);

        this.effects_list = {

        };
    }

    setupEvents() {
        var me = this,
            events;

        events = super.setupEvents();
        events["request:removeUsedEffect"] = me.view.removeSeedEffect.bind(me.view);
        events['request:setEffectOnPlayer'] = me.onUserSetEffect;
        events['request:removeEffectOnPlayer'] = me.onUserRemoveEffect;


        return events;

    }


    seedEffects(effects){
        let me = this;
        effects.forEach(function(effect){
            me.view.addSeedEffect(effect);
        });
    }

    onUserSetEffect(player){
        var me = this;

    }
    onUserRemoveEffect(player){
        var me = this;

    }
    //sendEated(conf) {
    //    var me = this;
    //
    //    socket.emit("eated food", {
    //        eated: true,
    //        x: conf.x,
    //        y: conf.y
    //    });
    //}



    //sendMove() {
    //    var me = this;
    //
    //    //socket.emit("move player", {
    //    //    id: me.myID,
    //    //    x: me.model.x,
    //    //    y: me.model.y,
    //    //    rotation: me.model.rotation,
    //    //    width : me.model.width,
    //    //    height : me.model.height
    //    //});
    //}

}