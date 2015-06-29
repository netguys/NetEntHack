class FoodController extends Controller {

    constructor(view, model) {
        super(view, model);

        this.foods = [];
    }

    setupEvents() {
        var me = this,
            events;

        events = super.setupEvents();

        //events['notify:createUser'] = me.onCreateUser;
        //events['notify:moveUser'] = me.onMoveUser;
        //events['notify:removeUser'] = me.onRemoveUser;
        //events['notify:allUserReceived'] = me.onAllUserReceived;
        //
        //events['notify:animateCycle'] = me.calculateMove;
        //events['notify:userInput.moveForward'] = me.moveForward;
        //events['notify:userInput.moveBackward'] = me.moveBackward;
        //events['notify:userInput.turnLeft'] = me.turnLeft;
        //events['notify:userInput.turnRight'] = me.turnRight;
        //'notify:userInput.stop': me.movePlayer
        //

        return events;

    }

    sendEaten(conf) {
        var me = this;

        socket.emit("eaten food", {
            eaten: true,
            x: conf.x,
            y: conf.y
        });
    }

    createFood(arg) {
        var me = this;

        this.view.createFood(arg);
    }



    sendMove() {
        var me = this;

        //socket.emit("move player", {
        //    id: me.myID,
        //    x: me.model.x,
        //    y: me.model.y,
        //    rotation: me.model.rotation,
        //    width : me.model.width,
        //    height : me.model.height
        //});
    }

}