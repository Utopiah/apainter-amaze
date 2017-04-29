/* globals AFRAME, THREE */
AFRAME.registerBrush(  
  // Name of brush.
  'mic',

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
      this.geometry = new THREE.IcosahedronGeometry(1, 0);
      //this.geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
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
	if (meter) {
		var scale = 1 + meter.volume;
		this.object3D.scale.set(scale, scale, scale)
	}
	/*
	if (meter.volume){
	      for (var i = 0; i < this.object3D.children.length; i++) {
		var sphere = this.object3D.children[i];
		// Calculate the sine value based on the time and the phase for
		// this sphere, and use it to scale the geometry.
		sphere.scale.copy(sphere.initialScale).multiplyScalar(1 + meter.volume);
	      }
	}
	*/
    },
  },

  // Additional options for this brush.
  {
    thumbnail: 'brushes/thumb_spheres.gif',
    spacing: 0.01
  }
);

//console.log("loaded reactive brush")
//setInterval(function(){ reactiveScaling() }, 100);

function reactiveScaling(){
	var vol = 1 + meter.volume;
	if (vol)
		document.querySelectorAll("[class=a-stroke]")[0].setAttribute("scale", vol+" "+vol+" "+vol)
		// trick to test, can be applied to all strokes also
		// applied to the whole stroke, not it's elements
}

	/*
    // This method is called on every frame.
    tick: function (timeOffset, delta) {
	if (meter.volume){
		var vol = 1 + meter.volume;
		this.object3D.scale.set(vol, vol, vol);
	}
    },
*/

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}

var audioContext = null;
var meter = null;
var canvasContext = null;

// could... be moved in the init of the brush
// as if it asks for the microphone access while already being in VR might not be possible to enable it
window.onload = function() {

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

}
