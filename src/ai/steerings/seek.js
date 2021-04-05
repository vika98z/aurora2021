import Vector2 from "phaser/src/math/Vector2";
import Steering from "./steering";

class Seek extends Steering {
    constructor (owner, objects, force = 1, ownerSpeed, targetSpeed) {
        super(owner, objects, force);
        this.ownerSpeed = ownerSpeed;
        this.targetSpeed = targetSpeed
    }

    calculateImpulse () {
        const searcherDirection = this.owner.body.velocity;
        const target = this._target === undefined ? this.objects[0] : this._target;
        const targetDirection = target.body.velocity;
        const desiredVelocity = new Vector2(this.owner.x - target.x, this.owner.y - target.y);
        
        const toTarget = new Vector2(
            -(desiredVelocity.x - searcherDirection.x) / 5,//this.owner.body.mass, 
            -(desiredVelocity.y - searcherDirection.y) / 5);//this.owner.body.mass);

        if (isNaN(toTarget.x))
            return [0, 0];
        const x = (Math.abs(toTarget.x) < 1) ? 0 : -Math.sign(toTarget.x)*this.ownerSpeed;
        const y = (Math.abs(toTarget.y) < 1) ? 0 : -Math.sign(toTarget.y)*this.ownerSpeed;

        return toTarget; //new Vector2(x, y);

    }

    setTarget(target) {
        this._target = target;
    }
}

export { Seek }