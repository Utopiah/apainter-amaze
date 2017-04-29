AFRAME.registerBrush(
  'disco', 
  {
    init: function(color, width) {
	this.material = new THREE.ShaderMaterial( {
		uniforms: {
			time: { value: 0.0 },
		},
	  fragmentShader:
	  'uniform float time;'+
	  'void main(){'+
	  'gl_FragColor = vec4(sin(time/100.), 1.0, 1.0, 1.0);'+
	  '}'
	  
	})
    },
    addPoint: function(position, orientation, pointerPosition, pressure, timestamp) { 
      if (this.data.prevPointerPosition) { // if it is the first point, there's no line to paint
        var lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(pointerPosition.clone(), this.data.prevPointerPosition.clone()); // line from current position to the previous one
        var line = new THREE.Line(lineGeometry, this.material); // create the line mesh 
        this.object3D.add(line); // add it to the stroke entity
      }
      return true; // point added!
    },
  }, 
  {
    thumbnail: 'brushes/thumb_simpleline.png',
    maxPoints: 1000,
    spacing: 0
  }
);

  


