/**************************************************
 ** NODE.JS REQUIREMENTS
 **************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
    io = require("socket.io"),				// Socket.IO
    Player = require("./Player").Player,// Player class
    Bot = require("./Bot").Bot,
    Food = require("./Food").Food;	// Bot class
    Collider = require("./Collider").Collider;	// Collider class


/**************************************************
 ** GAME VARIABLES
 **************************************************/
var socket,		// Socket controller
    connContext,
    players;	// Array of connected players


/**************************************************
 ** GAME INITIALISATION
 **************************************************/
    function init() {
    // Create an empty array to store players
    players = [];

    // Set up Socket.IO to listen on port 8000
    socket = io.listen(8000);

    // Configure Socket.IO
    socket.configure(function() {
        // Only use WebSockets
        socket.set("transports", ["websocket"]);

        // Restrict log output
        socket.set("log level", 2);
    });

    // Start listening for events
    setEventHandlers();

    //startUpdateLoop();

};

var initBot = function(){
    var newPlayer = new Bot(300, 300);
    newPlayer.id = "bot:" + players.length;

    console.info("bot authorize", newPlayer.id);
    // Broadcast new player to connected socket clients
    this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

    //newPlayer.updateCallback = onMovePlayer.bind(this);


    // Add new player to the players array
    players.push(newPlayer);
};


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
    // Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

/**************************************************
 ** GAME UPDATE LOOP
 **************************************************/
var startUpdateLoop = function(){
    var dt = 32,//30 FPS
    interval = setInterval(function(){
        players.forEach(function(player, index){
            if(player.update){
                player.update(dt);
                if(connContext){
                    connContext.broadcast.emit("move player", {
                        id: player.id,
                        x: player.getX(),
                        y: player.getY(),
                        rotation : player.getRotation()
                    });
                }
            }
        });
    }, dt);
    return interval;
};

// New socket connection
function onSocketConnection(client) {
    util.log("New player has connected: "+client.id);

    // Listen for client disconnected
    client.on("disconnect", onClientDisconnect);

    // Listen for new player message
    client.on("new player", onNewPlayer);

    // Listen for move player message
    client.on("move player", onMovePlayer);

    client.on("get food", onGetFood);
};

function onGetFood() {
    util.log('create food');
    this.emit("created food", Food.getFood());
}

// Socket client has disconnected
function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);

    var removePlayer = playerById(this.id);

    // Player not found
    if (!removePlayer) {
        util.log("Player not found: "+this.id);
        return;
    }

    // Remove player from players array
    players.splice(players.indexOf(removePlayer), 1);

    // Broadcast removed player to connected socket clients
    this.broadcast.emit("remove player", {id: this.id});

};

// New player has joined
function onNewPlayer(data) {
    // Create a new player
    var newPlayer = new Player(data.x, data.y, data.rotation, data.hp);
    newPlayer.id = this.id;

    // Broadcast new player to connected socket clients
    this.broadcast.emit("new player", {
        id: newPlayer.id,
        x: newPlayer.getX(),
        y: newPlayer.getY(),
        rotation : newPlayer.getRotation(),
        hp : newPlayer.getHp()
    });

    // Send existing players to the new player
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
        existingPlayer = players[i];
        this.emit("new player", {
            id: existingPlayer.id,
            x: existingPlayer.getX(),
            y: existingPlayer.getY(),
            rotation : existingPlayer.getRotation(),
            hp : existingPlayer.getHp()
        });
    };

    // Add new player to the players array
    players.push(newPlayer);

    //if(players.length === 1){
    //    initBot.apply(this);
    //    connContext = this;
    //}
};

// Player has moved
function onMovePlayer(data) {
    var me = this;
    // Find player in array
    var movePlayer = playerById(this.id);

    // Player not found
    if (!movePlayer) {
        util.log("Player not found: "+this.id);
        return;
    };


    // Update player position
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    movePlayer.setRotation(data.rotation);

    players.forEach(function(player){

        if(movePlayer.id !== player.id && Collider.checkUsersCollide(movePlayer, player)){
            if(movePlayer.getHp() >= player.getHp()){
                movePlayer.setHp(movePlayer.getHp() + player.getHp());
                player.setHp(0);
            }
        }

        Food.getFood().forEach(function(el) {

            if(Collider.checkSimpleCollide({
                    x : movePlayer.getX(),
                    y : movePlayer.getY(),
                    w : movePlayer.getWidth(),
                    h : movePlayer.getHeight()
                }, {
                    x : el.x,
                    y : el.y,
                    w : Food.size,
                    h : Food.size
                })){

                util.log('EAT ME!');

            }
        });

        //check food eat

    });

    // Broadcast updated position to connected socket clients
    this.broadcast.emit("move player", {
        id: movePlayer.id,
        x: movePlayer.getX(),
        y: movePlayer.getY(),
        rotation : movePlayer.getRotation(),
        hp: movePlayer.getHp(),
        width : movePlayer.getWidth(),
        height : movePlayer.getHeight()
    });

};


/**************************************************
 ** GAME HELPER FUNCTIONS
 **************************************************/
// Find player by ID
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};


/**************************************************
 ** RUN THE GAME
 **************************************************/
init();