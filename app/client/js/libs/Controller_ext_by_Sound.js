/**
 *  Created by Yurgeen on 05.06.2015.
 *
 */

class SoundController extends Controller {

    constructor(view, model) {
        super(view, model);
        var me = this;
    }

    setupEvents() {
        var me = this,
            events = super.setupEvents();

        events["playSound"] = me.onPlaySound;
        events["stopSound"] = me.onStopSound;
        events["pauseSound"] = me.onPauseSound;
        events["unpauseSound"] = me.onUnpauseSound;

        return events;
    }

    onPlaySound(soundID, loop) {
        var me = this,
            sample = me.model.getSample(soundID);
        sample.loop = loop || false;
        sample.start(0);
    }

    onStopSound(soundID) {

    }

    onPauseSound(soundID) {

    }

    onUnpauseSound(soundID) {

    }
}