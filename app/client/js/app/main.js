var Render, observer;
var socket, remotePlayers, localPlayer;

const CONFIG = {
    viewportWidth: 800,
    viewportHeight: 800
};

//Game initialization
function initGame() {
    observer = new Observer();
    var moduleLoader = new ModuleLoader(observer);
    Render = new PIXIRender(observer, CONFIG.viewportWidth, CONFIG.viewportHeight, 0x1099bb);


    moduleLoader.loadModules({
        'background': {
            controller: 'BackgroundController',
            view: 'BackgroundView'
        },
        'player': {
            controller: 'PlayerController',
            view: 'PlayerView',
            model: 'PlayerModel'
        },
        'userInput': {
            controller: 'UserInputController'
        }
    });

    localPlayer = moduleLoader._modules.player;


    // Initialise socket connection
    socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

    // Initialise remote players array
    remotePlayers = [];

    setupSocketEvents();

    //console.log('before start');

    Render.start();
}

function setupSocketEvents() {
    // Socket connection successful
    socket.on("connect", onSocketConnected);

    // Socket disconnection
    socket.on("disconnect", onSocketDisconnect);

    // New player message received
    socket.on("new player", onNewPlayer);

    // New player message received
    socket.on("all players", onAllPlayers);

    // Player move message received
    socket.on("move player", onMovePlayer);

    // Player removed message received
    socket.on("remove player", onRemovePlayer);
}

function onAllPlayers(data) {
    console.log('onAllPlayers', data);

    observer.fireEvent('notify:allUserReceived', data);
}

// Socket connected
function onSocketConnected(data) {
    console.log("Connected to socket server", data);

    // Send local player data to the game server
    socket.emit("new player", {x: 300, y: 300, hp: 1});
};

// Socket disconnected
function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
    console.log("New player connected: " + data.id);

    observer.fireEvent('notify:createUser', data);


    // Initialise the new player
    //var newPlayer = new Player(data.x, data.y);
    //newPlayer.id = data.id;
    //
    // Add new player to the remote players array
    //remotePlayers.push(newPlayer);
};

// Move player
function onMovePlayer(data) {
    //var movePlayer = playerById(data.id);

    // Player not found
    //if (!movePlayer) {
    //    console.log("Player not found: "+data.id);
    //    return;
    //};

    //console.log('text', data);

    observer.fireEvent('notify:moveUser', data);

    // Update player position
    //movePlayer.setX(data.x);
    //movePlayer.setY(data.y);
};

// Remove player
function onRemovePlayer(data) {
    //var removePlayer = playerById(data.id);

    // Player not found
    //if (!removePlayer) {
    //    console.log("Player not found: "+data.id);
    //    return;
    //};

    observer.fireEvent('notify:removeUser', data);

    // Remove player from array
    //remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

// Find player by ID
//function playerById(id) {
//    var i;
//    for (i = 0; i < remotePlayers.length; i++) {
//        if (remotePlayers[i].id == id)
//            return remotePlayers[i];
//    };
//
//    return false;
//};

