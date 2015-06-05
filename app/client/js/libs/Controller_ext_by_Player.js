/**
 * Created by Treem on 05.06.2015.
 */

class PlayerController extends Controller {

    constructor(view, model) {
        super(view, model);

        this.buttonsState = {
            forward: false,
            backward: false,
            left: false,
            right: false
        }
    }

    setupEvents() {
        var me = this,
            events;

        events = super.setupEvents();

        events['notify:animateCycle'] = me.onAnimateCycle;
        events['notify:userInput.moveForward'] = me.moveForward;
        events['notify:userInput.moveBackward'] = me.moveBackward;
        events['notify:userInput.turnLeft'] = me.turnLeft;
        events['notify:userInput.turnRight'] = me.turnRight;
        //'notify:userInput.stop': me.movePlayer


        return events;

    }

    start() {


    }

    onAnimateCycle() {
        var me = this;

        //console.log('animate cycle');

        //if (me.model && me.model.readData && me.view && me.view.updatePlayer && me.model.readData('initAnimationsDone') != true) {
        //    return false;
        //}

        if (me.buttonsState.forward) {
            me.model.makeStep(1);
        }

        if (me.buttonsState.backward) {
            me.model.makeStep(-1);
        }

        if (me.buttonsState.left) {
            me.model.turnPlayer(-1);
        }

        if (me.buttonsState.right) {
            me.model.turnPlayer(1);
        }

        me.view.updatePlayer();
    }

    moveForward(state) {
        this.buttonsState.forward = state;
    }

    moveBackward(state) {
        this.buttonsState.backward = state;
    }

    turnLeft(state) {
        this.buttonsState.left = state;
    }

    turnRight(state) {
        this.buttonsState.right = state;
    }


}