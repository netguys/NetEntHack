/**
 * Created by Treem on 05.06.2015.
 */

class UserInputController extends Controller {

    constructor() {
        super();

        this._prefix = 'notify:userInput.';

        this._keyNames = {
            87: 'moveForward',
            83: 'moveBackward',
            65: 'turnLeft',
            68: 'turnRight',
            32: 'stop'
        };
    }

    start() {
        var me = this;

        document.addEventListener('keydown', me.onKeyDown.bind(me), false);
        document.addEventListener('keyup', me.onKeyUp.bind(me), false);
    }

    getKeyName(keyCode) {
        return this._keyNames[keyCode];
    }

    onKeyDown(event) {
        var me = this,
            keyCode = event.keyCode;

        if (me._keyNames[keyCode]) {
            me.fireEvent(
                me._prefix + me.getKeyName(keyCode),
                true
            );
        }
    }

    onKeyUp(event) {
        var me = this,
            keyCode = event.keyCode;

        if (me._keyNames[keyCode]) {
            me.fireEvent(
                me._prefix + me.getKeyName(keyCode),
                false
            );
        }
    }

}