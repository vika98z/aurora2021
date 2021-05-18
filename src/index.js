import Phaser from 'phaser'

import ScenesMenu from '../scenes/scenes-menu';
import ProcGenScene from '../scenes/proc-gen-scene';
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  zoom: 1.2,
  scene: ProcGenScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0,
        debug: true
        }
    }
  },
};

const game = new Phaser.Game(config);
