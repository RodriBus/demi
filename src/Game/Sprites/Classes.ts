import {Coordinate, Size} from '../Dimensions/Dimensions';
import Map from "../../Game/Generics/Map";

export class Sprite {
    image: HTMLImageElement;
    animations: any = {};
    tiles: any = {};


    constructor(public id: string, public src: string) {
        this.image = <HTMLImageElement>document.createElement('img');
        this.image.src = src;
    }


    public static fromJSONObject(obj: any): Sprite {
        let sprite = new Sprite(obj.id, obj.src);
        for (let animInfo of obj.animations) {
            let animation = new Animation();
            animation.id = animInfo.id;
            animation.sprite = sprite;
            for (let frameInfo of animInfo.frames) {
                let id = frameInfo.id;
                let time = frameInfo.time;
                let coord = new Coordinate(frameInfo.origin.x, frameInfo.origin.y);
                let size = new Size(frameInfo.size.width, frameInfo.size.height);
                let frame = new Frame(id, time, coord, size);
                animation.frames.push(frame);
            }
            sprite.animations[animation.id] = animation;
        }

        for (let tilesInfo of obj.tiles) {
            let id = tilesInfo.id;
            let coord = new Coordinate(tilesInfo.origin.x, tilesInfo.origin.y);
            let size = new Size(tilesInfo.size.width, tilesInfo.size.height);
            let tile = new Tile(id, coord, size);
            tile.sprite = sprite;
            sprite.tiles[tile.id] = tile;
        }
        return sprite;
    }
}


export class Animation {
    id: string;
    frames: Frame[] = [];
    currentFrameIndex: number = 0;

    sprite: Sprite;
    // get currentFrame(): Frame {
    //     return this.frames[this.currentFrameIndex];
    // };
    //
    //
    // public addFrameTime(time: number, force?: boolean) {
    //     this.currentFrame.currentTime += time;
    //     if (this.currentFrame.currentTime >= this.currentFrame.totalTime || force) {
    //         this.nextFrame();
    //         this.currentFrame.currentTime = force ? 0 : time - this.currentFrame.totalTime;
    //     }
    // }
    //
    // public nextFrame() {
    //     let totalFrames = this.frames.length - 1;
    //     if (this.currentFrameIndex === totalFrames) {
    //         this.currentFrameIndex = 0;
    //     } else {
    //         this.currentFrameIndex++;
    //     }
    // }
    //
    // public drawFrame(ctx: CanvasRenderingContext2D, xPosition: number, yPosition: number, width: number, height: number) {
    //       ctx.clearRect(xPosition, yPosition, width, height);
    //       ctx.drawImage(this.sprite.image, this.currentFrame.origin.x, this.currentFrame.origin.y, this.currentFrame.size.width, this.currentFrame.size.height, xPosition, yPosition, width, height);
    //   }
}

export class Frame {
    // id: string;
    // totalTime: number
    // origin: Coordinate;
    // size: Size;

    public _currentTime = 0;

    public get currentTime(): number {
        return this._currentTime;
    }

    public set currentTime(t: number) {
        this._currentTime = t;
    }

    constructor(public id: string, public totalTime: number, public origin: Coordinate, public size: Size) {

    }
}

export class Tile {
    sprite: Sprite;
    constructor(public id: string, public origin: Coordinate, public size: Size) {

    }
}

interface ITile {
    id: string;
    origin: Coordinate;
    size: Size;
}
