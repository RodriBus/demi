import { Game } from "./Game/Game";
import { Entity } from "./Game/Entities/Entity";
import { FpsEntity } from "./Game/Entities/FpsEntity";
import { Hero } from "./Game/Entities/Hero";


let canvas = <HTMLCanvasElement>document.getElementById('canvas');

Game.initialize(canvas);
