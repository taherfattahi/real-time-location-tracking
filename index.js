console.log('JS is loaded');

var runData = [];
var poly;
var latLngBounds;
var watchId;

function initMap() {

    // setInterval(function () {

        // navigator.geolocation.getCurrentPosition(pos => {
            watchId = navigator.geolocation.watchPosition((pos) => {
            const {latitude: lat, longitude: lng} = pos.coords;
            runData.push(new google.maps.LatLng(lat, lng));
            console.log('new position--->', runData);

            map = new google.maps.Map(document.getElementById('map'), {
                center: runData[0],
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            latLngBounds = new google.maps.LatLngBounds();
            for (let i = 0; i < runData.length; i++) {
                latLngBounds.extend(runData[i]);
                // new google.maps.Marker({
                //   map: map,
                //   position: runData[i],
                //   title: "Point " + (i + 1)
                // });
            }

            poly = new google.maps.Polyline({
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                path: runData,
                map: map
            });

            map.fitBounds(latLngBounds);
            // poly.setMap(map);


            marker = new google.maps.Marker({
                position: {lat, lng},
                map: map,
                title: 'Current Posiion'
            })
        }, err => {
            console.error(err)
        }, options)


    // }, 1000);

}

function addLatLng(event) {
    var path = poly.getPath();
    console.log(path)
}

// start the run
let startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
    initMap()
});

//stop the run
let stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', () => {
    stopRun()
});


function stopRun() {
    console.log('stop run fired', watchId);
    navigator.geolocation.clearWatch(watchId);
}

const options = {
    enableHighAccuracy: true,
    timeout: 4000,
    maximumAge: 0
};