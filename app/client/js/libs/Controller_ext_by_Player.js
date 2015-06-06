/**
 * Created by Treem on 05.06.2015.
 */

class PlayerController extends Controller {

    constructor(view, model) {
        super(view, model);

        //this.myID = null;

        this.remotePlayers = {};

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

        events['notify:createUser'] = me.onCreateUser;
        events['notify:moveUser'] = me.onMoveUser;
        events['notify:removeUser'] = me.onRemoveUser;
        //events['notify:allUserReceived'] = me.onAllUserReceived;

        events['notify:animateCycle'] = me.calculateMove;
        events['notify:userInput.moveForward'] = me.moveForward;
        events['notify:userInput.moveBackward'] = me.moveBackward;
        events['notify:userInput.turnLeft'] = me.turnLeft;
        events['notify:userInput.turnRight'] = me.turnRight;
        //'notify:userInput.stop': me.movePlayer


        return events;

    }

    createLocalPlayer(data) {
        this.view.createLocalPlayer(data);

    }

    start() {


    }

    //onAllUserReceived(allUsers) {
    //    var me = this;
    //
    //    allUsers.forEach(function(userData){
    //        me.onCreateUser(userData);
    //    });
    //
    //}

    onCreateUser(data) {
        var me = this;

        me.view.createPlayerItem(data);


        console.log(data);
    }

    onMoveUser(data) {
        var me = this;

        //console.log(data);
        me.view.updatePlayer(data);
    }

    onRemoveUser(data) {
        var me = this;

        delete me.remotePlayers[data.id];
        me.view.removePlayerItem(data.id);

    }

    calculateMove() {
        var me = this,
            changed = false;

        if (me.buttonsState.forward) {
            me.model.makeStep(1);
            changed = true;
        }

        if (me.buttonsState.backward) {
            me.model.makeStep(-1);
            changed = true;
        }

        if (me.buttonsState.left) {
            me.model.turnPlayer(-1);
            changed = true;
        }

        if (me.buttonsState.right) {
            me.model.turnPlayer(1);
            changed = true;
        }

        me.view.updateMe();

        if (changed) {
            me.sendMove();
        }

        if (me.buttonsState.forward || me.buttonsState.backward ) {
            me.view.changeSprite();
        }

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

    sendMove() {
        var me = this;

        socket.emit("move player", {
            id: me.myID,
            x: me.model.x,
            y: me.model.y,
            rotation: me.model.rotation,
            width : me.model.width,
            height : me.model.height
        });
    }

}