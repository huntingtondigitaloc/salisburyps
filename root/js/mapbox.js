mapboxgl.accessToken =
  "pk.eyJ1IjoianlhdGFzbGFtIiwiYSI6ImNrNTVtdDVlNzB2dGwzam53cGJ2aHd4YXMifQ.1PbL8J1gbcLTRgvNoywJjg";

var marker =  [-117.865944, 33.669702]; 
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: marker,
  zoom: 16,
  pitch: 50
});

function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 200) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}

var size = 200;

var pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  onAdd: function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  render: function() {
    var duration = 1000;
    var t = (performance.now() % duration) / duration;

    var radius = (size / 2) * 0.3;
    var outerRadius = (size / 2) * 0.7 * t + radius;
    var context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 100, 100, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // keep the map repainting
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  }
};

map.on("load", function() {
  // Start the animation.
  rotateCamera(0);

  // Add 3d buildings and remove label layers to enhance the map
  var layers = map.getStyle().layers;
  //   for (var i = 0; i < layers.length; i++) {
  //     if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
  //       map.removeLayer(layers[i].id);
  //     }
  //   }

  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",

      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"]
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"]
      ],
      "fill-extrusion-opacity": 0.6
    }
  });

  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addLayer({
    id: "points",
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: marker
            }
          }
        ]
      }
    },
    layout: {
      "icon-image": "pulsing-dot"
    }
  });
});

// create the popup
// var popup = new mapboxgl.Popup({ offset: 25 })
// .setText('Orange County Plastic Surgery, LLC 15878 Jamboree Rd, Irvine CA');
 
// create DOM element for the marker
var el = pulsingDot;
 
// create the marker
new mapboxgl.Marker(el)
.setLngLat(marker)
// .setPopup(popup) 
.addTo(map);

// disable map zoom when using scroll
map.scrollZoom.disable();

// Check what native maps app the user is using
function mapsSelector() {
  if /* if we're on iOS, open in Apple Maps */
    ((navigator.platform.indexOf("iPhone") != -1) || 
     (navigator.platform.indexOf("iPod") != -1) || 
     (navigator.platform.indexOf("iPad") != -1))
    window.open("maps://maps.google.com/maps?daddr=33.669702,-117.865944&amp;ll=");

  else /* else use Google */
    window.open("https://maps.google.com/maps?daddr=33.669702,-117.865944&amp;ll=");
}