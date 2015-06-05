/**
 * Created by Treem on 05.06.2015.
 */
class Player {

    constructor() {
        this._x = 0;
        this._y = 0;
        this._step = 0;
        this._directionAngle = 0;
    }

    setX(x) {
        this._x = x ? x : 0;
    }

    setY(y) {
        this._y = y ? y : 0;
    }

    setCoords(x, y) {
        this.setX(x);
        this.setY(y);
    }

    setStep(step) {
        this._step = step;
    }

    //Set specific direction
    setDirection(angle) {
        this._directionAngle = angle ? angle : 0;
    }

    //Change for some absolute value
    changeDirection(angle) {
        this._directionAngle += angle ? angle : 0;
    }

    makeStep() {
        this.setCoords(
            this._x = this._x + this._step * Math.cos(this._directionAngle),
            this._y = this._y + this._step * Math.sin(this._directionAngle)
        );
    }

    updateUser() {
        //none
    }

    getCoors() {
        return {
            x: this._x,
            y: this._y
        }
    }
}
