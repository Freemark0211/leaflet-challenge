// Store our API endpoint as queryUrl.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


function onEachFeature(feature, layer) {
    let place = feature.properties.title;
    let date = feature.properties.time;

    layer.bindPopup(`<h3>${place}</h3><hr><p>${new Date(date)}</p>`);
  }

  function pointToLayer(feature, latlng) {
    let r = (feature.properties.mag)*2
    let color = (feature.geometry.coordinates[2])
    let geojsonMarkerOptions = {
        radius: r,
        fillColor: "#b10026",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    return L.circleMarker(latlng, geojsonMarkerOptions);
  }


d3.json(url).then(function (data) {
    let eqFeatures = data.features;
    console.log(eqFeatures);

    createMap(eqFeatures)
    }
);


function createMap(mapData) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
      let myMap = L.map("map", {
        center: [
          41.0, -114.00
        ],
        zoom: 5,
        layers: street
    }
    );

    let eqLayer = L.geoJSON(mapData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
      })
      .addTo(myMap);
    
    
  //   // Create a new choropleth layer.
  // geojson = L.choropleth(data, {
  //   // Define which property in the features to use.
  //   valueProperty: "DP03_16E",
  //   scale: ["#ffffb2", "#b10026"],
  //   // The number of breaks in the step range
  //   steps: 10,

  //   // q for quartile, e for equidistant, k for k-means
  //   mode: "q",
  //   style: {
  //     // Border color
  //     color: "#fff",
  //     weight: 1,
  //     fillOpacity: 0.8
  //   },

}