
class SoundModel extends Model {

    setupData() {
        var me = this;
        me._sounds = {};

        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            me._context = new AudioContext();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    getSample(soundId) {
        var me = this,
            source = me._context.createBufferSource();
        if (!me._sounds[soundId]) {
            console.log('Cannot find sound ' + soundId);
        }
        source.buffer = me._sounds[soundId];
        source.connect(me._context.destination);
        return source;
    }

    loadSounds(config, onReady) {
        var me = this,
            key, request;

        me._soundsLoaded = 0;
        me._soundsToLoad = Object.keys(config).length;

        for (key in config) {
            request = new XMLHttpRequest();
            request.open('GET', config[key], true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = (function (k, r) {
                return function () {
                    me._context.decodeAudioData(r.response, function (buffer) {
                        me._sounds[k] = buffer;
                        me._onSoundDecoded(onReady);
                    }, undefined);
                }
            }) (key, request);
            request.send();
        }
    }

    _onSoundDecoded(callback) {
        var me = this;
        me._soundsLoaded++;
        if (me._soundsLoaded === me._soundsToLoad) {
            console.log(callback);
            callback();
        }
    }

}