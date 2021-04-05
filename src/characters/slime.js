import Vector2 from 'phaser/src/math/Vector2'
const eps = 20;
export default class Slime extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, name, frame) {
        super(scene, x, y, name, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
    update() {
        if (this.hasArrived())
        {
            console.log(this.target.position);
        } else {
            const velocity = this.steering.calculateImpulse();
            this.body.setVelocity(velocity.x, velocity.y);
        }

        this.updateAnimation();
    }
    updateAnimation() {
        const animsController = this.anims;
        if (this.wantToJump)
        {
            animsController.play(this.animations[1], true);
        } else
        {
            animsController.play(this.animations[0], true);
        }

    }
    hasArrived()
    {
        return this.target.body.position === undefined || this.target.body.position.distance(this.body.position) < eps;
    }
    selectNextLocation() {
        const nextTile = this.path.shift();
        if (nextTile)
        {
            this.nextLocation = new Vector2(nextTile.x * 32, nextTile.y * 32);
        } else
        {
            this.nextLocation = this.body.position;
        }
    }
    selectTarget(target) {
        this.target = target;
        this.steering.setTarget(target);
    }
    setSteering(steering) {
        this.steering = steering;
    }
}
