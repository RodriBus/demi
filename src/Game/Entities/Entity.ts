import Config from'../Config';
import Utils from'../Utils';
import {Game} from '../Game';
import {SpriteManager} from '../Sprites/SpriteManager';
import {Sprite, Animation, Frame, Tile} from "../Sprites/Classes";
import {CollisionManager, CollisionArea} from '../Collisions/CollisionManager';
import {Coordinate} from "../Dimensions/Dimensions";

type animationOrTile = Animation | Tile;

export class Entity {
    private static totalEntities: number = 0;

    public _eId: number;
    public speedBase: number = 0;
    public speedX: number = 0;
    public speedY: number = 0;
    public collisionArea: CollisionArea;
    public drawCollision: boolean = false;
    public animation: Animation;
    public tile: Tile;

    public renderType: string;

    public currentFrameIndex: number = 0;
    public currentFrameTime: number = 0;
    public get currentFrame(): Frame {
        return this.animation.frames[this.currentFrameIndex];
    }

    public prefix: string = 'E';

    protected get isMovingX(): boolean {
        return this.speedX !== 0;
    };
    protected get isMovingY(): boolean {
        return this.speedY !== 0;
    }

    public get eId(): string {
        return this.prefix + this._eId;
    }

    constructor(public positionX: number, public positionY: number, public width: number, public height: number, public spriteName: string, public animationOrTileName: string, hasCollision: boolean, public text: string) {
        this._eId = ++Entity.totalEntities;
        let spt: animationOrTile = SpriteManager.getAnimation(spriteName, animationOrTileName) || SpriteManager.getTile(spriteName, animationOrTileName);

        if (spt instanceof Animation) {
            this.animation = <Animation>spt;
            this.renderType = 'animation';
        }
        if (spt instanceof Tile) {
            this.tile = <Tile>spt;
            this.renderType = 'tile';
        }

        this.drawCollision = true;
        console.log(this.eId);
        if (hasCollision) {
            this.collisionArea = new CollisionArea(this.eId, positionX, positionY, width, height);
        }
        this.render();
    }

    //avoid losing this context with lambda = () =>
    public render(): void {
        this.move();
        var self = this;
        function r() {
            if (Config.showCollisionAreas && (Config.strokeCollisionAreas || Config.fillCollisionAreas)) {
                Game.context.rect(self.collisionArea.x, self.collisionArea.y, self.collisionArea.width, self.collisionArea.height);
                if (Config.strokeCollisionAreas) {
                    Game.context.stroke();
                }
                if (Config.fillCollisionAreas) {
                    Game.context.fillStyle = "rgba(128, 232, 255, 0.5)";
                    Game.context.fill();
                }

            }
            if (self.renderType === 'animation') {
                self.addFrameTime(Game.deltaTime * 1000);
            }
            let ctx = Game.context;
            // ctx.drawImage(this.sprite.image, this.positionX, this.positionY);
            self.drawFrame();
            self.render();
        }
        Game.requestAnimationFrame(r);
    }

    private addFrameTime(time: number, force?: boolean) {
        this.currentFrameTime += time;
        if (this.currentFrameTime >= this.currentFrame.totalTime || force) {
            this.nextFrame();
            // this.currentFrameTime = force ? 0 : time - this.currentFrame.totalTime;
            this.currentFrameTime = 0
        }
    }

    public nextFrame() {
        let totalFrames = this.animation.frames.length - 1;
        if (this.currentFrameIndex === totalFrames) {
            this.currentFrameIndex = 0;
        } else {
            this.currentFrameIndex++;
        }
    }

    private drawFrame() {
        let ctx = Game.context;
        let draw: animationOrTile;
        if (this.renderType === 'animation') {
            ctx.drawImage(this.animation.sprite.image, this.currentFrame.origin.x, this.currentFrame.origin.y, this.currentFrame.size.width, this.currentFrame.size.height, this.positionX, this.positionY, this.width, this.height);

        } else if (this.renderType === 'tile') {
            ctx.drawImage(this.tile.sprite.image, this.tile.origin.x, this.tile.origin.y, this.tile.size.width, this.tile.size.height, this.positionX, this.positionY, this.width, this.height);
        }
        // ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
    }

    public move(): boolean {
        let futurePositionX = this.positionX + (this.speedX * Game.deltaTime * 100);
        let futurePositionY = this.positionY + (this.speedY * Game.deltaTime * 100);

        if (this.speedX !== 0 || this.speedY !== 0) {
            this.collisionArea.x = futurePositionX;
            this.collisionArea.y = futurePositionY;

            //if collides somethig
            if (CollisionManager.checkCollision(this.collisionArea)) {
                //restore colArea
                this.collisionArea.x = this.positionX;
                this.collisionArea.y = this.positionY;
                this.speedX = 0;
                this.speedY = 0;
                return false;
            } else {
                this.positionX = futurePositionX;
                this.positionY = futurePositionY;
                CollisionManager.updateCollisionArea(this.eId, this.collisionArea);
                return true;
            }
        }
        return false;

    }

    protected changeAnimationSprite(spriteName: string, animationName: string) {
        if (this.animation.id !== animationName) {
            this.animation = SpriteManager.getAnimation(spriteName, animationName);
            this.currentFrameIndex = 0;
            this.currentFrameTime = 0;
        }
    }

    public setSpeedX(speedX: number): void {
        this.speedX = speedX;
    }

    public setSpeedY(speedY: number): void {
        this.speedY = speedY;
    }

    public setText(text: string): void {
        this.text = text;
    }
}
