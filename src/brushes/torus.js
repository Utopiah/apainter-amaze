/* globals AFRAME, THREE */
AFRAME.registerBrush(  
  // Name of brush.
  'torus',

  // Methods for brush definition.
  {
    init: function (color, width) {
      // Initialize the material based on the stroke color.
      this.material = new THREE.MeshStandardMaterial({
        color: this.data.color,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
      });
      //this.geometry = new THREE.IcosahedronGeometry(1, 0);
      this.geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

    },

    // This method is called every time we need to add a point
    // to our stroke. It should return `true` if the point is
    // added correctly and `false` otherwise.
    addPoint: function (position, orientation, pointerPosition,
                        pressure, timestamp) {
      // Create a new sphere mesh to insert at the given position.
      var sphere = new THREE.Mesh(this.geometry, this.material);

      // The scale is determined by the trigger pressure.
      var scale = this.data.size / 2 * pressure;
      sphere.scale.set(scale, scale, scale);
      sphere.initialScale = sphere.scale.clone();

      // Generate a random phase to be used in the tick animation.
      sphere.phase = Math.random() * Math.PI * 2;

      // Set the position and orientation of the sphere to match
      // the controllers.
      sphere.position.copy(pointerPosition);
      sphere.rotation.copy(orientation);

      // Add the sphere to the `object3D`.
      this.object3D.add(sphere);

      // Return `true`, since weve correctly added a new point (sphere).
      return true;
    },

    // This method is called on every frame.
    tick: function (timeOffset, delta) {
      for (var i = 0; i < this.object3D.children.length; i++) {
        var sphere = this.object3D.children[i];
        // Calculate the sine value based on the time and the phase for
        // this sphere, and use it to scale the geometry.
        var sin = (Math.sin(sphere.phase + timeOffset / 500.0) + 1) / 2 + 0.1;
        sphere.scale.copy(sphere.initialScale).multiplyScalar(sin);
      }
    },
  },

  // Additional options for this brush.
  {
    thumbnail: 'brushes/thumb_spheres.gif',
    spacing: 0.01
  }
);
