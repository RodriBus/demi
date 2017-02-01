import {Coordinate, Size} from "../Dimensions/Dimensions";
export class CollisionManager {

    private static collisionAreas: any = {};

    constructor() { }

    public static isEmpty(area: CollisionArea): boolean {
        for (let existingCollisionArea of CollisionManager.collisionAreas) {

        }
        return true;
    }

    public static checkCollision(toCheckCollisionArea: CollisionArea): boolean {
        for (let areaId in CollisionManager.collisionAreas) {
            let existingCollisionArea = CollisionManager.collisionAreas[areaId];
            if (existingCollisionArea.eId !== toCheckCollisionArea.eId) {
                if (CollisionManager.checkAreasCollides(toCheckCollisionArea, existingCollisionArea)) {
                    return true;
                }
            }
        }
        return false;
    }

    private static checkAreasCollides(movingArea: CollisionArea, staticArea: CollisionArea): boolean {

        let collidesTopLeft = pointRect(movingArea.topLeft, staticArea);
        let collidesTopRight = pointRect(movingArea.topRight, staticArea);
        let collidesBottomLeft = pointRect(movingArea.bottomLeft, staticArea);
        let collidesBottomRight = pointRect(movingArea.bottomRight, staticArea);

        return collidesTopLeft || collidesTopRight || collidesBottomLeft || collidesBottomRight

        function pointRect(point: Coordinate, collisionArea: CollisionArea) {
            var px = point.x;
            var py = point.y;

            var x1 = collisionArea.topLeft.x;
            var y1 = collisionArea.topLeft.y;
            var x2 = collisionArea.bottomRight.x
            var y2 = collisionArea.bottomRight.y;

            if (px > x1) {
                if (px < x2) {
                    if (py > y1) {
                        if (py < y2) {
                            return true
                        }
                    }
                }
            }
            return false;
        }
    }

    public static addCollisionArea(eId: string, area: CollisionArea): void {
        CollisionManager.collisionAreas[eId] = area;
    }

    public static updateCollisionArea(eId: string, area: CollisionArea): void {
        CollisionManager.collisionAreas[eId] = area;
    }

}


export class CollisionArea {
    public get topLeft(): Coordinate {
        return new Coordinate(this.x, this.y);
    }
    public get topRight(): Coordinate {
        return new Coordinate(this.x + this.width, this.y);
    }
    public get bottomLeft(): Coordinate {
        return new Coordinate(this.x, this.y + this.height);
    }
    public get bottomRight(): Coordinate {
        return new Coordinate(this.x + this.width, this.y + this.height);
    }


    constructor(public eId: string, public x: number, public y: number, public width: number, public height: number) {
        CollisionManager.addCollisionArea(eId, this);
    }
}
