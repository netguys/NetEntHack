var Render;

const CONFIG = {
    viewportWidth : 800,
    viewportHeight : 800
};

//Game initialization
function initGame() {


    var observer = new Observer();
    var moduleLoader = new ModuleLoader(observer);
    Render = new PIXIRender(observer, CONFIG.viewportWidth, CONFIG.viewportHeight, 0x1099bb);



    //debugger;

    moduleLoader.loadModules({
        'background': {
            controller: 'BackgroundController',
            view: 'BackgroundView'
        },
        'player': {
            controller: 'PlayerController',
            view: 'PlayerView',
            model : 'PlayerModel'
        },
        'userInput': {
            controller: 'UserInputController'
        }
    });

    //console.log('before start');

    Render.start();
}
