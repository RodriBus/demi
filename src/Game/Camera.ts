import {Game} from "./Game";
import {Entity} from "./Entities/Entity";
export default class Camera {

    public static followedEntity: Entity;

    static nextTransX = 0
    static nextTransY = 0

    constructor(public context?: CanvasRenderingContext2D) {
    }

    public static follow() {
        let self = Camera;
        Game.context.save();
        // Game.context.setTransform(1,0,0,1,0,0);
        // Game.context.clearRect(0, 0, Game.context.canvas.width, Game.context.canvas.height);
        Game.context.restore();

        Game.context.translate(-self.nextTransX, -self.nextTransY);
        Camera.nextTransX = 0;
        Camera.nextTransY = 0;
        // console.log('camera')
        Game.requestAnimationFrame(self.follow);
    }

    public static focusTo(entity: Entity) {
        Camera.followedEntity = entity;
        // Camera.nextTransX = entity.positionX/2 + entity.width/2;
        // Camera.nextTransY = entity.positionY/2 + entity.height/2;
        Camera.follow();
    }

}
