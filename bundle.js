(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var Game_1 = require("./Game");
var Camera = (function () {
    function Camera(context) {
        this.context = context;
    }
    Camera.follow = function () {
        var self = Camera;
        Game_1.Game.context.save();
        // Game.context.setTransform(1,0,0,1,0,0);
        // Game.context.clearRect(0, 0, Game.context.canvas.width, Game.context.canvas.height);
        Game_1.Game.context.restore();
        Game_1.Game.context.translate(-self.nextTransX, -self.nextTransY);
        Camera.nextTransX = 0;
        Camera.nextTransY = 0;
        // console.log('camera')
        Game_1.Game.requestAnimationFrame(self.follow);
    };
    Camera.focusTo = function (entity) {
        Camera.followedEntity = entity;
        // Camera.nextTransX = entity.positionX/2 + entity.width/2;
        // Camera.nextTransY = entity.positionY/2 + entity.height/2;
        Camera.follow();
    };
    Camera.nextTransX = 0;
    Camera.nextTransY = 0;
    return Camera;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Camera;
},{"./Game":11}],2:[function(require,module,exports){
"use strict";
var Dimensions_1 = require("../Dimensions/Dimensions");
var CollisionManager = (function () {
    function CollisionManager() {
    }
    CollisionManager.isEmpty = function (area) {
        for (var _i = 0, _a = CollisionManager.collisionAreas; _i < _a.length; _i++) {
            var existingCollisionArea = _a[_i];
        }
        return true;
    };
    CollisionManager.checkCollision = function (toCheckCollisionArea) {
        for (var areaId in CollisionManager.collisionAreas) {
            var existingCollisionArea = CollisionManager.collisionAreas[areaId];
            if (existingCollisionArea.eId !== toCheckCollisionArea.eId) {
                if (CollisionManager.checkAreasCollides(toCheckCollisionArea, existingCollisionArea)) {
                    return true;
                }
            }
        }
        return false;
    };
    CollisionManager.checkAreasCollides = function (movingArea, staticArea) {
        var collidesTopLeft = pointRect(movingArea.topLeft, staticArea);
        var collidesTopRight = pointRect(movingArea.topRight, staticArea);
        var collidesBottomLeft = pointRect(movingArea.bottomLeft, staticArea);
        var collidesBottomRight = pointRect(movingArea.bottomRight, staticArea);
        return collidesTopLeft || collidesTopRight || collidesBottomLeft || collidesBottomRight;
        function pointRect(point, collisionArea) {
            var px = point.x;
            var py = point.y;
            var x1 = collisionArea.topLeft.x;
            var y1 = collisionArea.topLeft.y;
            var x2 = collisionArea.bottomRight.x;
            var y2 = collisionArea.bottomRight.y;
            if (px > x1) {
                if (px < x2) {
                    if (py > y1) {
                        if (py < y2) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    };
    CollisionManager.addCollisionArea = function (eId, area) {
        CollisionManager.collisionAreas[eId] = area;
    };
    CollisionManager.updateCollisionArea = function (eId, area) {
        CollisionManager.collisionAreas[eId] = area;
    };
    CollisionManager.collisionAreas = {};
    return CollisionManager;
}());
exports.CollisionManager = CollisionManager;
var CollisionArea = (function () {
    function CollisionArea(eId, x, y, width, height) {
        this.eId = eId;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        CollisionManager.addCollisionArea(eId, this);
    }
    Object.defineProperty(CollisionArea.prototype, "topLeft", {
        get: function () {
            return new Dimensions_1.Coordinate(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionArea.prototype, "topRight", {
        get: function () {
            return new Dimensions_1.Coordinate(this.x + this.width, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionArea.prototype, "bottomLeft", {
        get: function () {
            return new Dimensions_1.Coordinate(this.x, this.y + this.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionArea.prototype, "bottomRight", {
        get: function () {
            return new Dimensions_1.Coordinate(this.x + this.width, this.y + this.height);
        },
        enumerable: true,
        configurable: true
    });
    return CollisionArea;
}());
exports.CollisionArea = CollisionArea;
},{"../Dimensions/Dimensions":4}],3:[function(require,module,exports){
"use strict";
var Config = (function () {
    function Config() {
    }
    Config.showCollisionAreas = false;
    Config.strokeCollisionAreas = true;
    Config.fillCollisionAreas = false;
    Config.pauseOnFocusLost = true;
    Config.tileSize = 16;
    Config.mapData = "FFFFFFFFFF FFFFFFFFFFFF FFFFFFFFFFFFFFFFFFFFF\nFGGGGGGGGG GGGfgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGfGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGfGGGGGGFGGGfGGGGGG\nFGGGGGGGGG GGGGdTTnfGGG GGGGGGGGGGFGGGGGGGGGG\nFTTTTTTTTT TTTTTTTTTTTT TTTTTTTTTT4TTTTTTTTTT\nFTTTTTTTTT TTTTTTTTTTTT TTTTTTTTTT4TTTTTTTTTT\nFbbbbbbbbb bbbbcTTzbbbb bbbbbbbbbbFbbbbbbbbbb\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGfGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGfGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6SGGG GGGGGGGGGGFGGGGGGGGGG\nFGGG1UUIGG GGGGgTT6GGGG GGG1UUIGGGFGGGGGGGGGG\nFGGGWXXPGG GGGGgTT6GGGG GGGWXXPGGGFGGGGGGGGGG\nFGGGWXXPGG GGGGgTT6GGGG GGGWXXPGGGFGGGGGGGGGG\nFGGGQMMLGG GGGGgTT6GGGG GGGQMMLGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGfGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGfGGGG GGGGgTT6fGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGfGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGfGGGGGG GGGGgTT6GGGG GGGGGGGGfGFGGGGGGGGGG\nFGGGGGGGGG GGGfgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGfGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGfGGGGGGG GGGGgTT6GfGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG fGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGfG GGGGGGGGGGFGGGGGfGGGG\nFFFFFFFFFF FFFFF44FFFFF FFFFFFFFFFFFFFFFFFFFF\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG\nFGGGGGGGGG GGGGgTT6GGGG GGGGGGGGGGFGGGGGGGGGG";
    return Config;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;
},{}],4:[function(require,module,exports){
"use strict";
var Coordinate = (function () {
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coordinate;
}());
exports.Coordinate = Coordinate;
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
exports.Size = Size;
},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game_1 = require('../Game');
var Entity_1 = require('./Entity');
var StaticEntity = (function (_super) {
    __extends(StaticEntity, _super);
    function StaticEntity(tileName, hasCollision, positionX, positionY, width, height) {
        if (hasCollision === void 0) { hasCollision = false; }
        _super.call(this, positionX, positionY, width, height, 'main', tileName, hasCollision, 'BG' + tileName);
        this.tileName = tileName;
        this.hasCollision = hasCollision;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.prefix = 'ST';
        this.speedBase = 0;
    }
    //avoid losing this context with lambda = () =>
    StaticEntity.prototype.render = function () {
        var ctx = Game_1.Game.context;
        // ctx.drawImage(this.animation.sprite.image, this.positionX, this.positionY);
        _super.prototype.render.call(this);
    };
    return StaticEntity;
}(Entity_1.Entity));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StaticEntity;
},{"../Game":11,"./Entity":6}],6:[function(require,module,exports){
"use strict";
var Config_1 = require('../Config');
var Game_1 = require('../Game');
var SpriteManager_1 = require('../Sprites/SpriteManager');
var Classes_1 = require("../Sprites/Classes");
var CollisionManager_1 = require('../Collisions/CollisionManager');
var Entity = (function () {
    function Entity(positionX, positionY, width, height, spriteName, animationOrTileName, hasCollision, text) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.spriteName = spriteName;
        this.animationOrTileName = animationOrTileName;
        this.text = text;
        this.speedBase = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.drawCollision = false;
        this.currentFrameIndex = 0;
        this.currentFrameTime = 0;
        this.prefix = 'E';
        this._eId = ++Entity.totalEntities;
        var spt = SpriteManager_1.SpriteManager.getAnimation(spriteName, animationOrTileName) || SpriteManager_1.SpriteManager.getTile(spriteName, animationOrTileName);
        if (spt instanceof Classes_1.Animation) {
            this.animation = spt;
            this.renderType = 'animation';
        }
        if (spt instanceof Classes_1.Tile) {
            this.tile = spt;
            this.renderType = 'tile';
        }
        this.drawCollision = true;
        console.log(this.eId);
        if (hasCollision) {
            this.collisionArea = new CollisionManager_1.CollisionArea(this.eId, positionX, positionY, width, height);
        }
        this.render();
    }
    Object.defineProperty(Entity.prototype, "currentFrame", {
        get: function () {
            return this.animation.frames[this.currentFrameIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "isMovingX", {
        get: function () {
            return this.speedX !== 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Entity.prototype, "isMovingY", {
        get: function () {
            return this.speedY !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "eId", {
        get: function () {
            return this.prefix + this._eId;
        },
        enumerable: true,
        configurable: true
    });
    //avoid losing this context with lambda = () =>
    Entity.prototype.render = function () {
        this.move();
        var self = this;
        function r() {
            if (Config_1.default.showCollisionAreas && (Config_1.default.strokeCollisionAreas || Config_1.default.fillCollisionAreas)) {
                Game_1.Game.context.rect(self.collisionArea.x, self.collisionArea.y, self.collisionArea.width, self.collisionArea.height);
                if (Config_1.default.strokeCollisionAreas) {
                    Game_1.Game.context.stroke();
                }
                if (Config_1.default.fillCollisionAreas) {
                    Game_1.Game.context.fillStyle = "rgba(128, 232, 255, 0.5)";
                    Game_1.Game.context.fill();
                }
            }
            if (self.renderType === 'animation') {
                self.addFrameTime(Game_1.Game.deltaTime * 1000);
            }
            var ctx = Game_1.Game.context;
            // ctx.drawImage(this.sprite.image, this.positionX, this.positionY);
            self.drawFrame();
            self.render();
        }
        Game_1.Game.requestAnimationFrame(r);
    };
    Entity.prototype.addFrameTime = function (time, force) {
        this.currentFrameTime += time;
        if (this.currentFrameTime >= this.currentFrame.totalTime || force) {
            this.nextFrame();
            // this.currentFrameTime = force ? 0 : time - this.currentFrame.totalTime;
            this.currentFrameTime = 0;
        }
    };
    Entity.prototype.nextFrame = function () {
        var totalFrames = this.animation.frames.length - 1;
        if (this.currentFrameIndex === totalFrames) {
            this.currentFrameIndex = 0;
        }
        else {
            this.currentFrameIndex++;
        }
    };
    Entity.prototype.drawFrame = function () {
        var ctx = Game_1.Game.context;
        var draw;
        if (this.renderType === 'animation') {
            ctx.drawImage(this.animation.sprite.image, this.currentFrame.origin.x, this.currentFrame.origin.y, this.currentFrame.size.width, this.currentFrame.size.height, this.positionX, this.positionY, this.width, this.height);
        }
        else if (this.renderType === 'tile') {
            ctx.drawImage(this.tile.sprite.image, this.tile.origin.x, this.tile.origin.y, this.tile.size.width, this.tile.size.height, this.positionX, this.positionY, this.width, this.height);
        }
        // ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
    };
    Entity.prototype.move = function () {
        var futurePositionX = this.positionX + (this.speedX * Game_1.Game.deltaTime * 100);
        var futurePositionY = this.positionY + (this.speedY * Game_1.Game.deltaTime * 100);
        if (this.speedX !== 0 || this.speedY !== 0) {
            this.collisionArea.x = futurePositionX;
            this.collisionArea.y = futurePositionY;
            //if collides somethig
            if (CollisionManager_1.CollisionManager.checkCollision(this.collisionArea)) {
                //restore colArea
                this.collisionArea.x = this.positionX;
                this.collisionArea.y = this.positionY;
                this.speedX = 0;
                this.speedY = 0;
                return false;
            }
            else {
                this.positionX = futurePositionX;
                this.positionY = futurePositionY;
                CollisionManager_1.CollisionManager.updateCollisionArea(this.eId, this.collisionArea);
                return true;
            }
        }
        return false;
    };
    Entity.prototype.changeAnimationSprite = function (spriteName, animationName) {
        if (this.animation.id !== animationName) {
            this.animation = SpriteManager_1.SpriteManager.getAnimation(spriteName, animationName);
            this.currentFrameIndex = 0;
            this.currentFrameTime = 0;
        }
    };
    Entity.prototype.setSpeedX = function (speedX) {
        this.speedX = speedX;
    };
    Entity.prototype.setSpeedY = function (speedY) {
        this.speedY = speedY;
    };
    Entity.prototype.setText = function (text) {
        this.text = text;
    };
    Entity.totalEntities = 0;
    return Entity;
}());
exports.Entity = Entity;
},{"../Collisions/CollisionManager":2,"../Config":3,"../Game":11,"../Sprites/Classes":13,"../Sprites/SpriteManager":14}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game_1 = require('../Game');
var Entity_1 = require('./Entity');
var Dimensions_1 = require("../Dimensions/Dimensions");
var FpsEntity = (function (_super) {
    __extends(FpsEntity, _super);
    function FpsEntity() {
        _super.apply(this, arguments);
        this.color = '#000';
        this.text = '0';
        this.fontSize = 20;
        this.fontSizeUnits = 'px';
        this.fontFamily = 'Courier New';
        this.fpsValues = [
            new Dimensions_1.Coordinate(0, 0),
            new Dimensions_1.Coordinate(0, 10),
            new Dimensions_1.Coordinate(0, 20),
            new Dimensions_1.Coordinate(0, 30),
        ];
    }
    //avoid losing this context with lambda = () =>
    FpsEntity.prototype.render = function () {
        var ctx = Game_1.Game.context;
        ctx.font = "" + this.fontSize + this.fontSizeUnits + " " + this.fontFamily;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.positionX, this.positionY);
        _super.prototype.render.call(this);
    };
    FpsEntity.prototype.setColor = function (color) {
        this.color = color;
    };
    FpsEntity.prototype.setText = function (text) {
        var fps = +text;
        var fpsPercent = Math.round(fps * 100 / 60);
        if (fpsPercent > 100) {
            fpsPercent = 100;
        }
        this.setColor(this.numberToColorRgb(fps));
        var str = fps + " fps";
        _super.prototype.setText.call(this, str);
    };
    FpsEntity.prototype.numberToColorRgb = function (i) {
        var red = Math.floor(255 - (255 * i / 100));
        var green = Math.floor(255 * i / 100);
        return 'rgb(' + red + ',' + green + ',0)';
    };
    return FpsEntity;
}(Entity_1.Entity));
exports.FpsEntity = FpsEntity;
},{"../Dimensions/Dimensions":4,"../Game":11,"./Entity":6}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game_1 = require('../Game');
var Entity_1 = require('./Entity');
var Camera_1 = require("../Camera");
var Config_1 = require("../Config");
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this, Game_1.Game.context.canvas.width / 2 - Config_1.default.tileSize / 2, Game_1.Game.context.canvas.height / 2 - Config_1.default.tileSize / 2, Config_1.default.tileSize, Config_1.default.tileSize, 'main', 'a_hero_idle', true, 'Hero');
        this.prefix = 'H';
        this.isCameraBlockedX = false;
        this.isCameraBlockedY = false;
        this.speedBase = 1.5;
        this.setController();
    }
    //avoid losing this context with lambda = () =>
    Hero.prototype.render = function () {
        // this.sprite.addSpriteTime(Game.deltaTime*1000);
        var ctx = Game_1.Game.context;
        // ctx.translate(this.positionX, this.positionY)
        // this.ct += 0.001
        // Game.context.translate(this.ct,this.ct)
        // // ctx.drawImage(this.sprite.image, this.positionX, this.positionY);
        // this.sprite.drawSprite(ctx, this.positionX, this.positionY, this.width, this.height);
        _super.prototype.render.call(this);
    };
    Hero.prototype.move = function () {
        var oldPositionX = this.positionX;
        var oldPositionY = this.positionY;
        var originalSpeedX = this.speedX;
        var originalSpeedY = this.speedY;
        var futurePositionX = 0;
        var futurePositionY = 0;
        var moved = _super.prototype.move.call(this);
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
            if (Game_1.Game.context.canvas.width / 2 < this.positionX + this.width / 2) {
                futurePositionX = (originalSpeedX * Game_1.Game.deltaTime * 100);
                this.isCameraBlockedX = false;
            }
            else {
                if (!this.isCameraBlockedX) {
                    futurePositionX = -Game_1.Game.contextOrginalX;
                    this.isCameraBlockedX = true;
                }
            }
            if (Game_1.Game.context.canvas.height / 2 < this.positionY + this.height / 2) {
                futurePositionY = (originalSpeedY * Game_1.Game.deltaTime * 100);
                this.isCameraBlockedY = false;
            }
            else {
                if (!this.isCameraBlockedY) {
                    futurePositionY = -Game_1.Game.contextOrginalY;
                    this.isCameraBlockedY = true;
                }
            }
            Camera_1.default.nextTransX = futurePositionX;
            Camera_1.default.nextTransY = futurePositionY;
        }
        return moved;
    };
    Hero.prototype.setController = function () {
        var self = this;
        var LEFT = 37;
        var UP = 38;
        var RIGHT = 39;
        var DOWN = 40;
        var SPEED = this.speedBase;
        function onKeyDown(e) {
            var event = window.event ? window.event : e;
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
        function onKeyUp(e) {
            var event = window.event ? window.event : e;
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
    };
    return Hero;
}(Entity_1.Entity));
exports.Hero = Hero;
},{"../Camera":1,"../Config":3,"../Game":11,"./Entity":6}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require('../Utils');
var Game_1 = require('../Game');
var Entity_1 = require('./Entity');
var Config_1 = require("../Config");
var Mob = (function (_super) {
    __extends(Mob, _super);
    function Mob(positionX, positionY) {
        _super.call(this, positionX, positionY, Config_1.default.tileSize, Config_1.default.tileSize, 'test', 'a_switch_big', true, 'Mob');
        this.positionX = positionX;
        this.positionY = positionY;
        this.prefix = 'M';
        this.speedBase = 0.5;
        this.speedX = 0.5;
    }
    //avoid losing this context with lambda = () =>
    Mob.prototype.render = function () {
        var ctx = Game_1.Game.context;
        _super.prototype.render.call(this);
    };
    Mob.prototype.move = function () {
        var rtn = _super.prototype.move.call(this);
        if (!rtn) {
            this.speedBase = -this.speedBase;
            // this.speedX = this.speedBase;
            if (this.isMovingX) {
                this.speedY = this.speedBase;
                this.speedX = 0;
            }
            else if (this.isMovingY) {
                this.speedX = this.speedBase;
                this.speedY = 0;
            }
            else if (Utils_1.default.getOne(true, false)) {
                this.speedX = this.speedBase;
            }
            else {
                this.speedY = this.speedBase;
            }
        }
        return rtn;
    };
    return Mob;
}(Entity_1.Entity));
exports.Mob = Mob;
},{"../Config":3,"../Game":11,"../Utils":15,"./Entity":6}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game_1 = require('../Game');
var Entity_1 = require('./Entity');
var StaticEntity = (function (_super) {
    __extends(StaticEntity, _super);
    function StaticEntity(positionX, positionY, width, height) {
        _super.call(this, positionX, positionY, width, height, 'test', 't_empty', true, 'Static');
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.prefix = 'ST';
        this.speedBase = 0;
    }
    //avoid losing this context with lambda = () =>
    StaticEntity.prototype.render = function () {
        var ctx = Game_1.Game.context;
        // ctx.drawImage(this.animation.sprite.image, this.positionX, this.positionY);
        _super.prototype.render.call(this);
    };
    return StaticEntity;
}(Entity_1.Entity));
exports.StaticEntity = StaticEntity;
},{"../Game":11,"./Entity":6}],11:[function(require,module,exports){
"use strict";
var Config_1 = require('./Config');
var SpriteManager_1 = require('./Sprites/SpriteManager');
var StaticEntity_1 = require("./Entities/StaticEntity");
var FpsEntity_1 = require("./Entities/FpsEntity");
var Hero_1 = require("./Entities/Hero");
var Mob_1 = require("./Entities/Mob");
var CollisionManager_1 = require('./Collisions/CollisionManager');
var Camera_1 = require("./Camera");
var MapParser_1 = require("./MapParser");
var Game = (function () {
    function Game() {
    }
    Game.initialize = function (canvas) {
        Game.canvas = canvas;
        Game.context = canvas.getContext('2d');
        SpriteManager_1.SpriteManager.loadSprites(Game.init);
        console.log(Config_1.default.mapData);
        var originalTranslateFn = Game.context.translate;
        Game.contextOrginalX = 0;
        Game.contextOrginalY = 0;
        Game.context.translate = function (x, y) {
            Game.contextOrginalX -= x;
            Game.contextOrginalY -= y;
            // console.log(Game.contextOrginalX, Game.contextOrginalY);
            originalTranslateFn.apply(this, [x, y]);
        };
    };
    Game.init = function () {
        Game.watchFocus();
        Game.requestAnimationFrame(Game.calculateDeltaTime);
        Game.requestAnimationFrame(Game.clearCanvas);
        MapParser_1.default.parseFromStr(Config_1.default.mapData);
        var fps = new FpsEntity_1.FpsEntity(0, 15, 0, 0, 'test', 't_empty', true, '0');
        Game.setFpsDisplay(fps, 250);
        var mob2 = new Mob_1.Mob(Config_1.default.tileSize * 1, Config_1.default.tileSize * 1);
        var mob3 = new Mob_1.Mob(Config_1.default.tileSize * 2, Config_1.default.tileSize * 2);
        var mob = new Mob_1.Mob(Config_1.default.tileSize * 3, Config_1.default.tileSize * 3);
        var mob4 = new Mob_1.Mob(Config_1.default.tileSize * 4, Config_1.default.tileSize * 4);
        var mob5 = new Mob_1.Mob(Config_1.default.tileSize * 5, Config_1.default.tileSize * 5);
        var mob6 = new Mob_1.Mob(Config_1.default.tileSize * 6, Config_1.default.tileSize * 6);
        var stic = new StaticEntity_1.StaticEntity(50, 350, 200, 100);
        var stic2 = new StaticEntity_1.StaticEntity(400, 50, 400, 100);
        var stic3 = new StaticEntity_1.StaticEntity(400, 500, 100, 150);
        var hero = new Hero_1.Hero();
        // let borderbttm = new StaticEntity(Game.worldWidth, Game.worldHeight, -Game.worldWidth, 10);
        // let borderrght = new StaticEntity(Game.worldWidth, Game.worldHeight, 10, -Game.worldHeight);
        var c = Camera_1.default;
        c.focusTo(hero);
    };
    Game.requestAnimationFrame = function (callback, skipPause) {
        if (skipPause === void 0) { skipPause = false; }
        function f(t) {
            var now = Date.now();
            Game.calculateDeltaTime(now);
            callback(now);
        }
        if (Game.gameFocused || skipPause) {
            window.requestAnimationFrame(callback);
        }
    };
    Game.clearCanvas = function () {
        // let w = window.innerWidth < Game.maxWidth ? window.innerWidth : Game.maxWidth;
        // let h = window.innerWidth * (3 / 4) < Game.maxHeight ? window.innerWidth * (3 / 4) : Game.maxHeight;
        // Game.context.canvas.width = w;
        // Game.context.canvas.height = h;
        Game.context.save();
        Game.context.setTransform(1, 0, 0, 1, 0, 0);
        Game.context.clearRect(0, 0, Game.context.canvas.width, Game.context.canvas.height);
        Game.context.restore();
        Game.updateDeadZone();
        Game.requestAnimationFrame(Game.clearCanvas);
    };
    Game.calculateDeltaTime = function (time) {
        var now = Date.now();
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
    };
    Game.setFpsDisplay = function (entity, time) {
        Game.fpsEntity = entity;
        if (time) {
            Game.fpsDrawTime = time;
        }
    };
    Game.updateDeadZone = function () {
        var infinite = 999999999;
        var topDeadZone = new CollisionManager_1.CollisionArea('topDeadZone', 0, -infinite, Game.worldWidth, infinite);
        var rightDeadZone = new CollisionManager_1.CollisionArea('rightDeadZone', Game.worldWidth, 0, Game.worldHeight, infinite);
        var bottomDeadZone = new CollisionManager_1.CollisionArea('bottomDeadZone', 0, Game.worldHeight, Game.worldWidth, infinite);
        var leftDeadZone = new CollisionManager_1.CollisionArea('leftDeadZone', -infinite, 0, infinite, Game.worldHeight);
    };
    Game.watchFocus = function () {
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        }
        function handleVisibilityChange() {
            if (document[hidden]) {
                Game.gameFocused = false;
                console.log('hidden');
            }
            else {
                Game.gameFocused = true;
                console.log('show');
            }
        }
        if (Config_1.default.pauseOnFocusLost) {
            if (document[hidden]) {
                Game.gameFocused = false;
            }
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
    };
    Game.gameFocused = true;
    Game.deltaTime = 0;
    Game.fps = 0;
    Game.fpsDrawTime = 1000;
    Game.lastDrawFps = 0;
    Game.maxWidth = 800;
    Game.maxHeight = 600;
    Game.worldWidth = 1000;
    Game.worldHeight = 464;
    Game.contextOrginalX = 0;
    Game.contextOrginalY = 0;
    return Game;
}());
exports.Game = Game;
},{"./Camera":1,"./Collisions/CollisionManager":2,"./Config":3,"./Entities/FpsEntity":7,"./Entities/Hero":8,"./Entities/Mob":9,"./Entities/StaticEntity":10,"./MapParser":12,"./Sprites/SpriteManager":14}],12:[function(require,module,exports){
"use strict";
var BackgroundEntity_1 = require("./Entities/BackgroundEntity");
var Config_1 = require("./Config");
var MapParser = (function () {
    function MapParser() {
    }
    MapParser.parseFromStr = function (str) {
        var arr = str.split('\n');
        for (var i = 0, l = arr.length; i < l; i++) {
            var row = arr[i];
            //remove white spaces
            row = row.replace(/\s/g, '');
            var rowArr = row.split('');
            for (var j = 0, l_1 = rowArr.length; j < l_1; j++) {
                var char = rowArr[j];
                switch (char) {
                    case 'F':
                        //instance bg til
                        new BackgroundEntity_1.default('t_fence_grass', true, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case '4':
                        //instance bg til
                        new BackgroundEntity_1.default('t_fence_tile', true, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'f':
                        //instance bg til
                        new BackgroundEntity_1.default('t_grass_flower', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'G':
                        if (randexec() === 2) {
                            new BackgroundEntity_1.default('t_grass_flower', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        }
                        else {
                            new BackgroundEntity_1.default('t_grass', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        }
                        //instance bg tile
                        break;
                    case 'g':
                        new BackgroundEntity_1.default('t_grass_right', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case '6':
                        new BackgroundEntity_1.default('t_grass_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 't':
                        new BackgroundEntity_1.default('t_grass_bottom', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'b':
                        new BackgroundEntity_1.default('t_grass_top', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'z':
                        new BackgroundEntity_1.default('t_grass_top_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'c':
                        new BackgroundEntity_1.default('t_grass_top_right', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'd':
                        new BackgroundEntity_1.default('t_grass_bottom_right', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'n':
                        new BackgroundEntity_1.default('t_grass_bottom_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        //instance bg tile
                        break;
                    case 'T':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_tile', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'S':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sign_grass', true, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'X':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'U':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_top', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'M':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_bottom', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'W':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'P':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_right', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case '1':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_top_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'I':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_top_right', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'Q':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_bottom_left', false, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                    case 'L':
                        //instance bg tile
                        new BackgroundEntity_1.default('t_sand_bottom_right', true, j * Config_1.default.tileSize, i * Config_1.default.tileSize, Config_1.default.tileSize, Config_1.default.tileSize);
                        break;
                }
            }
        }
        function randexec() {
            function a() { return 0; }
            function b() { return 1; }
            function c() { return 2; }
            var funcs = [a, b, c]; // the functions array
            var probas = [20, 75, 5]; // 20%, 70% and 10%
            var ar = [];
            var i, sum = 0;
            // that following initialization loop could be done only once above that
            // randexec() function, we let it here for clarity
            for (i = 0; i < probas.length - 1; i++) {
                sum += (probas[i] / 100.0);
                ar[i] = sum;
            }
            // Then we get a random number and finds where it sits inside the probabilities
            // defined earlier
            var r = Math.random(); // returns [0,1]
            for (i = 0; i < ar.length && r >= ar[i]; i++)
                ;
            // Finally execute the function and return its result
            return (funcs[i])();
        }
    };
    return MapParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapParser;
},{"./Config":3,"./Entities/BackgroundEntity":5}],13:[function(require,module,exports){
"use strict";
var Dimensions_1 = require('../Dimensions/Dimensions');
var Sprite = (function () {
    function Sprite(id, src) {
        this.id = id;
        this.src = src;
        this.animations = {};
        this.tiles = {};
        this.image = document.createElement('img');
        this.image.src = src;
    }
    Sprite.fromJSONObject = function (obj) {
        var sprite = new Sprite(obj.id, obj.src);
        for (var _i = 0, _a = obj.animations; _i < _a.length; _i++) {
            var animInfo = _a[_i];
            var animation = new Animation();
            animation.id = animInfo.id;
            animation.sprite = sprite;
            for (var _b = 0, _c = animInfo.frames; _b < _c.length; _b++) {
                var frameInfo = _c[_b];
                var id = frameInfo.id;
                var time = frameInfo.time;
                var coord = new Dimensions_1.Coordinate(frameInfo.origin.x, frameInfo.origin.y);
                var size = new Dimensions_1.Size(frameInfo.size.width, frameInfo.size.height);
                var frame = new Frame(id, time, coord, size);
                animation.frames.push(frame);
            }
            sprite.animations[animation.id] = animation;
        }
        for (var _d = 0, _e = obj.tiles; _d < _e.length; _d++) {
            var tilesInfo = _e[_d];
            var id = tilesInfo.id;
            var coord = new Dimensions_1.Coordinate(tilesInfo.origin.x, tilesInfo.origin.y);
            var size = new Dimensions_1.Size(tilesInfo.size.width, tilesInfo.size.height);
            var tile = new Tile(id, coord, size);
            tile.sprite = sprite;
            sprite.tiles[tile.id] = tile;
        }
        return sprite;
    };
    return Sprite;
}());
exports.Sprite = Sprite;
var Animation = (function () {
    function Animation() {
        this.frames = [];
        this.currentFrameIndex = 0;
    }
    return Animation;
}());
exports.Animation = Animation;
var Frame = (function () {
    function Frame(id, totalTime, origin, size) {
        this.id = id;
        this.totalTime = totalTime;
        this.origin = origin;
        this.size = size;
        // id: string;
        // totalTime: number
        // origin: Coordinate;
        // size: Size;
        this._currentTime = 0;
    }
    Object.defineProperty(Frame.prototype, "currentTime", {
        get: function () {
            return this._currentTime;
        },
        set: function (t) {
            this._currentTime = t;
        },
        enumerable: true,
        configurable: true
    });
    return Frame;
}());
exports.Frame = Frame;
var Tile = (function () {
    function Tile(id, origin, size) {
        this.id = id;
        this.origin = origin;
        this.size = size;
    }
    return Tile;
}());
exports.Tile = Tile;
},{"../Dimensions/Dimensions":4}],14:[function(require,module,exports){
"use strict";
var JsonLoader_1 = require("../Utils/JsonLoader");
var Classes_1 = require("./Classes");
var SpriteManager = (function () {
    function SpriteManager() {
    }
    SpriteManager.getSprite = function (id) {
        // let spriteInfo = SpriteManager.loadedSpriteInfo[id];
        // let sprite = Sprite.fromJSONObject(spriteInfo);
        return SpriteManager.sprites[id];
    };
    SpriteManager.getAnimation = function (spriteName, animName) {
        var sprite = SpriteManager.getSprite(spriteName);
        var animation = sprite.animations[animName];
        return animation;
    };
    SpriteManager.getTile = function (spriteName, animName) {
        var sprite = SpriteManager.getSprite(spriteName);
        var tile = sprite.tiles[animName];
        return tile;
    };
    SpriteManager.loadSprites = function (cb) {
        var loader = new JsonLoader_1.default('/demi/assets/sprites/sprites.json');
        loader.load(function (json) {
            var obj = JSON.parse(json);
            var totalImg = obj.sprites.length;
            var loadedImages = 0;
            for (var _i = 0, _a = obj.sprites; _i < _a.length; _i++) {
                var objSpriteInfo = _a[_i];
                SpriteManager.loadedSpriteInfo[objSpriteInfo.id] = objSpriteInfo;
                // let spriteInfo = SpriteInfo.fromObject(objSpriteInfo);
                var sprite = Classes_1.Sprite.fromJSONObject(objSpriteInfo);
                sprite.image.onload = function () {
                    if (++loadedImages >= totalImg) {
                        cb();
                    }
                };
                SpriteManager.sprites[sprite.id] = sprite;
            }
        });
    };
    SpriteManager.loadedSpriteInfo = {};
    SpriteManager.sprites = {};
    return SpriteManager;
}());
exports.SpriteManager = SpriteManager;
},{"../Utils/JsonLoader":16,"./Classes":13}],15:[function(require,module,exports){
"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.getOne = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        // var args = Array.prototype.slice.call(arguments);
        var rand = args[Math.floor(Math.random() * args.length)];
        return rand;
    };
    Utils.copyObject = function (object) {
        var objectCopy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }
        return objectCopy;
    };
    return Utils;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
},{}],16:[function(require,module,exports){
"use strict";
var JsonLoader = (function () {
    function JsonLoader(url) {
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", this.url, true);
    }
    JsonLoader.prototype.load = function (cb) {
        var self = this;
        this.xhr.send();
        this.xhr.onreadystatechange = function () {
            if (self.xhr.readyState == 4 && self.xhr.status == 200) {
                cb(self.xhr.responseText);
            }
        };
    };
    return JsonLoader;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JsonLoader;
},{}],17:[function(require,module,exports){
"use strict";
var Game_1 = require("./Game/Game");
var canvas = document.getElementById('canvas');
Game_1.Game.initialize(canvas);
},{"./Game/Game":11}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZS9DYW1lcmEudHMiLCJzcmMvR2FtZS9Db2xsaXNpb25zL0NvbGxpc2lvbk1hbmFnZXIudHMiLCJzcmMvR2FtZS9Db25maWcudHMiLCJzcmMvR2FtZS9EaW1lbnNpb25zL0RpbWVuc2lvbnMudHMiLCJzcmMvR2FtZS9FbnRpdGllcy9CYWNrZ3JvdW5kRW50aXR5LnRzIiwic3JjL0dhbWUvRW50aXRpZXMvRW50aXR5LnRzIiwic3JjL0dhbWUvRW50aXRpZXMvRnBzRW50aXR5LnRzIiwic3JjL0dhbWUvRW50aXRpZXMvSGVyby50cyIsInNyYy9HYW1lL0VudGl0aWVzL01vYi50cyIsInNyYy9HYW1lL0VudGl0aWVzL1N0YXRpY0VudGl0eS50cyIsInNyYy9HYW1lL0dhbWUudHMiLCJzcmMvR2FtZS9NYXBQYXJzZXIudHMiLCJzcmMvR2FtZS9TcHJpdGVzL0NsYXNzZXMudHMiLCJzcmMvR2FtZS9TcHJpdGVzL1Nwcml0ZU1hbmFnZXIudHMiLCJzcmMvR2FtZS9VdGlscy50cyIsInNyYy9HYW1lL1V0aWxzL0pzb25Mb2FkZXIudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFFNUI7SUFPSSxnQkFBbUIsT0FBa0M7UUFBbEMsWUFBTyxHQUFQLE9BQU8sQ0FBMkI7SUFDckQsQ0FBQztJQUVhLGFBQU0sR0FBcEI7UUFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbEIsV0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQiwwQ0FBMEM7UUFDMUMsdUZBQXVGO1FBQ3ZGLFdBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFdkIsV0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFD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QUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN04sQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4TCxDQUFDO1FBQ0QsMEVBQTBFO0lBQzlFLENBQUM7SUFFTSxxQkFBSSxHQUFYO1FBQ0ksSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM1RSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDO1lBRXZDLHNCQUFzQjtZQUN0QixFQUFFLENBQUMsQ0FBQyxtQ0FBZ0IsQ0FBQyxjQUFj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QUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge0dhbWV9IGZyb20gXCIuL0dhbWVcIjtcclxuaW1wb3J0IHtFbnRpdHl9IGZyb20gXCIuL0VudGl0aWVzL0VudGl0eVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9sbG93ZWRFbnRpdHk6IEVudGl0eTtcclxuXHJcbiAgICBzdGF0aWMgbmV4dFRyYW5zWCA9IDBcclxuICAgIHN0YXRpYyBuZXh0VHJhbnNZID0gMFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXh0PzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmb2xsb3coKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSBDYW1lcmE7XHJcbiAgICAgICAgR2FtZS5jb250ZXh0LnNhdmUoKTtcclxuICAgICAgICAvLyBHYW1lLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKTtcclxuICAgICAgICAvLyBHYW1lLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGgsIEdhbWUuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBHYW1lLmNvbnRleHQucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICBHYW1lLmNvbnRleHQudHJhbnNsYXRlKC1zZWxmLm5leHRUcmFuc1gsIC1zZWxmLm5leHRUcmFuc1kpO1xyXG4gICAgICAgIENhbWVyYS5uZXh0VHJhbnNYID0gMDtcclxuICAgICAgICBDYW1lcmEubmV4dFRyYW5zWSA9IDA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NhbWVyYScpXHJcbiAgICAgICAgR2FtZS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2VsZi5mb2xsb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9jdXNUbyhlbnRpdHk6IEVudGl0eSkge1xyXG4gICAgICAgIENhbWVyYS5mb2xsb3dlZEVudGl0eSA9IGVudGl0eTtcclxuICAgICAgICAvLyBDYW1lcmEubmV4dFRyYW5zWCA9IGVudGl0eS5wb3NpdGlvblgvMiArIGVudGl0eS53aWR0aC8yO1xyXG4gICAgICAgIC8vIENhbWVyYS5uZXh0VHJhbnNZID0gZW50aXR5LnBvc2l0aW9uWS8yICsgZW50aXR5LmhlaWdodC8yO1xyXG4gICAgICAgIENhbWVyYS5mb2xsb3coKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlLCBTaXplfSBmcm9tIFwiLi4vRGltZW5zaW9ucy9EaW1lbnNpb25zXCI7XHJcbmV4cG9ydCBjbGFzcyBDb2xsaXNpb25NYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb2xsaXNpb25BcmVhczogYW55ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHkoYXJlYTogQ29sbGlzaW9uQXJlYSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGV4aXN0aW5nQ29sbGlzaW9uQXJlYSBvZiBDb2xsaXNpb25NYW5hZ2VyLmNvbGxpc2lvbkFyZWFzKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrQ29sbGlzaW9uKHRvQ2hlY2tDb2xsaXNpb25BcmVhOiBDb2xsaXNpb25BcmVhKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgYXJlYUlkIGluIENvbGxpc2lvbk1hbmFnZXIuY29sbGlzaW9uQXJlYXMpIHtcclxuICAgICAgICAgICAgbGV0IGV4aXN0aW5nQ29sbGlzaW9uQXJlYSA9IENvbGxpc2lvbk1hbmFnZXIuY29sbGlzaW9uQXJlYXNbYXJlYUlkXTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nQ29sbGlzaW9uQXJlYS5lSWQgIT09IHRvQ2hlY2tDb2xsaXNpb25BcmVhLmVJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKENvbGxpc2lvbk1hbmFnZXIuY2hlY2tBcmVhc0NvbGxpZGVzKHRvQ2hlY2tDb2xsaXNpb25BcmVhLCBleGlzdGluZ0NvbGxpc2lvbkFyZWEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrQXJlYXNDb2xsaWRlcyhtb3ZpbmdBcmVhOiBDb2xsaXNpb25BcmVhLCBzdGF0aWNBcmVhOiBDb2xsaXNpb25BcmVhKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGxldCBjb2xsaWRlc1RvcExlZnQgPSBwb2ludFJlY3QobW92aW5nQXJlYS50b3BMZWZ0LCBzdGF0aWNBcmVhKTtcclxuICAgICAgICBsZXQgY29sbGlkZXNUb3BSaWdodCA9IHBvaW50UmVjdChtb3ZpbmdBcmVhLnRvcFJpZ2h0LCBzdGF0aWNBcmVhKTtcclxuICAgICAgICBsZXQgY29sbGlkZXNCb3R0b21MZWZ0ID0gcG9pbnRSZWN0KG1vdmluZ0FyZWEuYm90dG9tTGVmdCwgc3RhdGljQXJlYSk7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVzQm90dG9tUmlnaHQgPSBwb2ludFJlY3QobW92aW5nQXJlYS5ib3R0b21SaWdodCwgc3RhdGljQXJlYSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlc1RvcExlZnQgfHwgY29sbGlkZXNUb3BSaWdodCB8fCBjb2xsaWRlc0JvdHRvbUxlZnQgfHwgY29sbGlkZXNCb3R0b21SaWdodFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwb2ludFJlY3QocG9pbnQ6IENvb3JkaW5hdGUsIGNvbGxpc2lvbkFyZWE6IENvbGxpc2lvbkFyZWEpIHtcclxuICAgICAgICAgICAgdmFyIHB4ID0gcG9pbnQueDtcclxuICAgICAgICAgICAgdmFyIHB5ID0gcG9pbnQueTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4MSA9IGNvbGxpc2lvbkFyZWEudG9wTGVmdC54O1xyXG4gICAgICAgICAgICB2YXIgeTEgPSBjb2xsaXNpb25BcmVhLnRvcExlZnQueTtcclxuICAgICAgICAgICAgdmFyIHgyID0gY29sbGlzaW9uQXJlYS5ib3R0b21SaWdodC54XHJcbiAgICAgICAgICAgIHZhciB5MiA9IGNvbGxpc2lvbkFyZWEuYm90dG9tUmlnaHQueTtcclxuXHJcbiAgICAgICAgICAgIGlmIChweCA+IHgxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHggPCB4Mikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChweSA+IHkxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChweSA8IHkyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRDb2xsaXNpb25BcmVhKGVJZDogc3RyaW5nLCBhcmVhOiBDb2xsaXNpb25BcmVhKTogdm9pZCB7XHJcbiAgICAgICAgQ29sbGlzaW9uTWFuYWdlci5jb2xsaXNpb25BcmVhc1tlSWRdID0gYXJlYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZUNvbGxpc2lvbkFyZWEoZUlkOiBzdHJpbmcsIGFyZWE6IENvbGxpc2lvbkFyZWEpOiB2b2lkIHtcclxuICAgICAgICBDb2xsaXNpb25NYW5hZ2VyLmNvbGxpc2lvbkFyZWFzW2VJZF0gPSBhcmVhO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb2xsaXNpb25BcmVhIHtcclxuICAgIHB1YmxpYyBnZXQgdG9wTGVmdCgpOiBDb29yZGluYXRlIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvb3JkaW5hdGUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB0b3BSaWdodCgpOiBDb29yZGluYXRlIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvb3JkaW5hdGUodGhpcy54ICsgdGhpcy53aWR0aCwgdGhpcy55KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgYm90dG9tTGVmdCgpOiBDb29yZGluYXRlIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvb3JkaW5hdGUodGhpcy54LCB0aGlzLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGJvdHRvbVJpZ2h0KCk6IENvb3JkaW5hdGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29vcmRpbmF0ZSh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlSWQ6IHN0cmluZywgcHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlciwgcHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIENvbGxpc2lvbk1hbmFnZXIuYWRkQ29sbGlzaW9uQXJlYShlSWQsIHRoaXMpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dDb2xsaXNpb25BcmVhczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJva2VDb2xsaXNpb25BcmVhczogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbGxDb2xsaXNpb25BcmVhczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBwYXVzZU9uRm9jdXNMb3N0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRpbGVTaXplOiBudW1iZXIgPSAxNjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbWFwRGF0YTogc3RyaW5nID1cclxuICAgIGBGRkZGRkZGRkZGIEZGRkZGRkZGRkZGRiBGRkZGRkZGRkZGRkZGRkZGRkZGRkZcclxuRkdHR0dHR0dHRyBHR0dmZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHZkdHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dmR0dHR0dHRkdHR2ZHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZFRUbmZHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZUVFRUVFRUVFQgVFRUVFRUVFRUVFRUIFRUVFRUVFRUVFQ0VFRUVFRUVFRUVFxyXG5GVFRUVFRUVFRUIFRUVFRUVFRUVFRUVCBUVFRUVFRUVFRUNFRUVFRUVFRUVFRcclxuRmJiYmJiYmJiYiBiYmJiY1RUemJiYmIgYmJiYmJiYmJiYkZiYmJiYmJiYmJiXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHZkdHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dmR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZTR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHMVVVSUdHIEdHR0dnVFQ2R0dHRyBHR0cxVVVJR0dHRkdHR0dHR0dHR0dcclxuRkdHR1dYWFBHRyBHR0dHZ1RUNkdHR0cgR0dHV1hYUEdHR0ZHR0dHR0dHR0dHXHJcbkZHR0dXWFhQR0cgR0dHR2dUVDZHR0dHIEdHR1dYWFBHR0dGR0dHR0dHR0dHR1xyXG5GR0dHUU1NTEdHIEdHR0dnVFQ2R0dHRyBHR0dRTU1MR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR2ZHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR2ZHR0dHIEdHR0dnVFQ2ZkdHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR2ZHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHZkdHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dmR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHZmdUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHZkdHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHZkdHR0dHR0cgR0dHR2dUVDZHZkdHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIGZHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHZkcgR0dHR0dHR0dHR0ZHR0dHR2ZHR0dHXHJcbkZGRkZGRkZGRkYgRkZGRkY0NEZGRkZGIEZGRkZGRkZGRkZGRkZGRkZGRkZGRlxyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR1xyXG5GR0dHR0dHR0dHIEdHR0dnVFQ2R0dHRyBHR0dHR0dHR0dHRkdHR0dHR0dHR0dcclxuRkdHR0dHR0dHRyBHR0dHZ1RUNkdHR0cgR0dHR0dHR0dHR0ZHR0dHR0dHR0dHXHJcbkZHR0dHR0dHR0cgR0dHR2dUVDZHR0dHIEdHR0dHR0dHR0dGR0dHR0dHR0dHR2A7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIENvb3JkaW5hdGUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikgeyB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFNpemUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHtHYW1lfSBmcm9tICcuLi9HYW1lJztcclxuaW1wb3J0IHtFbnRpdHl9IGZyb20gJy4vRW50aXR5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY0VudGl0eSBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgcHVibGljIHByZWZpeDogc3RyaW5nID0gJ1NUJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGlsZU5hbWU6IHN0cmluZywgcHVibGljIGhhc0NvbGxpc2lvbjogYm9vbGVhbiA9IGZhbHNlLCBwdWJsaWMgcG9zaXRpb25YOiBudW1iZXIsIHB1YmxpYyBwb3NpdGlvblk6IG51bWJlciwgcHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCB3aWR0aCwgaGVpZ2h0LCAnbWFpbicsIHRpbGVOYW1lLCBoYXNDb2xsaXNpb24sICdCRycgKyB0aWxlTmFtZSk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJhc2UgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYXZvaWQgbG9zaW5nIHRoaXMgY29udGV4dCB3aXRoIGxhbWJkYSA9ICgpID0+XHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjdHggPSBHYW1lLmNvbnRleHQ7XHJcbiAgICAgICAgLy8gY3R4LmRyYXdJbWFnZSh0aGlzLmFuaW1hdGlvbi5zcHJpdGUuaW1hZ2UsIHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgQ29uZmlnIGZyb20nLi4vQ29uZmlnJztcclxuaW1wb3J0IFV0aWxzIGZyb20nLi4vVXRpbHMnO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQge1Nwcml0ZU1hbmFnZXJ9IGZyb20gJy4uL1Nwcml0ZXMvU3ByaXRlTWFuYWdlcic7XHJcbmltcG9ydCB7U3ByaXRlLCBBbmltYXRpb24sIEZyYW1lLCBUaWxlfSBmcm9tIFwiLi4vU3ByaXRlcy9DbGFzc2VzXCI7XHJcbmltcG9ydCB7Q29sbGlzaW9uTWFuYWdlciwgQ29sbGlzaW9uQXJlYX0gZnJvbSAnLi4vQ29sbGlzaW9ucy9Db2xsaXNpb25NYW5hZ2VyJztcclxuaW1wb3J0IHtDb29yZGluYXRlfSBmcm9tIFwiLi4vRGltZW5zaW9ucy9EaW1lbnNpb25zXCI7XHJcblxyXG50eXBlIGFuaW1hdGlvbk9yVGlsZSA9IEFuaW1hdGlvbiB8IFRpbGU7XHJcblxyXG5leHBvcnQgY2xhc3MgRW50aXR5IHtcclxuICAgIHByaXZhdGUgc3RhdGljIHRvdGFsRW50aXRpZXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIF9lSWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzcGVlZEJhc2U6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3BlZWRYOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNwZWVkWTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBjb2xsaXNpb25BcmVhOiBDb2xsaXNpb25BcmVhO1xyXG4gICAgcHVibGljIGRyYXdDb2xsaXNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhbmltYXRpb246IEFuaW1hdGlvbjtcclxuICAgIHB1YmxpYyB0aWxlOiBUaWxlO1xyXG5cclxuICAgIHB1YmxpYyByZW5kZXJUeXBlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRGcmFtZUluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGN1cnJlbnRGcmFtZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRGcmFtZSgpOiBGcmFtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZUluZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlZml4OiBzdHJpbmcgPSAnRSc7XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBpc01vdmluZ1goKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlZWRYICE9PSAwO1xyXG4gICAgfTtcclxuICAgIHByb3RlY3RlZCBnZXQgaXNNb3ZpbmdZKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwZWVkWSAhPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMuX2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb25YOiBudW1iZXIsIHB1YmxpYyBwb3NpdGlvblk6IG51bWJlciwgcHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlciwgcHVibGljIHNwcml0ZU5hbWU6IHN0cmluZywgcHVibGljIGFuaW1hdGlvbk9yVGlsZU5hbWU6IHN0cmluZywgaGFzQ29sbGlzaW9uOiBib29sZWFuLCBwdWJsaWMgdGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZUlkID0gKytFbnRpdHkudG90YWxFbnRpdGllcztcclxuICAgICAgICBsZXQgc3B0OiBhbmltYXRpb25PclRpbGUgPSBTcHJpdGVNYW5hZ2VyLmdldEFuaW1hdGlvbihzcHJpdGVOYW1lLCBhbmltYXRpb25PclRpbGVOYW1lKSB8fCBTcHJpdGVNYW5hZ2VyLmdldFRpbGUoc3ByaXRlTmFtZSwgYW5pbWF0aW9uT3JUaWxlTmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChzcHQgaW5zdGFuY2VvZiBBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSA8QW5pbWF0aW9uPnNwdDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gJ2FuaW1hdGlvbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcHQgaW5zdGFuY2VvZiBUaWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlsZSA9IDxUaWxlPnNwdDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gJ3RpbGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmF3Q29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVJZCk7XHJcbiAgICAgICAgaWYgKGhhc0NvbGxpc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbkFyZWEgPSBuZXcgQ29sbGlzaW9uQXJlYSh0aGlzLmVJZCwgcG9zaXRpb25YLCBwb3NpdGlvblksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYXZvaWQgbG9zaW5nIHRoaXMgY29udGV4dCB3aXRoIGxhbWJkYSA9ICgpID0+XHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZSgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBmdW5jdGlvbiByKCkge1xyXG4gICAgICAgICAgICBpZiAoQ29uZmlnLnNob3dDb2xsaXNpb25BcmVhcyAmJiAoQ29uZmlnLnN0cm9rZUNvbGxpc2lvbkFyZWFzIHx8IENvbmZpZy5maWxsQ29sbGlzaW9uQXJlYXMpKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmNvbnRleHQucmVjdChzZWxmLmNvbGxpc2lvbkFyZWEueCwgc2VsZi5jb2xsaXNpb25BcmVhLnksIHNlbGYuY29sbGlzaW9uQXJlYS53aWR0aCwgc2VsZi5jb2xsaXNpb25BcmVhLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ29uZmlnLnN0cm9rZUNvbGxpc2lvbkFyZWFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5jb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKENvbmZpZy5maWxsQ29sbGlzaW9uQXJlYXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDEyOCwgMjMyLCAyNTUsIDAuNSlcIjtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLmNvbnRleHQuZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5yZW5kZXJUeXBlID09PSAnYW5pbWF0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hZGRGcmFtZVRpbWUoR2FtZS5kZWx0YVRpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3R4ID0gR2FtZS5jb250ZXh0O1xyXG4gICAgICAgICAgICAvLyBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLmltYWdlLCB0aGlzLnBvc2l0aW9uWCwgdGhpcy5wb3NpdGlvblkpO1xyXG4gICAgICAgICAgICBzZWxmLmRyYXdGcmFtZSgpO1xyXG4gICAgICAgICAgICBzZWxmLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lLnJlcXVlc3RBbmltYXRpb25GcmFtZShyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZEZyYW1lVGltZSh0aW1lOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lVGltZSArPSB0aW1lO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRGcmFtZVRpbWUgPj0gdGhpcy5jdXJyZW50RnJhbWUudG90YWxUaW1lIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEZyYW1lKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudEZyYW1lVGltZSA9IGZvcmNlID8gMCA6IHRpbWUgLSB0aGlzLmN1cnJlbnRGcmFtZS50b3RhbFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZyYW1lVGltZSA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHRGcmFtZSgpIHtcclxuICAgICAgICBsZXQgdG90YWxGcmFtZXMgPSB0aGlzLmFuaW1hdGlvbi5mcmFtZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50RnJhbWVJbmRleCA9PT0gdG90YWxGcmFtZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdGcmFtZSgpIHtcclxuICAgICAgICBsZXQgY3R4ID0gR2FtZS5jb250ZXh0O1xyXG4gICAgICAgIGxldCBkcmF3OiBhbmltYXRpb25PclRpbGU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyVHlwZSA9PT0gJ2FuaW1hdGlvbicpIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmFuaW1hdGlvbi5zcHJpdGUuaW1hZ2UsIHRoaXMuY3VycmVudEZyYW1lLm9yaWdpbi54LCB0aGlzLmN1cnJlbnRGcmFtZS5vcmlnaW4ueSwgdGhpcy5jdXJyZW50RnJhbWUuc2l6ZS53aWR0aCwgdGhpcy5jdXJyZW50RnJhbWUuc2l6ZS5oZWlnaHQsIHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVuZGVyVHlwZSA9PT0gJ3RpbGUnKSB7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy50aWxlLnNwcml0ZS5pbWFnZSwgdGhpcy50aWxlLm9yaWdpbi54LCB0aGlzLnRpbGUub3JpZ2luLnksIHRoaXMudGlsZS5zaXplLndpZHRoLCB0aGlzLnRpbGUuc2l6ZS5oZWlnaHQsIHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBmdXR1cmVQb3NpdGlvblggPSB0aGlzLnBvc2l0aW9uWCArICh0aGlzLnNwZWVkWCAqIEdhbWUuZGVsdGFUaW1lICogMTAwKTtcclxuICAgICAgICBsZXQgZnV0dXJlUG9zaXRpb25ZID0gdGhpcy5wb3NpdGlvblkgKyAodGhpcy5zcGVlZFkgKiBHYW1lLmRlbHRhVGltZSAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNwZWVkWCAhPT0gMCB8fCB0aGlzLnNwZWVkWSAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbkFyZWEueCA9IGZ1dHVyZVBvc2l0aW9uWDtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25BcmVhLnkgPSBmdXR1cmVQb3NpdGlvblk7XHJcblxyXG4gICAgICAgICAgICAvL2lmIGNvbGxpZGVzIHNvbWV0aGlnXHJcbiAgICAgICAgICAgIGlmIChDb2xsaXNpb25NYW5hZ2VyLmNoZWNrQ29sbGlzaW9uKHRoaXMuY29sbGlzaW9uQXJlYSkpIHtcclxuICAgICAgICAgICAgICAgIC8vcmVzdG9yZSBjb2xBcmVhXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbkFyZWEueCA9IHRoaXMucG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25BcmVhLnkgPSB0aGlzLnBvc2l0aW9uWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRYID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25YID0gZnV0dXJlUG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblkgPSBmdXR1cmVQb3NpdGlvblk7XHJcbiAgICAgICAgICAgICAgICBDb2xsaXNpb25NYW5hZ2VyLnVwZGF0ZUNvbGxpc2lvbkFyZWEodGhpcy5lSWQsIHRoaXMuY29sbGlzaW9uQXJlYSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjaGFuZ2VBbmltYXRpb25TcHJpdGUoc3ByaXRlTmFtZTogc3RyaW5nLCBhbmltYXRpb25OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uaWQgIT09IGFuaW1hdGlvbk5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSBTcHJpdGVNYW5hZ2VyLmdldEFuaW1hdGlvbihzcHJpdGVOYW1lLCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEZyYW1lVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTcGVlZFgoc3BlZWRYOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNwZWVkWCA9IHNwZWVkWDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3BlZWRZKHNwZWVkWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVlZFkgPSBzcGVlZFk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRleHQodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dhbWV9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQge0VudGl0eX0gZnJvbSAnLi9FbnRpdHknO1xyXG5pbXBvcnQge0Nvb3JkaW5hdGV9IGZyb20gXCIuLi9EaW1lbnNpb25zL0RpbWVuc2lvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGcHNFbnRpdHkgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIHByaXZhdGUgY29sb3I6IHN0cmluZyA9ICcjMDAwJztcclxuICAgIHB1YmxpYyB0ZXh0OiBzdHJpbmcgPSAnMCc7XHJcbiAgICBwdWJsaWMgZm9udFNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgcHVibGljIGZvbnRTaXplVW5pdHM6IHN0cmluZyA9ICdweCc7XHJcbiAgICBwdWJsaWMgZm9udEZhbWlseTogc3RyaW5nID0gJ0NvdXJpZXIgTmV3JztcclxuXHJcbiAgICBwcml2YXRlIGZwc1ZhbHVlczogQ29vcmRpbmF0ZVtdID0gW1xyXG4gICAgICAgIG5ldyBDb29yZGluYXRlKDAsIDApLFxyXG4gICAgICAgIG5ldyBDb29yZGluYXRlKDAsIDEwKSxcclxuICAgICAgICBuZXcgQ29vcmRpbmF0ZSgwLCAyMCksXHJcbiAgICAgICAgbmV3IENvb3JkaW5hdGUoMCwgMzApLFxyXG4gICAgXTtcclxuXHJcbiAgICAvL2F2b2lkIGxvc2luZyB0aGlzIGNvbnRleHQgd2l0aCBsYW1iZGEgPSAoKSA9PlxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY3R4ID0gR2FtZS5jb250ZXh0O1xyXG4gICAgICAgIGN0eC5mb250ID0gYCR7dGhpcy5mb250U2l6ZX0ke3RoaXMuZm9udFNpemVVbml0c30gJHt0aGlzLmZvbnRGYW1pbHl9YDtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvclxyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRleHQodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGZwcyA9ICt0ZXh0O1xyXG4gICAgICAgIGxldCBmcHNQZXJjZW50ID0gTWF0aC5yb3VuZChmcHMgKiAxMDAgLyA2MCk7XHJcbiAgICAgICAgaWYgKGZwc1BlcmNlbnQgPiAxMDApIHtcclxuICAgICAgICAgICAgZnBzUGVyY2VudCA9IDEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLm51bWJlclRvQ29sb3JSZ2IoZnBzKSk7XHJcblxyXG4gICAgICAgIGxldCBzdHIgPSBgJHtmcHN9IGZwc2A7XHJcbiAgICAgICAgc3VwZXIuc2V0VGV4dChzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbnVtYmVyVG9Db2xvclJnYihpOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZWQgPSBNYXRoLmZsb29yKDI1NSAtICgyNTUgKiBpIC8gMTAwKSk7XHJcbiAgICAgICAgbGV0IGdyZWVuID0gTWF0aC5mbG9vcigyNTUgKiBpIC8gMTAwKTtcclxuICAgICAgICByZXR1cm4gJ3JnYignICsgcmVkICsgJywnICsgZ3JlZW4gKyAnLDApJ1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0dhbWV9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQge0VudGl0eX0gZnJvbSAnLi9FbnRpdHknO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuLi9DYW1lcmFcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVybyBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgcHVibGljIHByZWZpeDogc3RyaW5nID0gJ0gnO1xyXG5cclxuICAgIGlzQ2FtZXJhQmxvY2tlZFggPSBmYWxzZTtcclxuICAgIGlzQ2FtZXJhQmxvY2tlZFkgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgR2FtZS5jb250ZXh0LmNhbnZhcy53aWR0aCAvIDIgLSBDb25maWcudGlsZVNpemUgLyAyLFxyXG4gICAgICAgICAgICBHYW1lLmNvbnRleHQuY2FudmFzLmhlaWdodCAvIDIgLSBDb25maWcudGlsZVNpemUgLyAyLFxyXG4gICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgJ21haW4nLFxyXG4gICAgICAgICAgICAnYV9oZXJvX2lkbGUnLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAnSGVybycpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCYXNlID0gMS41O1xyXG4gICAgICAgIHRoaXMuc2V0Q29udHJvbGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYXZvaWQgbG9zaW5nIHRoaXMgY29udGV4dCB3aXRoIGxhbWJkYSA9ICgpID0+XHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlLmFkZFNwcml0ZVRpbWUoR2FtZS5kZWx0YVRpbWUqMTAwMCk7XHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY29udGV4dDtcclxuICAgICAgICAvLyBjdHgudHJhbnNsYXRlKHRoaXMucG9zaXRpb25YLCB0aGlzLnBvc2l0aW9uWSlcclxuICAgICAgICAvLyB0aGlzLmN0ICs9IDAuMDAxXHJcbiAgICAgICAgLy8gR2FtZS5jb250ZXh0LnRyYW5zbGF0ZSh0aGlzLmN0LHRoaXMuY3QpXHJcbiAgICAgICAgLy8gLy8gY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZS5pbWFnZSwgdGhpcy5wb3NpdGlvblgsIHRoaXMucG9zaXRpb25ZKTtcclxuICAgICAgICAvLyB0aGlzLnNwcml0ZS5kcmF3U3ByaXRlKGN0eCwgdGhpcy5wb3NpdGlvblgsIHRoaXMucG9zaXRpb25ZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBvbGRQb3NpdGlvblggPSB0aGlzLnBvc2l0aW9uWDtcclxuICAgICAgICBsZXQgb2xkUG9zaXRpb25ZID0gdGhpcy5wb3NpdGlvblk7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsU3BlZWRYID0gdGhpcy5zcGVlZFg7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsU3BlZWRZID0gdGhpcy5zcGVlZFk7XHJcbiAgICAgICAgbGV0IGZ1dHVyZVBvc2l0aW9uWCA9IDA7XHJcbiAgICAgICAgbGV0IGZ1dHVyZVBvc2l0aW9uWSA9IDA7XHJcbiAgICAgICAgbGV0IG1vdmVkID0gc3VwZXIubW92ZSgpO1xyXG4gICAgICAgIGlmIChtb3ZlZCAmJiAob3JpZ2luYWxTcGVlZFggfHwgb3JpZ2luYWxTcGVlZFkpKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdtb3ZlIGNhbWVyYScpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHBhcnNlSW50KEdhbWUuY29udGV4dE9yZ2luYWxYLnRvU3RyaW5nKCkpID49IEdhbWUud29ybGRXaWR0aCAtIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdyaWdodCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gZnV0dXJlUG9zaXRpb25YID0gLUdhbWUuY29udGV4dE9yZ2luYWxYICsgKEdhbWUud29ybGRXaWR0aCAtIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGgpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gZnV0dXJlUG9zaXRpb25YID0gKEdhbWUud29ybGRXaWR0aCAtIChHYW1lLmNvbnRleHQuY2FudmFzLndpZHRoLzIpIC0gdGhpcy5wb3NpdGlvblggKyB0aGlzLndpZHRoIC8yKSA7XHJcbiAgICAgICAgICAgIC8vICAgICBmdXR1cmVQb3NpdGlvblggPSAwXHJcbiAgICAgICAgICAgIC8vICAgICBHYW1lLmNvbnRleHRPcmdpbmFsWCA9IEdhbWUud29ybGRXaWR0aCAtIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIH0gZWxzZVxyXG4gICAgICAgICAgICBpZiAoR2FtZS5jb250ZXh0LmNhbnZhcy53aWR0aCAvIDIgPCB0aGlzLnBvc2l0aW9uWCArIHRoaXMud2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBmdXR1cmVQb3NpdGlvblggPSAob3JpZ2luYWxTcGVlZFggKiBHYW1lLmRlbHRhVGltZSAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2FtZXJhQmxvY2tlZFggPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0NhbWVyYUJsb2NrZWRYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnV0dXJlUG9zaXRpb25YID0gLUdhbWUuY29udGV4dE9yZ2luYWxYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFCbG9ja2VkWCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTm90IHgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZS5jb250ZXh0LmNhbnZhcy5oZWlnaHQgLyAyIDwgdGhpcy5wb3NpdGlvblkgKyB0aGlzLmhlaWdodCAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGZ1dHVyZVBvc2l0aW9uWSA9IChvcmlnaW5hbFNwZWVkWSAqIEdhbWUuZGVsdGFUaW1lICogMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDYW1lcmFCbG9ja2VkWSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ2FtZXJhQmxvY2tlZFkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdXR1cmVQb3NpdGlvblkgPSAtR2FtZS5jb250ZXh0T3JnaW5hbFk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYUJsb2NrZWRZID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdOb3QgeScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENhbWVyYS5uZXh0VHJhbnNYID0gZnV0dXJlUG9zaXRpb25YO1xyXG4gICAgICAgICAgICBDYW1lcmEubmV4dFRyYW5zWSA9IGZ1dHVyZVBvc2l0aW9uWTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZnV0dXJlUG9zaXRpb25YLCBmdXR1cmVQb3NpdGlvblkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW92ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IExFRlQgPSAzNztcclxuICAgICAgICBjb25zdCBVUCA9IDM4O1xyXG4gICAgICAgIGNvbnN0IFJJR0hUID0gMzk7XHJcbiAgICAgICAgY29uc3QgRE9XTiA9IDQwO1xyXG4gICAgICAgIGNvbnN0IFNQRUVEID0gdGhpcy5zcGVlZEJhc2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudDogS2V5Ym9hcmRFdmVudCA9IHdpbmRvdy5ldmVudCA/IDxLZXlib2FyZEV2ZW50PndpbmRvdy5ldmVudCA6IGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQW5pbWF0aW9uU3ByaXRlKCdtYWluJywgJ2FfaGVyb19ydW5fbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3BlZWRYKC1TUEVFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQW5pbWF0aW9uU3ByaXRlKCdtYWluJywgJ2FfaGVyb19ydW5fcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNwZWVkWChTUEVFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFVQOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQW5pbWF0aW9uU3ByaXRlKCdtYWluJywgJ2FfaGVyb19ydW5fcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNwZWVkWSgtU1BFRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBET1dOOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQW5pbWF0aW9uU3ByaXRlKCdtYWluJywgJ2FfaGVyb19ydW5fbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3BlZWRZKFNQRUVEKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBvbktleVVwKGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50OiBLZXlib2FyZEV2ZW50ID0gd2luZG93LmV2ZW50ID8gPEtleWJvYXJkRXZlbnQ+d2luZG93LmV2ZW50IDogZTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPiAzNiAmJiBldmVudC5rZXlDb2RlIDwgNDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQW5pbWF0aW9uU3ByaXRlKCdtYWluJywgJ2FfaGVyb19pZGxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExFRlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTcGVlZFgoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3BlZWRYKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBVUDpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNwZWVkWSgwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRE9XTjpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFNwZWVkWSgwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cub25rZXlkb3duID0gb25LZXlEb3duO1xyXG4gICAgICAgIHdpbmRvdy5vbmtleXVwID0gb25LZXlVcDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi4vVXRpbHMnO1xyXG5pbXBvcnQge0dhbWV9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQge0VudGl0eX0gZnJvbSAnLi9FbnRpdHknO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuLi9Db25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2IgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIHB1YmxpYyBwcmVmaXg6IHN0cmluZyA9ICdNJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb25YOiBudW1iZXIsIHB1YmxpYyBwb3NpdGlvblk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBDb25maWcudGlsZVNpemUsIENvbmZpZy50aWxlU2l6ZSwgJ3Rlc3QnLCAnYV9zd2l0Y2hfYmlnJywgdHJ1ZSwgJ01vYicpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCYXNlID0gMC41O1xyXG4gICAgICAgIHRoaXMuc3BlZWRYID0gMC41O1xyXG4gICAgfVxyXG5cclxuICAgIC8vYXZvaWQgbG9zaW5nIHRoaXMgY29udGV4dCB3aXRoIGxhbWJkYSA9ICgpID0+XHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjdHggPSBHYW1lLmNvbnRleHQ7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBydG4gPSBzdXBlci5tb3ZlKCk7XHJcbiAgICAgICAgaWYgKCFydG4pIHtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZEJhc2UgPSAtdGhpcy5zcGVlZEJhc2U7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc3BlZWRYID0gdGhpcy5zcGVlZEJhc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW92aW5nWCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSB0aGlzLnNwZWVkQmFzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRYID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTW92aW5nWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFggPSB0aGlzLnNwZWVkQmFzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChVdGlscy5nZXRPbmUodHJ1ZSwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkWCA9IHRoaXMuc3BlZWRCYXNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSB0aGlzLnNwZWVkQmFzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcnRuO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0dhbWV9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQge0VudGl0eX0gZnJvbSAnLi9FbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRpY0VudGl0eSBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgcHVibGljIHByZWZpeDogc3RyaW5nID0gJ1NUJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb25YOiBudW1iZXIsIHB1YmxpYyBwb3NpdGlvblk6IG51bWJlciwgcHVibGljIHdpZHRoOiBudW1iZXIsIHB1YmxpYyBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCB3aWR0aCwgaGVpZ2h0LCAndGVzdCcsICd0X2VtcHR5JywgdHJ1ZSwgJ1N0YXRpYycpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCYXNlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL2F2b2lkIGxvc2luZyB0aGlzIGNvbnRleHQgd2l0aCBsYW1iZGEgPSAoKSA9PlxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY3R4ID0gR2FtZS5jb250ZXh0O1xyXG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UodGhpcy5hbmltYXRpb24uc3ByaXRlLmltYWdlLCB0aGlzLnBvc2l0aW9uWCwgdGhpcy5wb3NpdGlvblkpO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IENvbmZpZyBmcm9tJy4vQ29uZmlnJztcclxuaW1wb3J0IHsgU3ByaXRlTWFuYWdlciB9IGZyb20gJy4vU3ByaXRlcy9TcHJpdGVNYW5hZ2VyJztcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vRW50aXRpZXMvRW50aXR5XCI7XHJcbmltcG9ydCB7IFN0YXRpY0VudGl0eSB9IGZyb20gXCIuL0VudGl0aWVzL1N0YXRpY0VudGl0eVwiO1xyXG5pbXBvcnQgeyBGcHNFbnRpdHkgfSBmcm9tIFwiLi9FbnRpdGllcy9GcHNFbnRpdHlcIjtcclxuaW1wb3J0IHsgSGVybyB9IGZyb20gXCIuL0VudGl0aWVzL0hlcm9cIjtcclxuaW1wb3J0IHsgTW9iIH0gZnJvbSBcIi4vRW50aXRpZXMvTW9iXCI7XHJcbmltcG9ydCB7Q29sbGlzaW9uTWFuYWdlciwgQ29sbGlzaW9uQXJlYX0gZnJvbSAnLi9Db2xsaXNpb25zL0NvbGxpc2lvbk1hbmFnZXInO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuL0NhbWVyYVwiO1xyXG5pbXBvcnQgTWFwUGFyc2VyIGZyb20gXCIuL01hcFBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2FtZUZvY3VzZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIHN0YXRpYyBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbHRhVGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZnBzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxhc3RDYWxsZWRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBmcHNFbnRpdHk6IEZwc0VudGl0eTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBmcHNEcmF3VGltZTogbnVtYmVyID0gMTAwMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGxhc3REcmF3RnBzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG1heFdpZHRoOiBudW1iZXIgPSA4MDA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBtYXhIZWlnaHQ6IG51bWJlciA9IDYwMDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdvcmxkV2lkdGg6IG51bWJlciA9IDEwMDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHdvcmxkSGVpZ2h0OiBudW1iZXIgPSA0NjQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb250ZXh0T3JnaW5hbFg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbnRleHRPcmdpbmFsWTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgR2FtZS5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgR2FtZS5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgU3ByaXRlTWFuYWdlci5sb2FkU3ByaXRlcyhHYW1lLmluaXQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKENvbmZpZy5tYXBEYXRhKVxyXG4gICAgICAgIGxldCBvcmlnaW5hbFRyYW5zbGF0ZUZuID0gR2FtZS5jb250ZXh0LnRyYW5zbGF0ZTtcclxuICAgICAgICBHYW1lLmNvbnRleHRPcmdpbmFsWCA9IDA7XHJcbiAgICAgICAgR2FtZS5jb250ZXh0T3JnaW5hbFkgPSAwO1xyXG4gICAgICAgIEdhbWUuY29udGV4dC50cmFuc2xhdGUgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgICAgIEdhbWUuY29udGV4dE9yZ2luYWxYIC09IHg7XHJcbiAgICAgICAgICAgIEdhbWUuY29udGV4dE9yZ2luYWxZIC09IHk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEdhbWUuY29udGV4dE9yZ2luYWxYLCBHYW1lLmNvbnRleHRPcmdpbmFsWSk7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsVHJhbnNsYXRlRm4uYXBwbHkodGhpcywgW3gsIHldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBHYW1lLndhdGNoRm9jdXMoKTtcclxuICAgICAgICBHYW1lLnJlcXVlc3RBbmltYXRpb25GcmFtZShHYW1lLmNhbGN1bGF0ZURlbHRhVGltZSk7XHJcbiAgICAgICAgR2FtZS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoR2FtZS5jbGVhckNhbnZhcyk7XHJcbiAgICAgICAgTWFwUGFyc2VyLnBhcnNlRnJvbVN0cihDb25maWcubWFwRGF0YSk7XHJcbiAgICAgICAgbGV0IGZwcyA9IG5ldyBGcHNFbnRpdHkoMCwgMTUsIDAsIDAsICd0ZXN0JywgJ3RfZW1wdHknLCB0cnVlLCAnMCcpO1xyXG4gICAgICAgIEdhbWUuc2V0RnBzRGlzcGxheShmcHMsIDI1MCk7XHJcbiAgICAgICAgbGV0IG1vYjIgPSBuZXcgTW9iKENvbmZpZy50aWxlU2l6ZSAqIDEsIENvbmZpZy50aWxlU2l6ZSAqIDEpO1xyXG4gICAgICAgIGxldCBtb2IzID0gbmV3IE1vYihDb25maWcudGlsZVNpemUgKiAyLCBDb25maWcudGlsZVNpemUgKiAyKTtcclxuICAgICAgICBsZXQgbW9iID0gbmV3IE1vYihDb25maWcudGlsZVNpemUgKiAzLCBDb25maWcudGlsZVNpemUgKiAzKTtcclxuICAgICAgICBsZXQgbW9iNCA9IG5ldyBNb2IoQ29uZmlnLnRpbGVTaXplICogNCwgQ29uZmlnLnRpbGVTaXplICogNCk7XHJcbiAgICAgICAgbGV0IG1vYjUgPSBuZXcgTW9iKENvbmZpZy50aWxlU2l6ZSAqIDUsIENvbmZpZy50aWxlU2l6ZSAqIDUpO1xyXG4gICAgICAgIGxldCBtb2I2ID0gbmV3IE1vYihDb25maWcudGlsZVNpemUgKiA2LCBDb25maWcudGlsZVNpemUgKiA2KTtcclxuICAgICAgICBsZXQgc3RpYyA9IG5ldyBTdGF0aWNFbnRpdHkoNTAsIDM1MCwgMjAwLCAxMDApO1xyXG4gICAgICAgIGxldCBzdGljMiA9IG5ldyBTdGF0aWNFbnRpdHkoNDAwLCA1MCwgNDAwLCAxMDApO1xyXG4gICAgICAgIGxldCBzdGljMyA9IG5ldyBTdGF0aWNFbnRpdHkoNDAwLCA1MDAsIDEwMCwgMTUwKTtcclxuXHJcbiAgICAgICAgbGV0IGhlcm8gPSBuZXcgSGVybygpO1xyXG4gICAgICAgIC8vIGxldCBib3JkZXJidHRtID0gbmV3IFN0YXRpY0VudGl0eShHYW1lLndvcmxkV2lkdGgsIEdhbWUud29ybGRIZWlnaHQsIC1HYW1lLndvcmxkV2lkdGgsIDEwKTtcclxuICAgICAgICAvLyBsZXQgYm9yZGVycmdodCA9IG5ldyBTdGF0aWNFbnRpdHkoR2FtZS53b3JsZFdpZHRoLCBHYW1lLndvcmxkSGVpZ2h0LCAxMCwgLUdhbWUud29ybGRIZWlnaHQpO1xyXG4gICAgICAgIGxldCBjID0gQ2FtZXJhO1xyXG4gICAgICAgIGMuZm9jdXNUbyhoZXJvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjazogKHRpbWU/OiBudW1iZXIpID0+IHZvaWQsIHNraXBQYXVzZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgZnVuY3Rpb24gZih0OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIEdhbWUuY2FsY3VsYXRlRGVsdGFUaW1lKG5vdyk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG5vdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lLmdhbWVGb2N1c2VkIHx8IHNraXBQYXVzZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xlYXJDYW52YXMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IEdhbWUubWF4V2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6IEdhbWUubWF4V2lkdGg7XHJcbiAgICAgICAgLy8gbGV0IGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqICgzIC8gNCkgPCBHYW1lLm1heEhlaWdodCA/IHdpbmRvdy5pbm5lcldpZHRoICogKDMgLyA0KSA6IEdhbWUubWF4SGVpZ2h0O1xyXG4gICAgICAgIC8vIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGggPSB3O1xyXG4gICAgICAgIC8vIEdhbWUuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICBHYW1lLmNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIEdhbWUuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMClcclxuICAgICAgICBHYW1lLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIEdhbWUuY29udGV4dC5jYW52YXMud2lkdGgsIEdhbWUuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBHYW1lLmNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgIEdhbWUudXBkYXRlRGVhZFpvbmUoKTtcclxuICAgICAgICBHYW1lLnJlcXVlc3RBbmltYXRpb25GcmFtZShHYW1lLmNsZWFyQ2FudmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVEZWx0YVRpbWUodGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKCFHYW1lLmxhc3RDYWxsZWRUaW1lKSB7XHJcbiAgICAgICAgICAgIEdhbWUubGFzdENhbGxlZFRpbWUgPSBub3c7XHJcbiAgICAgICAgICAgIEdhbWUucmVxdWVzdEFuaW1hdGlvbkZyYW1lKEdhbWUuY2FsY3VsYXRlRGVsdGFUaW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZS5kZWx0YVRpbWUgPSAobm93IC0gR2FtZS5sYXN0Q2FsbGVkVGltZSkgLyAxMDAwO1xyXG4gICAgICAgIGlmIChHYW1lLmRlbHRhVGltZSA+IDEgfHwgIUdhbWUuZ2FtZUZvY3VzZWQpIHtcclxuICAgICAgICAgICAgR2FtZS5kZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lLmZwcyA9IE1hdGgucm91bmQoMSAvIEdhbWUuZGVsdGFUaW1lKTtcclxuXHJcbiAgICAgICAgR2FtZS5sYXN0Q2FsbGVkVGltZSA9IG5vdztcclxuICAgICAgICBHYW1lLnJlcXVlc3RBbmltYXRpb25GcmFtZShHYW1lLmNhbGN1bGF0ZURlbHRhVGltZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmxhc3RDYWxsZWRUaW1lIC0gR2FtZS5sYXN0RHJhd0ZwcyA+IEdhbWUuZnBzRHJhd1RpbWUgJiYgR2FtZS5mcHNFbnRpdHkpIHtcclxuICAgICAgICAgICAgR2FtZS5sYXN0RHJhd0ZwcyA9IEdhbWUubGFzdENhbGxlZFRpbWU7XHJcbiAgICAgICAgICAgIEdhbWUuZnBzRW50aXR5LnNldFRleHQoR2FtZS5mcHMudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldEZwc0Rpc3BsYXkoZW50aXR5OiBGcHNFbnRpdHksIHRpbWU/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBHYW1lLmZwc0VudGl0eSA9IGVudGl0eTtcclxuICAgICAgICBpZiAodGltZSkge1xyXG4gICAgICAgICAgICBHYW1lLmZwc0RyYXdUaW1lID0gdGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXBkYXRlRGVhZFpvbmUoKSB7XHJcbiAgICAgICAgY29uc3QgaW5maW5pdGUgPSA5OTk5OTk5OTk7XHJcbiAgICAgICAgbGV0IHRvcERlYWRab25lID0gbmV3IENvbGxpc2lvbkFyZWEoJ3RvcERlYWRab25lJywgMCwgLWluZmluaXRlLCBHYW1lLndvcmxkV2lkdGgsIGluZmluaXRlKTtcclxuICAgICAgICBsZXQgcmlnaHREZWFkWm9uZSA9IG5ldyBDb2xsaXNpb25BcmVhKCdyaWdodERlYWRab25lJywgR2FtZS53b3JsZFdpZHRoLCAwLCBHYW1lLndvcmxkSGVpZ2h0LCBpbmZpbml0ZSk7XHJcbiAgICAgICAgbGV0IGJvdHRvbURlYWRab25lID0gbmV3IENvbGxpc2lvbkFyZWEoJ2JvdHRvbURlYWRab25lJywgMCwgR2FtZS53b3JsZEhlaWdodCwgR2FtZS53b3JsZFdpZHRoLCBpbmZpbml0ZSk7XHJcbiAgICAgICAgbGV0IGxlZnREZWFkWm9uZSA9IG5ldyBDb2xsaXNpb25BcmVhKCdsZWZ0RGVhZFpvbmUnLCAtaW5maW5pdGUsIDAsIGluZmluaXRlLCBHYW1lLndvcmxkSGVpZ2h0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgd2F0Y2hGb2N1cygpIHtcclxuICAgICAgICBsZXQgaGlkZGVuOiBzdHJpbmcsIHZpc2liaWxpdHlDaGFuZ2U6IHN0cmluZztcclxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydFxyXG4gICAgICAgICAgICBoaWRkZW4gPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ2aXNpYmlsaXR5Y2hhbmdlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCkge1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRbaGlkZGVuXSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZS5nYW1lRm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2FtZS5nYW1lRm9jdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ29uZmlnLnBhdXNlT25Gb2N1c0xvc3QpIHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50W2hpZGRlbl0pIHtcclxuICAgICAgICAgICAgICAgIEdhbWUuZ2FtZUZvY3VzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih2aXNpYmlsaXR5Q2hhbmdlLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCYWNrZ3JvdW5kRW50aXR5IGZyb20gXCIuL0VudGl0aWVzL0JhY2tncm91bmRFbnRpdHlcIjtcclxuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9Db25maWdcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwUGFyc2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VGcm9tU3RyKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIHdoaXRlIHNwYWNlc1xyXG4gICAgICAgICAgICByb3cgPSByb3cucmVwbGFjZSgvXFxzL2csICcnKTtcclxuICAgICAgICAgICAgbGV0IHJvd0FyciA9IHJvdy5zcGxpdCgnJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsID0gcm93QXJyLmxlbmd0aDsgaiA8IGw7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoYXIgPSByb3dBcnJbal07XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRic6Ly9mZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9mZW5jZV9ncmFzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzQnOi8vZmVuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZmVuY2VfdGlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2YnOi8vZmVuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZ3Jhc3NfZmxvd2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0cnOi8vZ3Jhc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRleGVjKCkgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBCYWNrZ3JvdW5kRW50aXR5KCd0X2dyYXNzX2Zsb3dlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9ncmFzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2cnOi8vZ3JlYXNzLWxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZ3Jhc3NfcmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzYnOi8vZ3Jhc3MtcmlndFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9ncmFzc19sZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0JzovL2dyYXNzLXJpZ3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZ3Jhc3NfYm90dG9tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdiJzovL2dyYXNzLXJpZ3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZ3Jhc3NfdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd6JzovL2dyYXNzLXJpZ3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3RfZ3Jhc3NfdG9wX2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOi8vZ3Jhc3MtcmlndFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9ncmFzc190b3BfcmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOi8vZ3Jhc3MtcmlndFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9ncmFzc19ib3R0b21fcmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ24nOi8vZ3Jhc3MtcmlndFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9ncmFzc19ib3R0b21fbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6Ly90aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF90aWxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1MnOi8vdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3Rfc2lnbl9ncmFzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1gnOi8vdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3Rfc2FuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdVJzovL3RpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBCYWNrZ3JvdW5kRW50aXR5KCd0X3NhbmRfdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOi8vdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3Rfc2FuZF9ib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVyc6Ly90aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9zYW5kX2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUCc6Ly90aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5zdGFuY2UgYmcgdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgQmFja2dyb3VuZEVudGl0eSgndF9zYW5kX3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzEnOi8vdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3Rfc2FuZF90b3BfbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdJJzovL3RpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBCYWNrZ3JvdW5kRW50aXR5KCd0X3NhbmRfdG9wX3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maWcudGlsZVNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOi8vdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luc3RhbmNlIGJnIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEJhY2tncm91bmRFbnRpdHkoJ3Rfc2FuZF9ib3R0b21fbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogKiBDb25maWcudGlsZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlnLnRpbGVTaXplKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzovL3RpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnN0YW5jZSBiZyB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBCYWNrZ3JvdW5kRW50aXR5KCd0X3NhbmRfYm90dG9tX3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICogQ29uZmlnLnRpbGVTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSAqIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpZy50aWxlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJhbmRleGVjKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBhKCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBiKCkgeyByZXR1cm4gMTsgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjKCkgeyByZXR1cm4gMjsgfVxyXG4gICAgICAgICAgICBsZXQgZnVuY3MgPSBbYSwgYiwgY107IC8vIHRoZSBmdW5jdGlvbnMgYXJyYXlcclxuICAgICAgICAgICAgbGV0IHByb2JhcyA9IFsyMCwgNzUsIDVdOyAvLyAyMCUsIDcwJSBhbmQgMTAlXHJcbiAgICAgICAgICAgIGxldCBhcjogYW55ID0gW107XHJcbiAgICAgICAgICAgIGxldCBpOiBhbnksIHN1bSA9IDA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gdGhhdCBmb2xsb3dpbmcgaW5pdGlhbGl6YXRpb24gbG9vcCBjb3VsZCBiZSBkb25lIG9ubHkgb25jZSBhYm92ZSB0aGF0XHJcbiAgICAgICAgICAgIC8vIHJhbmRleGVjKCkgZnVuY3Rpb24sIHdlIGxldCBpdCBoZXJlIGZvciBjbGFyaXR5XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvYmFzLmxlbmd0aCAtIDE7IGkrKykgLy8gbm90aWNlIHRoZSAnLTEnXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN1bSArPSAocHJvYmFzW2ldIC8gMTAwLjApO1xyXG4gICAgICAgICAgICAgICAgYXJbaV0gPSBzdW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGdldCBhIHJhbmRvbSBudW1iZXIgYW5kIGZpbmRzIHdoZXJlIGl0IHNpdHMgaW5zaWRlIHRoZSBwcm9iYWJpbGl0aWVzXHJcbiAgICAgICAgICAgIC8vIGRlZmluZWQgZWFybGllclxyXG5cclxuICAgICAgICAgICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpOyAvLyByZXR1cm5zIFswLDFdXHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXIubGVuZ3RoICYmIHIgPj0gYXJbaV07IGkrKyk7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5hbGx5IGV4ZWN1dGUgdGhlIGZ1bmN0aW9uIGFuZCByZXR1cm4gaXRzIHJlc3VsdFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChmdW5jc1tpXSkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29vcmRpbmF0ZSwgU2l6ZX0gZnJvbSAnLi4vRGltZW5zaW9ucy9EaW1lbnNpb25zJztcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi4vLi4vR2FtZS9HZW5lcmljcy9NYXBcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBhbmltYXRpb25zOiBhbnkgPSB7fTtcclxuICAgIHRpbGVzOiBhbnkgPSB7fTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyBzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tSlNPTk9iamVjdChvYmo6IGFueSk6IFNwcml0ZSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IG5ldyBTcHJpdGUob2JqLmlkLCBvYmouc3JjKTtcclxuICAgICAgICBmb3IgKGxldCBhbmltSW5mbyBvZiBvYmouYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uaWQgPSBhbmltSW5mby5pZDtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZnJhbWVJbmZvIG9mIGFuaW1JbmZvLmZyYW1lcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gZnJhbWVJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSBmcmFtZUluZm8udGltZTtcclxuICAgICAgICAgICAgICAgIGxldCBjb29yZCA9IG5ldyBDb29yZGluYXRlKGZyYW1lSW5mby5vcmlnaW4ueCwgZnJhbWVJbmZvLm9yaWdpbi55KTtcclxuICAgICAgICAgICAgICAgIGxldCBzaXplID0gbmV3IFNpemUoZnJhbWVJbmZvLnNpemUud2lkdGgsIGZyYW1lSW5mby5zaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWUgPSBuZXcgRnJhbWUoaWQsIHRpbWUsIGNvb3JkLCBzaXplKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZXMucHVzaChmcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ByaXRlLmFuaW1hdGlvbnNbYW5pbWF0aW9uLmlkXSA9IGFuaW1hdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHRpbGVzSW5mbyBvZiBvYmoudGlsZXMpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGlsZXNJbmZvLmlkO1xyXG4gICAgICAgICAgICBsZXQgY29vcmQgPSBuZXcgQ29vcmRpbmF0ZSh0aWxlc0luZm8ub3JpZ2luLngsIHRpbGVzSW5mby5vcmlnaW4ueSk7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gbmV3IFNpemUodGlsZXNJbmZvLnNpemUud2lkdGgsIHRpbGVzSW5mby5zaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGxldCB0aWxlID0gbmV3IFRpbGUoaWQsIGNvb3JkLCBzaXplKTtcclxuICAgICAgICAgICAgdGlsZS5zcHJpdGUgPSBzcHJpdGU7XHJcbiAgICAgICAgICAgIHNwcml0ZS50aWxlc1t0aWxlLmlkXSA9IHRpbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcHJpdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBmcmFtZXM6IEZyYW1lW10gPSBbXTtcclxuICAgIGN1cnJlbnRGcmFtZUluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNwcml0ZTogU3ByaXRlO1xyXG4gICAgLy8gZ2V0IGN1cnJlbnRGcmFtZSgpOiBGcmFtZSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZnJhbWVzW3RoaXMuY3VycmVudEZyYW1lSW5kZXhdO1xyXG4gICAgLy8gfTtcclxuICAgIC8vXHJcbiAgICAvL1xyXG4gICAgLy8gcHVibGljIGFkZEZyYW1lVGltZSh0aW1lOiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbikge1xyXG4gICAgLy8gICAgIHRoaXMuY3VycmVudEZyYW1lLmN1cnJlbnRUaW1lICs9IHRpbWU7XHJcbiAgICAvLyAgICAgaWYgKHRoaXMuY3VycmVudEZyYW1lLmN1cnJlbnRUaW1lID49IHRoaXMuY3VycmVudEZyYW1lLnRvdGFsVGltZSB8fCBmb3JjZSkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5leHRGcmFtZSgpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZS5jdXJyZW50VGltZSA9IGZvcmNlID8gMCA6IHRpbWUgLSB0aGlzLmN1cnJlbnRGcmFtZS50b3RhbFRpbWU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy9cclxuICAgIC8vIHB1YmxpYyBuZXh0RnJhbWUoKSB7XHJcbiAgICAvLyAgICAgbGV0IHRvdGFsRnJhbWVzID0gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMTtcclxuICAgIC8vICAgICBpZiAodGhpcy5jdXJyZW50RnJhbWVJbmRleCA9PT0gdG90YWxGcmFtZXMpIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IDA7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCsrO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vXHJcbiAgICAvLyBwdWJsaWMgZHJhd0ZyYW1lKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB4UG9zaXRpb246IG51bWJlciwgeVBvc2l0aW9uOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAvLyAgICAgICBjdHguY2xlYXJSZWN0KHhQb3NpdGlvbiwgeVBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIC8vICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGUuaW1hZ2UsIHRoaXMuY3VycmVudEZyYW1lLm9yaWdpbi54LCB0aGlzLmN1cnJlbnRGcmFtZS5vcmlnaW4ueSwgdGhpcy5jdXJyZW50RnJhbWUuc2l6ZS53aWR0aCwgdGhpcy5jdXJyZW50RnJhbWUuc2l6ZS5oZWlnaHQsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIC8vICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRnJhbWUge1xyXG4gICAgLy8gaWQ6IHN0cmluZztcclxuICAgIC8vIHRvdGFsVGltZTogbnVtYmVyXHJcbiAgICAvLyBvcmlnaW46IENvb3JkaW5hdGU7XHJcbiAgICAvLyBzaXplOiBTaXplO1xyXG5cclxuICAgIHB1YmxpYyBfY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjdXJyZW50VGltZSh0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50VGltZSA9IHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyB0b3RhbFRpbWU6IG51bWJlciwgcHVibGljIG9yaWdpbjogQ29vcmRpbmF0ZSwgcHVibGljIHNpemU6IFNpemUpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlIHtcclxuICAgIHNwcml0ZTogU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHB1YmxpYyBvcmlnaW46IENvb3JkaW5hdGUsIHB1YmxpYyBzaXplOiBTaXplKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSVRpbGUge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG9yaWdpbjogQ29vcmRpbmF0ZTtcclxuICAgIHNpemU6IFNpemU7XHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlLCBTaXplfSBmcm9tICcuLi9EaW1lbnNpb25zL0RpbWVuc2lvbnMnO1xyXG5pbXBvcnQgTWFwIGZyb20gXCIuLi8uLi9HYW1lL0dlbmVyaWNzL01hcFwiO1xyXG5pbXBvcnQgSnNvbkxvYWRlciBmcm9tIFwiLi4vVXRpbHMvSnNvbkxvYWRlclwiO1xyXG5pbXBvcnQge1Nwcml0ZSwgQW5pbWF0aW9uLCBGcmFtZSwgVGlsZX0gZnJvbSBcIi4vQ2xhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRlZFNwcml0ZUluZm86IGFueSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3ByaXRlczogYW55ID0ge307XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTcHJpdGUoaWQ6IHN0cmluZyk6IFNwcml0ZSB7XHJcbiAgICAgICAgLy8gbGV0IHNwcml0ZUluZm8gPSBTcHJpdGVNYW5hZ2VyLmxvYWRlZFNwcml0ZUluZm9baWRdO1xyXG4gICAgICAgIC8vIGxldCBzcHJpdGUgPSBTcHJpdGUuZnJvbUpTT05PYmplY3Qoc3ByaXRlSW5mbyk7XHJcbiAgICAgICAgcmV0dXJuIFNwcml0ZU1hbmFnZXIuc3ByaXRlc1tpZF07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QW5pbWF0aW9uKHNwcml0ZU5hbWU6IHN0cmluZywgYW5pbU5hbWU6IHN0cmluZyk6IEFuaW1hdGlvbiB7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IFNwcml0ZU1hbmFnZXIuZ2V0U3ByaXRlKHNwcml0ZU5hbWUpXHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHNwcml0ZS5hbmltYXRpb25zW2FuaW1OYW1lXTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGlsZShzcHJpdGVOYW1lOiBzdHJpbmcsIGFuaW1OYW1lOiBzdHJpbmcpOiBUaWxlIHtcclxuICAgICAgICBsZXQgc3ByaXRlID0gU3ByaXRlTWFuYWdlci5nZXRTcHJpdGUoc3ByaXRlTmFtZSlcclxuICAgICAgICBsZXQgdGlsZSA9IHNwcml0ZS50aWxlc1thbmltTmFtZV07XHJcbiAgICAgICAgcmV0dXJuIHRpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU3ByaXRlcyhjYjogKCkgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxvYWRlciA9IG5ldyBKc29uTG9hZGVyKCcvYXNzZXRzL3Nwcml0ZXMvc3ByaXRlcy5qc29uJyk7XHJcblxyXG4gICAgICAgIGxvYWRlci5sb2FkKGZ1bmN0aW9uKGpzb246IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICAgICAgbGV0IHRvdGFsSW1nID0gb2JqLnNwcml0ZXMubGVuZ3RoXHJcbiAgICAgICAgICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvYmpTcHJpdGVJbmZvIG9mIG9iai5zcHJpdGVzKSB7XHJcbiAgICAgICAgICAgICAgICBTcHJpdGVNYW5hZ2VyLmxvYWRlZFNwcml0ZUluZm9bb2JqU3ByaXRlSW5mby5pZF0gPSBvYmpTcHJpdGVJbmZvO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHNwcml0ZUluZm8gPSBTcHJpdGVJbmZvLmZyb21PYmplY3Qob2JqU3ByaXRlSW5mbyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gU3ByaXRlLmZyb21KU09OT2JqZWN0KG9ialNwcml0ZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgrK2xvYWRlZEltYWdlcyA+PSB0b3RhbEltZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBTcHJpdGVNYW5hZ2VyLnNwcml0ZXNbc3ByaXRlLmlkXSA9IHNwcml0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9uZSguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIC8vIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICB2YXIgcmFuZCA9IGFyZ3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJncy5sZW5ndGgpXTtcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHlPYmplY3Q8VD4ob2JqZWN0OiBUKTogVCB7XHJcbiAgICAgICAgdmFyIG9iamVjdENvcHkgPSA8VD57fTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdENvcHlba2V5XSA9IG9iamVjdFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JqZWN0Q29weTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uTG9hZGVyIHtcclxuICAgIHByaXZhdGUgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy54aHIub3BlbihcIkdFVFwiLCB0aGlzLnVybCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9hZChjYjogKHBhcnNlZEpzb246IHN0cmluZykgPT4gYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcclxuICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYueGhyLnJlYWR5U3RhdGUgPT0gNCAmJiBzZWxmLnhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYihzZWxmLnhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9HYW1lL0dhbWVcIjtcclxuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcIi4vR2FtZS9FbnRpdGllcy9FbnRpdHlcIjtcclxuaW1wb3J0IHsgRnBzRW50aXR5IH0gZnJvbSBcIi4vR2FtZS9FbnRpdGllcy9GcHNFbnRpdHlcIjtcclxuaW1wb3J0IHsgSGVybyB9IGZyb20gXCIuL0dhbWUvRW50aXRpZXMvSGVyb1wiO1xyXG5cclxuXHJcbmxldCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG5cclxuR2FtZS5pbml0aWFsaXplKGNhbnZhcyk7XHJcbiJdfQ==
