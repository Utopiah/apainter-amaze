Welcome to the AMaze advanced Apainter repo

You can find in testfiles the JSON to include using ?urljson=file and test your custom brushes

You can find in src/brushes the custom brushes with stamps.js the stamp ones

In src/bruches/mic.js you can find the reactive brushes using the microphone

1. what's VR
    * why would you want to use such a thing with non free software?
2. what's VR on the web?
    * a link, a new world
      * again, with source code your can read, remix
        * that's how fast the web evolved, it's a teaching machine
3. what's apainter
    * what for
      * art
      * relaxation
      * thinking place
      * visual prototyping
    * 6Mb, 20s ... for an entire VR painting environment, custom brushes, a basic saved painting
      * cf own screenshot
    * missing brushes
      * mirror
      * reactive to sound
        * well I kind of have done that now...
      * select and grab
        * can be done with the Vive raycaster component
      * your crazy idea?
4. what's aframe
    * bring VR for web developpers
    * from DOM to 3D, from 3D to VR
5. what's webvr
    * bring VR to the web
    * open, no gatekeepers
    * share instantly
    * collaborate efficiently
    * ton of web APIs
6. extending apainter
    * make your own brush
      * stamp
        * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?urljson=amaze-mozilla.json
      * line
        * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?urljson=amaze-amaze.json
      * mesh
        * ?
      * animated mesh
        * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?urljson=amaze-torus.json
      * animated via shader
        * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/preview.html?urljson=amaze-disco.json
      * reactive mesh
        * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?urljson=amaze-mic.json
      * use a saved stroke to test your new stroke
        * https://medium.com/@msfeldstein/make-a-vr-paintbrush-in-a-painter-68f802716cf9
    * use the inspector to move meshes around, scale, add components, etc
      * use "a-stroke" class to programmatically modify your drawings
      * e.g. my own scaling "brush"
    * export: threejs export, scene export
      * re-use in apainter, re-use in apainter
      * no need to install anything to iterate on a drawing, on own drawing and other people drawings
      * 360 screenshots with ctrl-alt-shift-s

* dream
    * torus trip down in flight to Switzerland
    * with little grey mountain, green forest
    * not crashing

* references
  * https://github.com/JamsCenter/PaintingJam_EditionJan2017/wiki#references

* examples
  * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?sky=BerlinByNight.jpg
  * http://vatelier.net/MyDemo/apainter-amaze2017/a-painter/?sky=./eq/360_0024_pano.jpg_small.jpg

