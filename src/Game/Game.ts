import Config from'./Config';
import { SpriteManager } from './Sprites/SpriteManager';
import { Entity } from "./Entities/Entity";
import { StaticEntity } from "./Entities/StaticEntity";
import { FpsEntity } from "./Entities/FpsEntity";
import { Hero } from "./Entities/Hero";
import { Mob } from "./Entities/Mob";
import {CollisionManager, CollisionArea} from './Collisions/CollisionManager';
import Camera from "./Camera";
import MapParser from "./MapParser";

export class Game {
    private static gameFocused: boolean = true;
    public static canvas: HTMLCanvasElement;
    public static context: CanvasRenderingContext2D;
    public static deltaTime: number = 0;
    public static fps: number = 0;

    private static lastCalledTime: number;
    private static fpsEntity: FpsEntity;

    private static fpsDrawTime: number = 1000;
    private static lastDrawFps: number = 0;

    private static maxWidth: number = 800;
    private static maxHeight: number = 600;

    public static worldWidth: number = 1000;
    public static worldHeight: number = 464;

    public static contextOrginalX: number = 0;
    public static contextOrginalY: number = 0;

    static initialize(canvas: HTMLCanvasElement): void {
        Game.canvas = canvas;
        Game.context = canvas.getContext('2d');
        SpriteManager.loadSprites(Game.init);
        console.log(Config.mapData)
        let originalTranslateFn = Game.context.translate;
        Game.contextOrginalX = 0;
        Game.contextOrginalY = 0;
        Game.context.translate = function(x, y) {
            Game.contextOrginalX -= x;
            Game.contextOrginalY -= y;
            // console.log(Game.contextOrginalX, Game.contextOrginalY);
            originalTranslateFn.apply(this, [x, y]);
        }
    }

    private static init(): void {
        Game.watchFocus();
        Game.requestAnimationFrame(Game.calculateDeltaTime);
        Game.requestAnimationFrame(Game.clearCanvas);
        MapParser.parseFromStr(Config.mapData);
        let fps = new FpsEntity(0, 15, 0, 0, 'test', 't_empty', true, '0');
        Game.setFpsDisplay(fps, 250);
        let mob2 = new Mob(Config.tileSize * 1, Config.tileSize * 1);
        let mob3 = new Mob(Config.tileSize * 2, Config.tileSize * 2);
        let mob = new Mob(Config.tileSize * 3, Config.tileSize * 3);
        let mob4 = new Mob(Config.tileSize * 4, Config.tileSize * 4);
        let mob5 = new Mob(Config.tileSize * 5, Config.tileSize * 5);
        let mob6 = new Mob(Config.tileSize * 6, Config.tileSize * 6);
        let stic = new StaticEntity(50, 350, 200, 100);
        let stic2 = new StaticEntity(400, 50, 400, 100);
        let stic3 = new StaticEntity(400, 500, 100, 150);

        let hero = new Hero();
        // let borderbttm = new StaticEntity(Game.worldWidth, Game.worldHeight, -Game.worldWidth, 10);
        // let borderrght = new StaticEntity(Game.worldWidth, Game.worldHeight, 10, -Game.worldHeight);
        let c = Camera;
        c.focusTo(hero);
    }

    public static requestAnimationFrame(callback: (time?: number) => void, skipPause: boolean = false): void {
        function f(t: number) {
            var now = Date.now();
            Game.calculateDeltaTime(now);
            callback(now);
        }
        if (Game.gameFocused || skipPause) {
            window.requestAnimationFrame(callback);
        }
    }

    private static clearCanvas(): void {
        // let w = window.innerWidth < Game.maxWidth ? window.innerWidth : Game.maxWidth;
        // let h = window.innerWidth * (3 / 4) < Game.maxHeight ? window.innerWidth * (3 / 4) : Game.maxHeight;
        // Game.context.canvas.width = w;
        // Game.context.canvas.height = h;
        Game.context.save();
        Game.context.setTransform(1, 0, 0, 1, 0, 0)
        Game.context.clearRect(0, 0, Game.context.canvas.width, Game.context.canvas.height);
        Game.context.restore();
        Game.updateDeadZone();
        Game.requestAnimationFrame(Game.clearCanvas);
    }

    private static calculateDeltaTime(time: number): void {
        let now = Date.now();
        if (!Game.lastCalledTime) {
            Game.lastCalledTime = now;
            Game.requestAnimationFrame(Game.calculateDeltaTime, true);
            return;
        }

        Game.deltaTime = (now - Game.lastCalledTime) / 1000;
        if (Game.deltaTime > 1 || !Game.gameFocused) {
            Game.deltaTime = 0;
        }
        Game.fps = Math.round(1 / Game.deltaTime);

        Game.lastCalledTime = now;
        Game.requestAnimationFrame(Game.calculateDeltaTime, true);

        if (Game.lastCalledTime - Game.lastDrawFps > Game.fpsDrawTime && Game.fpsEntity) {
            Game.lastDrawFps = Game.lastCalledTime;
            Game.fpsEntity.setText(Game.fps.toString());
        }
    }

    private static setFpsDisplay(entity: FpsEntity, time?: number): void {
        Game.fpsEntity = entity;
        if (time) {
            Game.fpsDrawTime = time;
        }
    }

    private static updateDeadZone() {
        const infinite = 999999999;
        let topDeadZone = new CollisionArea('topDeadZone', 0, -infinite, Game.worldWidth, infinite);
        let rightDeadZone = new CollisionArea('rightDeadZone', Game.worldWidth, 0, Game.worldHeight, infinite);
        let bottomDeadZone = new CollisionArea('bottomDeadZone', 0, Game.worldHeight, Game.worldWidth, infinite);
        let leftDeadZone = new CollisionArea('leftDeadZone', -infinite, 0, infinite, Game.worldHeight);

    }

    private static watchFocus() {
        let hidden: string, visibilityChange: string;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        }

        function handleVisibilityChange() {
            if (document[hidden]) {
                Game.gameFocused = false;
                console.log('hidden');
            } else {
                Game.gameFocused = true;
                console.log('show');
            }
        }

        if (Config.pauseOnFocusLost) {
            if (document[hidden]) {
                Game.gameFocused = false;
            }

            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }



    }
}
