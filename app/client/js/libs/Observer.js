/**
 * Created by Treem on 05.06.2015.
 */

class Observer {

    constructor() {
        this._events = {};
    }

    subscribe(module, events) {
        var me = this;

        Object.keys(events).forEach(function (eventName) {
            let eventCallback = events[eventName];

            me.addEventListener(module, eventName, eventCallback);

        });

    }

    addEventListener(module, eventName, eventCallback) {
        var me = this;

        if (!me._events[eventName] && typeof me._events[eventName] !== typeof Array) {
            me._events[eventName] = [];
        }

        me._events[eventName].push(eventCallback.bind(module));

    }

    fireEvent(eventName, params) {
        var me = this;

        //console.info(eventName, params);

        if (me._events[eventName]) {
            me._events[eventName].forEach(function(receiver){
                receiver(params);
            });
        }

    }
}