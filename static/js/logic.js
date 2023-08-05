

//get colors for markers based on depth
function colorShade(data) {
  let depth = data.geometry.coordinates[2];
  //console.log(depth)
  if (depth < 10) {
    clr = "rgb(254, 249, 231)"
  } else if (depth >= 10 && depth < 30){
    clr = "rgb(252, 243, 207)"
  } else if (depth >= 30 && depth < 50){
    clr = "rgb(247, 220, 111)"
  } else if (depth >= 50 && depth < 70){
    clr = "rgb(241, 196, 15)"
  } else if (depth >= 70 && depth < 90){
    clr = "rgb(183, 149, 11)"
  } else {
    clr = "rgb(125, 102, 8)"
  };
  //console.log(clr);
  return clr;
};

// create popup for each marker
function onEachFeature(feature, layer) {
    let place = feature.properties.title;
    let date = feature.properties.time;
    let depth = feature.geometry.coordinates[2]

    layer.bindPopup(`<h3>${place}</h3><hr><p> Depth: ${depth} km</p>`);
  }

  // vreate markers varying by size(magnitude) and color(depth)
  function pointToLayer(feature, latlng) {
    let r = (feature.properties.mag)*3
    let color = colorShade(feature);
    console.log(color);
    let geojsonMarkerOptions = {
        radius: r,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: .5,
        fillOpacity: 0.8
    };

    return L.circleMarker(latlng, geojsonMarkerOptions);
  };

  // Create a legend to display information about eq depth
function eqLegend(myMap) {
  var info = L.control({
  position: "bottomright"
});
// When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML=[
          "<h8>Depth(km):</h8></br>",
          "<span class='d1'>< 10</span>",
          "</br>",
          "<span class='d2'>10-30</span></br>",
          "<span class='d3'>30-50</span></br>",
          "<span class='d4'>50-70</span></br>",
          "<span class='d5'>70-90</span></br>",
          "<span class='d6'>>90</span>"
          ].join("");

    return div;
};
// Add the info legend to the map
info.addTo(myMap);
};



//creates map amnd adds features
function createMap(mapData) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
      let myMap = L.map("map", {
        center: [
          41.0, -114.00
        ],
        zoom: 3,
        layers: street
    }
    );

    let eqLayer = L.geoJSON(mapData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer,
        
      })
      .addTo(myMap);

      eqLegend(myMap);
    
};

// main body, uses API to get data and passes to createMap function

// Store our API endpoint as url.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

d3.json(url).then(function (data) {
  let eqFeatures = data.features;
  console.log(eqFeatures);

  createMap(eqFeatures)
  
  }
);









  
