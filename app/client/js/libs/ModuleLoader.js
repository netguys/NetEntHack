class ModuleLoader {

    constructor(observer){
        this._modules = {};
        this._observer =observer;
    }

    loadModules(modules){
        var me = this;

        console.log(Object.keys(modules));

        Object.keys(modules).forEach(function(moduleName){




            let module = modules[moduleName];
            let model = module.model ? new window[module.model]() : false;
            let view = module.view ? new window[module.view](model) : false;

            console.log(moduleName, view, model);

            let controller = module.controller ? new window[module.controller](view, model) : null;



            if(controller){

                controller.setModuleName(moduleName);

                controller.fireEvent = me._observer.fireEvent.bind(me._observer);

                //controller.on = me._observer.subscribe.bind(me._observer);

                //controller.setupEvents();

                me._observer.subscribe(controller, controller.setupEvents());

                me.addModule(controller, moduleName);
            }

        });

        me._observer.fireEvent('request:initModules');
    }

    addModule(module, moduleName){
        this._modules[moduleName] = module;
    }

}