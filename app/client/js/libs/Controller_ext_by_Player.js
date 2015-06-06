/**
 * Created by Treem on 05.06.2015.
 */

class PlayerController extends Controller {

    constructor(view, model) {
        super(view, model);

        this.myID = null;

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
        events['notify:allUserReceived'] = me.onAllUserReceived;

        events['notify:animateCycle'] = me.calculateMove;
        events['notify:userInput.moveForward'] = me.moveForward;
        events['notify:userInput.moveBackward'] = me.moveBackward;
        events['notify:userInput.turnLeft'] = me.turnLeft;
        events['notify:userInput.turnRight'] = me.turnRight;
        //'notify:userInput.stop': me.movePlayer


        return events;

    }

    start() {


    }

    onAllUserReceived(allUsers) {
        var me = this;

        allUsers.forEach(function(userData){
            me.onCreateUser(userData);
            console.log(userData);
        });

    }

    onCreateUser(data) {
        var me = this;

        //if (!me.myID) {
        //    me.myID = data.id;
        //}
        //
        //if (!me.remotePlayers[data.id]) {
        //    me.remotePlayers[data.id] = data;
        //    me.view.createPlayerItem(data);
        //} else {
        //    me.view.updatePlayer(data);
        //}

        // Initialise the new player


        me.view.createPlayerItem(data);

        //var newPlayer = new Player(data.x, data.y);
        //newPlayer.id = data.id;

        // Add new player to the remote players array
        //me.remotePlayers[data.id] = newPlayer;

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

        me.view.updateMe(me.myID);

        if (changed) {
            me.sendMove();
        }


    }

    moveForward(state) {
        //var me = this;
        this.buttonsState.forward = state;
        //me.calculateMove();
        //me.sendMove();
    }

    moveBackward(state) {
        //var me = this;
        this.buttonsState.backward = state;
        //me.calculateMove();
        //me.sendMove();
    }

    turnLeft(state) {
        //var me = this;
        this.buttonsState.left = state;
        //me.calculateMove();
        //me.sendMove();
    }

    turnRight(state) {
        //var me = this;
        this.buttonsState.right = state;
        //me.calculateMove();
        //me.sendMove();
    }

    sendMove() {
        var me = this;

        socket.emit("move player", {
            id: me.myID,
            x: me.model.x,
            y: me.model.y,
            rotation: me.model.rotation
        });

        //console.log(
        //    {
        //        x: me.model.x,
        //        y: me.model.y,
        //        rotation : me.model.rotation
        //    }
        //);
    }


    //getX() {
    //    return this.model.data.x;
    //}
    //
    //getY() {
    //    return this.model.data.y;
    //}
}