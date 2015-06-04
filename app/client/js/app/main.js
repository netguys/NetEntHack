class GTAIrpin {

    constructor() {

        this.bunny = {};
        this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
        this.stage = new PIXI.Container();
    }

    start() {
        document.body.appendChild(this.renderer.view);

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage('img/cat.png');

        // create a new Sprite using the texture
        this.bunny = new PIXI.Sprite(texture);

        // center the sprite's anchor point
        this.bunny.anchor.x = 0.5;
        this.bunny.anchor.y = 0.5;

        // move the sprite to the center of the screen
        this.bunny.position.x = 300;
        this.bunny.position.y = 250;

        this.stage.addChild(this.bunny);

        // start animating
        this.animate();
    }

    animate() {

        requestAnimationFrame(this.animate.bind(this));

        // just for fun, let's rotate mr rabbit a little
        this.bunny.rotation += 0.1;

        // render the container
        this.renderer.render(this.stage);
    }
}

var mainGame = new GTAIrpin();

