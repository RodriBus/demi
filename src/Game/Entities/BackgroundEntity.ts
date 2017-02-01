import {Game} from '../Game';
import {Entity} from './Entity';

export default class StaticEntity extends Entity {

    public prefix: string = 'ST';

    constructor(public tileName: string, public hasCollision: boolean = false, public positionX: number, public positionY: number, public width: number, public height: number) {
        super(positionX, positionY, width, height, 'main', tileName, hasCollision, 'BG' + tileName);
        this.speedBase = 0;
    }

    //avoid losing this context with lambda = () =>
    public render(): void {
        let ctx = Game.context;
        // ctx.drawImage(this.animation.sprite.image, this.positionX, this.positionY);
        super.render();

    }

}
