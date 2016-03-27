const dat   = require('dat-gui');

let instance = null;

export default class DatGui {

  constructor() {

    if(!instance) instance = this;

    this.list = {
      waveOffset: 4.6,
      waveSpeed: 9,
      waveHeight: 5,
      lineOffset: 1.2,
      lineSpeed: 18,
      lineHeight: 7
    }

    let gui = new dat.GUI();
    gui.add(this.list, 'waveOffset', 0, 50);
    gui.add(this.list, 'waveSpeed', 0, 50);
    gui.add(this.list, 'waveHeight', 0, 50);
    gui.add(this.list, 'lineOffset', 0.01, 50);
    gui.add(this.list, 'lineSpeed', 0.01, 50);
    gui.add(this.list, 'lineHeight', 0.01, 50);

  }

  static instance() {

    if(!instance) {

      return new DatGui();

    }

    return instance;
  }


}
