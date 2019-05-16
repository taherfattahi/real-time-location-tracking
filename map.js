console.log('map.js is loaded!');
var map;
var mapId = 'mapbox.streets';
// var access_token = 'pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2o1eTVmNXlnMGJ2NjJ5cWRxMTRtY2hsMSJ9.y7O2ehEprrX26JpPyZatrQ';
var access_token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var runData = [];
var marker;

// event listeners
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => startRun());

let stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', () => stopRun());

navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude: lat, longitude: lng } = pos.coords;  
  map = L.map('map').setView([lat, lng], 14);
  mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    `https://api.tiles.mapbox.com/v4/${mapId}/{z}/{x}/{y}.png?access_token=${access_token}`, {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 18,
    }).addTo(map);
});

// error for watchposition
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}
  
function startRun () {
  const options = {
    enableHighAccuracy: true,
    timeout: 4000,
    maximumAge: 0
  };
  console.log('start was clicked!');
  marker = L.marker(map.getCenter()).addTo(map);
  watchId = navigator.geolocation.watchPosition((pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    runData.push([lat, lng]);
    console.log(runData);
    marker.setLatLng(runData[runData.length - 1]);
    
  }, error, options)
}

function stopRun () {
  console.log(runData);
  var polyline;
  navigator.geolocation.clearWatch(watchId);
  polyline = L.polyline(runData, 
  {
    color: 'red',
    weight: 10,
    opacity: .7,
    dashArray: '20,15',
    lineJoin: 'round'
  }).addTo(map);
}
        
        