/**
 * Created by Treem on 05.06.2015.
 */

class Controller {

    constructor(view, model) {
        this._MODULENAME = 'default';

        this.view = view ? view : {};
        this.model = model ? model : {};
    }

    fireEvent() {

    }

    //on() {
    //
    //}

    setModuleName(name) {
        this._MODULENAME = name;
    }

    setupEvents() {
        var me = this;

        return {
            'request:initModules': me.initModule,
            'notify:gameStarted': me.seyHello
        };
    }

    initModule() {
        var me = this;

        if (me.model['setupData'] !== undefined) {
            me.model.setupData();
        }

        if (me.view['initAnimations'] !== undefined) {
            me.view.initAnimations();
        }

        me.start();
    }

    start() {


    }

    seyHello() {

        console.log(this._MODULENAME + ' say hello!');

    }

}