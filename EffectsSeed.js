var EffectsSeed = (function(){
    var effects = [
        {
            id: 'nya',
            'description': 'Make character more charming.',
            time: 600, // milliseconds
            x: 600,
            y: 200,
            width: 100,
            height: 85
        },
        {
            id: 'nya',
            'description': 'Make character more charming.',
            time: 600, // milliseconds
            x: 400,
            y: 200,
            width: 100,
            height: 85
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