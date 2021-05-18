import Level from "./level.js";
import RoomGenerator from './room-generator'

const TILE_MAPPING = {
    BLANK: 17,
    FLOOR: [{
        index: [90, 91, 106],
        weight: 8
    },
        {
            index: [88, 89, 92, 93, 104, 105, 107, 108, 109],
            weight: 2

        }],
    LEFT: 18,
    RIGHT: 16,
    TOP: 20,
    BOTTOM: 36,
    TOP_LEFT: 19,
    TOP_RIGHT: 21,
    BOTTOM_LEFT: 35,
    BOTTOM_RIGHT: 37
};

export default function buildLevel(width, height, maxRooms, scene) {
    const generator = new RoomGenerator();
    const map = generator.generate(100, 100)
    const rooms = map.rooms

    const tilesize = 32;
    scene.map = scene.make.tilemap({
        tileWidth: tilesize,
        tileHeight: tilesize,
        width: width,
        height: height
    });

    const tileset = scene.map.addTilesetImage("tiles", null, tilesize, tilesize);
    const wallsLayer = scene.map.createBlankDynamicLayer("Walls", tileset);
    const groundLayer = scene.map.createBlankDynamicLayer("Ground", tileset);
    const stuffLayer = scene.map.createBlankDynamicLayer("Stuff", tileset);

    function buildRoom(room) {
        groundLayer.weightedRandomize(room.originX, room.originY,
            room.width, room.height, TILE_MAPPING.FLOOR)
        wallsLayer.putTileAt(TILE_MAPPING.TOP_LEFT, room.originX, room.originY)
        wallsLayer.putTileAt(TILE_MAPPING.TOP_RIGHT, room.endX, room.originY)
        wallsLayer.putTileAt(TILE_MAPPING.BOTTOM_LEFT, room.originX, room.endY)
        wallsLayer.putTileAt(TILE_MAPPING.BOTTOM_RIGHT, room.endX, room.endY)
        for (let i = room.originX + 1; i < room.endX; i++) {
            wallsLayer.putTileAt(TILE_MAPPING.TOP, i, room.originY)
         //   wallsLayer.putTileAt(TILE_MAPPING.BOTTOM, i, room.endY)
        }
        for (let i = room.originY + 1; i < room.endY; i++) {
            wallsLayer.putTileAt(TILE_MAPPING.LEFT, room.originX, i)
            wallsLayer.putTileAt(TILE_MAPPING.RIGHT, room.endX, i)
        }
        room.doors.forEach(door=>{
            wallsLayer.removeTileAt(door.x, door.y)
        })
    }


    rooms.forEach(room=>{

        buildRoom(room);

    })


    scene.player = scene.characterFactory.buildCharacter('aurora',
        rooms[0].centerX*tilesize,
        rooms[0].centerY*tilesize,
        {player: true});


    scene.physics.add.collider(scene.player, stuffLayer);
    scene.physics.add.collider(scene.player, wallsLayer);
    scene.gameObjects.push(scene.player);


    const camera = scene.cameras.main;
    camera.setZoom(1.0)
    camera.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    camera.startFollow(scene.player);
    camera.roundPixels = true;

    scene.physics.world.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels, true, true, true, true);
    stuffLayer.setDepth(10);
    wallsLayer.setDepth(1);
    wallsLayer.setCollisionBetween(1, 500);

    return {"Ground": groundLayer, "Stuff": stuffLayer, "Walls": wallsLayer}
};