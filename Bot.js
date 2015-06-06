var Player = require("./Player").Player;

var Bot = function (startX, startY, center) {

    var center = center || {
                x: 300,
                y: 300
            },
        rad = 100,
        alpha = 0,
        speed = 5;//deg per second

    var proto = new Player.apply(this, arguments);

    proto.update = function (dt) {
        var x, y;
        alpha += (speed * dt / 1000);
        x = Math.floor(center.x + rad * Math.cos(alpha));
        y = Math.floor(center.y + rad * Math.sin(alpha));
        proto.setX(x);
        proto.setY(y);

        alpha = alpha % 360;
    };

    return proto;
};


exports.Bot = Bot;