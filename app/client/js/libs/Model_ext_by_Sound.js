
class SoundModel extends Model {

    setupData() {
        var me = this;
        me._sounds = {};

        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            me.context = new AudioContext();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    getSound(id) {
        var me = this;
        return me._sounds[id]
    }

    loadSounds(config, onReady) {
        var me = this,
            key, request;

        me._soundsLoaded = 0;
        me._soundsToLoad = config.length;

        for (key in config) {
            request = new XMLHttpRequest();
            request.open('GET', config[key], true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = (function (k, r) {
                return function () {
                    me.context.decodeAudioData(r.response, function (buffer) {
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
        if (me._soundsLoaded === me._sounds._soundsToLoad) {
            callback();
        }
    }

}