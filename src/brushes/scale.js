AFRAME.registerBrush('scaling',
  {
    init: function (color, width) {
    },
    addPoint: function (position, orientation, pointerPosition, pressure, timestamp) {

	    //console.log("scalling with pressure ", pressure);
	    //always 1?!
	    var sf = 0.01 * this.data.size * pressure;
	    //console.log(this.data.size);
	    // between 0 and 0.3

	    x = document.querySelectorAll("[class=a-stroke]");
	    // requires https://github.com/aframevr/a-painter/pull/186
	    // might not be applied on the official instance
	    for (var i = 0; i < x.length; i++){
		    var csf = x[i].getAttribute("scale");
		    sf = csf.x + this.data.size - 0.15;
		    x[i].setAttribute("scale",""+sf+" "+sf+" "+sf);
	    }

	    return true;
	    // note that it does create useless entities...
    }
  },
  {thumbnail: 'brushes/scaling.png', spacing: 0.1}
);
