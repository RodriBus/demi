import Utils from '../Utils';
import {Game} from '../Game';
import {Entity} from './Entity';
import Config from "../Config";

export class Mob extends Entity {

    public prefix: string = 'M';

    constructor(public positionX: number, public positionY: number) {
        super(positionX, positionY, Config.tileSize, Config.tileSize, 'test', 'a_switch_big', true, 'Mob');
        this.speedBase = 0.5;
        this.speedX = 0.5;
    }

    //avoid losing this context with lambda = () =>
    public render(): void {
        let ctx = Game.context;
        super.render();

    }

    public move(): boolean {
        let rtn = super.move();
        if (!rtn) {
            this.speedBase = -this.speedBase;
            // this.speedX = this.speedBase;
            if (this.isMovingX) {
                this.speedY = this.speedBase;
                this.speedX = 0;
            } else if (this.isMovingY) {
                this.speedX = this.speedBase;
                this.speedY = 0;
            } else if (Utils.getOne(true, false)) {
                this.speedX = this.speedBase;
            } else {
                this.speedY = this.speedBase;
            }
        }
        return rtn;
    }

}
