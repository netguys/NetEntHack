var Render, observer;
var socket, remotePlayers, localPlayer, moduleLoader;

const CONFIG = {
    viewportWidth: 1280,
    viewportHeight: 720
};

//Game initialization
function initGame() {
    observer = new Observer();
    moduleLoader = new ModuleLoader(observer);
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
        'food' : {
            controller: 'FoodController',
            view: 'FoodView'
        },
        'userInput': {
            controller: 'UserInputController'
        },
        'sound' : {
            'controller': 'SoundController',
            'model': 'SoundModel'
        },
        'effects' : {
            'controller': 'EffectsController',
            'view': 'EffectsView',
            'model': 'EffectsModel'
        }
    });

    localPlayer = moduleLoader._modules.player;

    // Initialise socket connection
    socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});

    // Initialise remote players array
    remotePlayers = [];

    setupSocketEvents();

    //console.log('before start');

    initSound(moduleLoader._modules.sound, "json/audio.json",
        function() {
    //        moduleLoader._modules.background.fireEvent("playSound", {soundID: "ambiance", loop: true});
        });

    Render.start();
}

function initSound(SoundModule, configUrl, callback) {
    var xmlhttp = new XMLHttpRequest(),
        url = configUrl;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            SoundModule.model.loadSounds(json.audio, callback);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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

    // Player move message rdeceived
    socket.on("move player", onMovePlayer);

    // Player removed message received
    socket.on("remove player", onRemovePlayer);

    // new food received
    socket.on("created food", onCreateFood);

    socket.on("deleted Food", onDeleteFood);

    /*if seed request sent and we got some...*/
    socket.on("effects seeded", onEffectsSeeded);
    socket.on("effect setted", onEffectsSetted);
    /*remove effect from map for other players*/
    socket.on("effect removed from map", onEffectSeedRemoved);

}

function onEffectsSeeded(effects){
    moduleLoader._modules.effects.seedEffects(effects);
}

function onEffectSeedRemoved(effect){
    observer.fireEvent("request:removeUsedEffect", effect);
}
function onEffectsSetted(effect){
    //@todo: add effect to user instance and animate it
    observer.fireEvent("request:removeUsedEffect", effect);
}


function onCreateFood(arg) {
    moduleLoader._modules.food.createFood(arg);
}

function onDeleteFood(arg) {
    moduleLoader._modules.food.deleteFood(arg);
}

function onAllPlayers(data) {
    console.log('onAllPlayers', data);

    observer.fireEvent('notify:allUserReceived', data);
}

// Socket connected
function onSocketConnected(data) {
    console.log("Connected to socket server", data);

    var data = {x: CONFIG.viewportWidth/2 * 100, y: CONFIG.viewportHeight/2 * 100, hp: 1, height : 250, width : 300};

    moduleLoader._modules.player.createLocalPlayer(data);

    // Send local player data to the game server
    socket.emit("new player", data);

    socket.emit("get food");

    /*request to seed all effects*/
    socket.emit("seed effects");
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
    observer.fireEvent('notify:moveUser', data);
}

// Remove player
function onRemovePlayer(data) {
    observer.fireEvent('notify:removeUser', data);
};

