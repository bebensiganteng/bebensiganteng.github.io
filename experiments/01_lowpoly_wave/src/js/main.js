import '../../../common/css/main.css';
import MeshDelaunay from "./MeshDelaunay";
import DatGui from "./DatGui";

// const dat   = require('dat-gui');
const THREE = require('three');

let tv;

class ThreeView {

  constructor() {

    self.wh = 0;
    self.ht = 0;
    self.as = 0;

    self.camera = null;
    self.renderer = null;
    self.scene = null;

  }

  init() {

    this.setPos();

    self.clock  = new THREE.Clock();
    self.camera = new THREE.PerspectiveCamera(70, self.as, 1, 1000);
    // self.camera.position.z = 100;

    // RENDERER
    self.renderer = new THREE.WebGLRenderer({antialias: true});
    self.renderer.setSize(self.wh, self.ht);
    // self.renderer.setClearColor( 0xffffff );
    self.renderer.setPixelRatio( window.devicePixelRatio );
    document.getElementById('three').appendChild(self.renderer.domElement);

    // SCENES
    self.scene = new THREE.Scene()

    let light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 1, 1 ).normalize();
		self.scene.add( light );

    // Test
    // let geom  = new THREE.BoxBufferGeometry(20,20,20);
    // let mat   = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    // let mesh  = new THREE.Mesh(geom, mat);

    // self.scene.add(mesh);

    // Delaunay
    self.meshDelaunay = new MeshDelaunay(
      new THREE.Geometry(),
      new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
      })
    );
    self.meshDelaunay.rotation.setFromVector3(new THREE.Vector3(90 * Math.PI / 180,0,0));
    self.scene.add(self.meshDelaunay);

    // Line
    self.segment  = 80;
    self.curves   = [];

    for(let i = 0; i < 10; i++) {

      let position = [];
      let j;

      for(j = -5; j < 5; j++) {

        let v3 = new THREE.Vector3(j*self.segment, Math.abs((j%2) * 5), 0);
        position.push(v3);
      }

      // Geometry
      let g = new THREE.Geometry();
      for(j = 0; j < self.segment; j++) {
        g.vertices.push(new THREE.Vector3());
      }

      // curve
      let curve = new THREE.CatmullRomCurve3(position);
      curve.type = 'centripetal';
      curve.mesh = new THREE.Line(
        g,
        new THREE.LineBasicMaterial({
          color: Math.random() * 0xffffff,
          linewidth: 2
        })
      );

      curve.mesh.position.z = -(i*2+10);
      this.lineUpdate(curve);

      self.scene.add(curve.mesh);
      self.curves.push(curve)
    }

    this.setCamPosition();
  }

  setCamPosition() {

    if(self.camera) self.camera.position.z = 22 * (1200/self.wh);

  }

  setPos() {

    self.wh = $(window).width();
    self.ht = $(window).height();
    self.as = self.wh/self.ht;

  }

  rePos() {

    this.setPos();

    if(self.renderer && self.camera) {

      self.camera.aspect = self.as;
      self.camera.updateProjectionMatrix();

      self.renderer.setSize(self.wh, self.ht)

      this.setCamPosition();

    }

  }

  update() {

    if(self.renderer && self.scene && self.camera) {

      self.renderer.render( self.scene, self.camera );

      let time = self.clock.getElapsedTime() * 10;
      let dl = DatGui.instance().list;

      if(self.meshDelaunay) {

        for(let index in self.meshDelaunay.geometry.vertices) {

          let vertex = self.meshDelaunay.geometry.vertices[index];
          vertex.z = this.wave(
            vertex.x, vertex.y, time,
            dl.waveOffset,
            dl.waveSpeed,
            dl.waveHeight
          );

        }

        this.needsUpdate(null, self.meshDelaunay.geometry)

      }

      if(self.curves) {

        for(let i in self.curves) {

          let line = self.curves[i];

          for(let j in line.points) {

            let point = line.points[j];
            point.y = Math.sin( j/dl.lineOffset + ( time + j ) / (dl.lineSpeed) ) * (Math.sin(time * 0.05) * 2 + 5)

          }

          this.lineUpdate(line);

        }

      }
    }

  }

  wave (x, y, t, offset, speed, height) {

    return Math.sin( ( x / 20 ) * offset + ( t / speed ) ) * Math.cos( ( y / 20 ) * offset + ( t / speed ) ) * height;

  }

  lineUpdate(curve) {

    let geom = curve.mesh.geometry;

    for(let index in geom.vertices) {

      let vertex    = geom.vertices[index];
      vertex.copy(curve.getPoint(index/self.segment));

    }

    this.needsUpdate(null, geom);

  }

  needsUpdate(material, geometry) {

    if(material) {

      material.shading            = +material.shading; //Ensure number
      material.vertexColors       = +material.vertexColors; //Ensure number
      material.side               = +material.side; //Ensure number
      material.needsUpdate        = true;

    }

    if(geometry){

      geometry.verticesNeedUpdate = true;
      geometry.normalsNeedUpdate  = true;
      geometry.colorsNeedUpdate   = true;

    }


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

  tv = new ThreeView();
  tv.init();

  render();

});
