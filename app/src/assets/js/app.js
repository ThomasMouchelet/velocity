mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzMzMiLCJhIjoiY2pzYWFpcXNwMDAxbzN5cGZneGxia3U3ZCJ9.sigYT2nlLnC1siycJ3im-Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [4.886885,45.738135],
    zoom: 15
});

var urlAPI = "http://localhost:8888/Talis-front/velocity/api" ;

data = [
    {
        "address": "Devant entrée de la fac",
        "available_bike_stands": 12,
        "available_bikes": 2,
        "banking": false,
        "bike_stands": 16,
        "bonus": false,
        "contract_name": "Lyon",
        "last_update": 1550647847000,
        "name": "8003 - CLAUDE BERNARD LYON I",
        "number": 8003,
        "position": {lat: 45.738135, lng: 4.886885},
        "status": "OPEN"
    }
];

// add markers to map
data.forEach(function(marker) {
    console.log(marker)  
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '50px';
    el.style.height = '50px';
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.position)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`
            <h2>${marker.address}</h2>
            <strong>${marker.available_bike_stands}/${marker.bike_stands}</strong>
            <p>${marker.number}</p>

            <form onSubmit="formSubmitPopup(event)">
                <input type="submit" value="RESERVER">
            </form>
        `))
    .addTo(map);
});

function formSubmitPopup(event){
    event.preventDefault();
    // AJAX request
    $.ajax({
        type: "POST",
        url: `${urlAPI}/index.php`,
        data: "test",
        success: function(data){
            console.log(data);
        },
    })
}


