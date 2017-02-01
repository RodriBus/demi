import {Game} from '../Game';
import {Entity} from './Entity';

export class StaticEntity extends Entity {

    public prefix: string = 'ST';

    constructor(public positionX: number, public positionY: number, public width: number, public height: number) {
        super(positionX, positionY, width, height, 'test', 't_empty', true, 'Static');
        this.speedBase = 0;
    }

    //avoid losing this context with lambda = () =>
    public render(): void {
        let ctx = Game.context;
        // ctx.drawImage(this.animation.sprite.image, this.positionX, this.positionY);
        super.render();

    }

}
