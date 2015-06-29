class EffectsView extends View {

    initAnimations() {
        let me = this,
            effects = {};
        me.seed_effects = effects;

        window.ev = this;
        //Render.addToStage(me.list, me.food);
    }

    addSeedEffect(effect){
        let me = this,
            texture,
            effectItem;

        texture = PIXI.Texture.fromImage('img/cat.png');
        effectItem = new PIXI.extras.TilingSprite(texture);

        effectItem.guid = effect.guid;
        effectItem.scale.x = 0.5;
        effectItem.scale.y = 0.5;

        effectItem.position.x = effect.x || 100;
        effectItem.position.y = effect.y || 300;

        effectItem.z = 200;

        effectItem.width = effect.width || 100;
        effectItem.height = effect.height || 100;
        me.seed_effects[effect.guid] = effectItem;
        Render.addMovable(effectItem);

    }
    removeSeedEffect(effect){
        let me = this;
        me.seed_effects[effect.guid].scale.x = 0;
        me.seed_effects[effect.guid].scale.y = 0;
        //delete me.seed_effects[effect.guid];

    }

}