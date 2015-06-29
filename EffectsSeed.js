var EffectsSeed = (function(){
    var effects = [
        {
            id: 'nya',
            'description': 'Make character more charming.',
            time: 600, // milliseconds
            x: 64300,
            y: 36000,
            w: 100,
            h: 85,
            birthdate: +new Date()
        },
        {
            id: 'nya',
            'description': 'Make character more charming.',
            time: 600, // milliseconds
            x: 63500,
            y: 36100,
            w: 100,
            h: 85,
            birthdate: +new Date()
        }
    ];

    //some interaction with db for get all effects. !!!AUGMENTED NOW!!!...

    return {
        getEffectsToSeed: function(){
            return effects; // return all effect just for while
        }
    };
})();
exports.EffectsSeed = EffectsSeed;