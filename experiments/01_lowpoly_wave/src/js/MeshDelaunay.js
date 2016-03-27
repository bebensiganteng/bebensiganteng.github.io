const THREE = require('three');
const Delaunay = require('delaunay-fast');

export default class MeshDelaunay extends THREE.Mesh {

  constructor(geometry, materials) {

    let w = 30
    let h = 5

    let x = -w
    let y = 0;

    let vertices = [];

    let i;

    for(i = 0; i < 2048; i++) {

      x += Math.max(0.5, Math.random() * 5);
      y = (i%2) * h;

      if(x > w) break;

      vertices[i] = [x,y];
      geometry.vertices.push(new THREE.Vector3(x,y,0));

    }

    let triangle = Delaunay.triangulate(vertices);
    i = triangle.length;

    while(i > 0) {

      let a = i - 1;
      let b = i - 2;
      let c = i - 3;

      let face = new THREE.Face3(
        triangle[a],
        triangle[b],
        triangle[c]
      );
      face.color = new THREE.Color(Math.random() * 0xffffff);

      geometry.faces.push(face);

      i -= 3;
    }

    geometry.computeFaceNormals();

    for(var index in geometry.vertices) {

      let vertex = geometry.vertices[index];

      vertex.y = (vertex.y > 0) ? Math.random() * -5 : Math.max(1, Math.random() * 5);

    }

    super(geometry, materials)

  }
}
