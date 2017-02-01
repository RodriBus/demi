import {Game} from '../Game';
import {Entity} from './Entity';
import {Coordinate} from "../Dimensions/Dimensions";

export class FpsEntity extends Entity {

    private color: string = '#000';
    public text: string = '0';
    public fontSize: number = 20;
    public fontSizeUnits: string = 'px';
    public fontFamily: string = 'Courier New';

    private fpsValues: Coordinate[] = [
        new Coordinate(0, 0),
        new Coordinate(0, 10),
        new Coordinate(0, 20),
        new Coordinate(0, 30),
    ];

    //avoid losing this context with lambda = () =>
    public render(): void {
        let ctx = Game.context;
        ctx.font = `${this.fontSize}${this.fontSizeUnits} ${this.fontFamily}`;
        ctx.fillStyle = this.color
        ctx.fillText(this.text, this.positionX, this.positionY);
        super.render();
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setText(text: string): void {
        let fps = +text;
        let fpsPercent = Math.round(fps * 100 / 60);
        if (fpsPercent > 100) {
            fpsPercent = 100;
        }
        this.setColor(this.numberToColorRgb(fps));

        let str = `${fps} fps`;
        super.setText(str);
    }

    private numberToColorRgb(i: number): string {
        let red = Math.floor(255 - (255 * i / 100));
        let green = Math.floor(255 * i / 100);
        return 'rgb(' + red + ',' + green + ',0)'
    }

}
