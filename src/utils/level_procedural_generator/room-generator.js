export default class RoomGenerator{
    constructor() {
    }

    generateDoor(room, wallNumber) {
        const ranges = [
            () => ({x: room.originX, y: Phaser.Math.RND.between(room.originY+1, room.endY)}),
            () => ({x: Phaser.Math.RND.between(room.originX+1, room.endX), y: room.originY}),
            () => ({x: room.endX, y: Phaser.Math.RND.between(room.originY+1, room.endY)}),
            () => ({x: Phaser.Math.RND.between(room.originX+1, room.endX), y: room.endY})
        ]

        return ranges[wallNumber]();
    }

    generate(width, height, maxRoom = 10){
        const roomLimit = {min: 4, max: 12}
        const doorsLimit = {min: 1, max: 4}
        const rooms = []

        function intersect(a, b) {
            return a.originX <= b.endX && a.endX >= b.originX
                && a.originY <= b.endY && a.endY >= b.originY;
        }

        for (let i = 0; i < maxRoom; i++){
            const room = {
               originX: Phaser.Math.RND.between(0, width - roomLimit.max),
               originY: Phaser.Math.RND.between(0, height - roomLimit.max),
               width:  Phaser.Math.RND.between(roomLimit.min, roomLimit.max),
               height: Phaser.Math.RND.between(roomLimit.min, roomLimit.max),
            }
            room.centerX = room.originX + room.width/2;
            room.centerY = room.originY + room.height/2;
            room.endX = room.originX + room.width - 1;
            room.endY = room.originY + room.height - 1;
            if (rooms.every(x=>!intersect(x, room))){
                rooms.push(room)
                room.doors = []
                const nDoors = Phaser.Math.RND.between(doorsLimit.min, doorsLimit.max)
                for (let j = 0; j < nDoors; j++){
                   room.doors.push(this.generateDoor(room, Phaser.Math.RND.between(0, 3)))
                }
            }

        }
        return {rooms: rooms}
    }

}