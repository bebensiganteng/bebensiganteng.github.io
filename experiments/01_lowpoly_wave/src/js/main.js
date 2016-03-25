import '../../../common/css/main.css';

const dat   = require('dat-gui');
const THREE = require('three');

let tv;

class ThreeView {

  constructor() {

    self.wh = 0;
    self.ht = 0;
    self.as = 0

  }

  init() {

    this.setPos();

    self.clock  = new THREE.Clock();
    self.camera = new THREE.PerspectiveCamera(70, self.as, 0.1, 1000);
    self.camera.position.y = 100;

    // RENDERER
    self.renderer = new THREE.WebGLRenderer({antialias: true});
    self.renderer.setSize(self.wh, self.ht);
    document.getElementById('three').appendChild(self.renderer.domElement);

    // SCENES
    self.scene = new THREE.Scene()

    // OBJECTS
    let geom  = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    let mat   = new THREE.MeshBasicMaterial({color: 0xffffff});

    let mesh  = new THREE.Mesh( geom, mat );
    self.scene.add(mesh);

  }

  setPos() {

    self.wh = $(window).width();
    self.ht = $(window).height();
    self.as = self.wh/self.ht;

  }

  rePos() {

    this.setPos();

    if(self.renderer) {

      self.camera.aspect = self.as;
      self.camera.updateProjectionMatrix();

      self.renderer.setSize(self.innerWidth, self.innerHeight)

    }

  }

  update() {

    if(self.renderer && self.scene && self.camera) {

      self.renderer.render( self.scene, self.camera );

    }

  }

  needsUpdate(material, geometry) {

    material.shading            = +material.shading; //Ensure number
    material.vertexColors       = +material.vertexColors; //Ensure number
    material.side               = +material.side; //Ensure number
    material.needsUpdate        = true;
    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate  = true;
    geometry.colorsNeedUpdate   = true;

  }

}

// ------------------------
async function render() {

  requestAnimationFrame(render);

  if(tv) tv.update();

}

window.addEventListener('resize', ()=> {

  if(tv) tv.rePos();

});

// INIT
// ------------------------
$(()=>{

  tv = new ThreeView()
  tv.init();

  render();

});
