import {Game} from '../Game';
import {Entity} from './Entity';
import Camera from "../Camera";
import Config from "../Config";

export class Hero extends Entity {

    public prefix: string = 'H';

    isCameraBlockedX = false;
    isCameraBlockedY = false;

    constructor() {
        super(
            Game.context.canvas.width / 2 - Config.tileSize / 2,
            Game.context.canvas.height / 2 - Config.tileSize / 2,
            Config.tileSize,
            Config.tileSize,
            'main',
            'a_hero_idle',
            true,
            'Hero');
        this.speedBase = 1.5;
        this.setController();
    }

    //avoid losing this context with lambda = () =>
    public render(): void {
        // this.sprite.addSpriteTime(Game.deltaTime*1000);
        let ctx = Game.context;
        // ctx.translate(this.positionX, this.positionY)
        // this.ct += 0.001
        // Game.context.translate(this.ct,this.ct)
        // // ctx.drawImage(this.sprite.image, this.positionX, this.positionY);
        // this.sprite.drawSprite(ctx, this.positionX, this.positionY, this.width, this.height);
        super.render();

    }

    public move(): boolean {
        let oldPositionX = this.positionX;
        let oldPositionY = this.positionY;
        let originalSpeedX = this.speedX;
        let originalSpeedY = this.speedY;
        let futurePositionX = 0;
        let futurePositionY = 0;
        let moved = super.move();
        if (moved && (originalSpeedX || originalSpeedY)) {
            // console.log('move camera');

            // if (parseInt(Game.contextOrginalX.toString()) >= Game.worldWidth - Game.context.canvas.width) {
            //     console.log('right');
            //     // futurePositionX = -Game.contextOrginalX + (Game.worldWidth - Game.context.canvas.width);
            //     // futurePositionX = (Game.worldWidth - (Game.context.canvas.width/2) - this.positionX + this.width /2) ;
            //     futurePositionX = 0
            //     Game.contextOrginalX = Game.worldWidth - Game.context.canvas.width;
            //
            // } else
            if (Game.context.canvas.width / 2 < this.positionX + this.width / 2) {
                futurePositionX = (originalSpeedX * Game.deltaTime * 100);
                this.isCameraBlockedX = false;
            } else {
                if (!this.isCameraBlockedX) {
                    futurePositionX = -Game.contextOrginalX;
                    this.isCameraBlockedX = true;
                }
                // console.log('Not x');
            }
            if (Game.context.canvas.height / 2 < this.positionY + this.height / 2) {
                futurePositionY = (originalSpeedY * Game.deltaTime * 100);
                this.isCameraBlockedY = false;
            } else {
                if (!this.isCameraBlockedY) {
                    futurePositionY = -Game.contextOrginalY;
                    this.isCameraBlockedY = true;
                }
                // console.log('Not y');
            }
            Camera.nextTransX = futurePositionX;
            Camera.nextTransY = futurePositionY;
            // console.log(futurePositionX, futurePositionY);
        }
        return moved;
    }

    private setController(): void {
        const self = this;
        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;
        const SPEED = this.speedBase;

        function onKeyDown(e: KeyboardEvent) {
            let event: KeyboardEvent = window.event ? <KeyboardEvent>window.event : e;
            switch (event.keyCode) {
                case LEFT:
                    self.changeAnimationSprite('main', 'a_hero_run_left');
                    self.setSpeedX(-SPEED);
                    break;
                case RIGHT:
                    self.changeAnimationSprite('main', 'a_hero_run_right');
                    self.setSpeedX(SPEED);
                    break;
                case UP:
                    self.changeAnimationSprite('main', 'a_hero_run_right');
                    self.setSpeedY(-SPEED);
                    break;
                case DOWN:
                    self.changeAnimationSprite('main', 'a_hero_run_left');
                    self.setSpeedY(SPEED);
                    break;
            }
        }
        function onKeyUp(e: KeyboardEvent) {
            let event: KeyboardEvent = window.event ? <KeyboardEvent>window.event : e;
            if (event.keyCode > 36 && event.keyCode < 41) {
                self.changeAnimationSprite('main', 'a_hero_idle');
            }
            switch (event.keyCode) {
                case LEFT:
                    self.setSpeedX(0);
                    break;
                case RIGHT:
                    self.setSpeedX(0);
                    break;
                case UP:
                    self.setSpeedY(0);
                    break;
                case DOWN:
                    self.setSpeedY(0);
                    break;
            }
        }
        window.onkeydown = onKeyDown;
        window.onkeyup = onKeyUp;
    }
}
