import {Coordinate, Size} from '../Dimensions/Dimensions';
import Map from "../../Game/Generics/Map";
import JsonLoader from "../Utils/JsonLoader";
import {Sprite, Animation, Frame, Tile} from "./Classes";

export class SpriteManager {

    private static loadedSpriteInfo: any = {};

    public static sprites: any = {};

    public static getSprite(id: string): Sprite {
        // let spriteInfo = SpriteManager.loadedSpriteInfo[id];
        // let sprite = Sprite.fromJSONObject(spriteInfo);
        return SpriteManager.sprites[id];
    }


    public static getAnimation(spriteName: string, animName: string): Animation {
        let sprite = SpriteManager.getSprite(spriteName)
        let animation = sprite.animations[animName];
        return animation;
    }

    public static getTile(spriteName: string, animName: string): Tile {
        let sprite = SpriteManager.getSprite(spriteName)
        let tile = sprite.tiles[animName];
        return tile;
    }

    public static loadSprites(cb: () => any): void {
        let loader = new JsonLoader('/assets/sprites/sprites.json');

        loader.load(function(json: string) {
            let obj = JSON.parse(json);
            let totalImg = obj.sprites.length
            let loadedImages = 0;
            for (let objSpriteInfo of obj.sprites) {
                SpriteManager.loadedSpriteInfo[objSpriteInfo.id] = objSpriteInfo;
                // let spriteInfo = SpriteInfo.fromObject(objSpriteInfo);
                let sprite = Sprite.fromJSONObject(objSpriteInfo);
                sprite.image.onload = function() {
                    if (++loadedImages >= totalImg) {
                        cb();
                    }
                };
                SpriteManager.sprites[sprite.id] = sprite;
            }
        });
    }

}
