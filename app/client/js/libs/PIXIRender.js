/**
 * Created by Treem on 05.06.2015.
 */

class PIXIRender {

    constructor(observer, width, height, backgroundColor) {

        this._observer = observer;
        this.renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: backgroundColor});
        this._mainStage = new PIXI.Container();

        this.movableContainer = new PIXI.Container();
        this.staticContainer = new PIXI.Container();

        this.movableContainer.z = 1;
        this.staticContainer.z = 2;

        this._mainStage.addChild(this.movableContainer);
        this._mainStage.addChild(this.staticContainer);
    }

    addMovable(object){
        var me = this;

        me.movableContainer.addChild(object);
        me._mainStage.children.sort(me.depthCompare);

    }

    addStatic(object){
        var me = this;

        me.staticContainer.addChild(object);
        me._mainStage.children.sort(me.depthCompare);

    }

    moveMovable(pos){
        var me = this;

        me.movableContainer.position = pos;
    }

    addToStage(stage, item) {
        var me = this;

        stage.addChild(item);
        stage.children.sort(me.depthCompare);
    }

    removeFromStage(stage, item) {
        var me = this;

        stage.removeChild(item);
        stage.children.sort(me.depthCompare);
    }

    createList(z) {
        var me = this,
            newList = new PIXI.Container();

        //Set z-index
        newList.z = z ? z : 0;
        me._mainStage.addChild(newList);

        if (z) {
            me._mainStage.children.sort(me.depthCompare);
        }

        return newList;
    }

    start() {
        var me = this;

        //Add canvas to DOM
        document.body.appendChild(this.renderer.view);

        // start animating
        me.animate();
    }


    depthCompare(a, b) {
        if (a.z < b.z)
            return -1;
        if (a.z > b.z)
            return 1;
        return 0;
    }

    //Animation loop
    animate() {
        var me = this;

        me._observer.fireEvent('notify:animateCycle');

        //Start looping
        requestAnimationFrame(this.animate.bind(this));

        me.renderer.render(me._mainStage);
    }

}