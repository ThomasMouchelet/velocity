mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzMzMiLCJhIjoiY2pzYWFpcXNwMDAxbzN5cGZneGxia3U3ZCJ9.sigYT2nlLnC1siycJ3im-Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [4.886885,45.738135],
    zoom: 15
});

var urlAPI = "http://localhost:8888/Talis-front/velocity/api" ;
var user;

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
    //console.log(marker)  
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

            <form onSubmit="formSubmitPopup(event, ${marker.number})">
                <input type="submit" value="RESERVER">
            </form>
        `))
    .addTo(map);
});

function formSubmitPopup(event, id_station){
    event.preventDefault();
    // AJAX request
    console.log(id_station);
    console.log(user.id);

    $.ajax({
        type: "POST",
        url: `${urlAPI}/index.php`,
        data: "test",
        success: function(data){
            console.log(data);
        },
    })
}



$("#formLogin").on("submit", function(event){
    event.preventDefault();
    const serializeFormLogin = $(this).serialize();
    // Ajax request (checkUser.php)
    $.ajax({
        type: "post",
        url: `${urlAPI}/checkUser.php`,
        data: serializeFormLogin,
        success: function(data){
            console.log(data);
            data = JSON.parse(data);
            console.log(data);

            user = data;
            
            if(data.username){
                $("#formLogin").hide();
                $("#map").show();
                
                var mapDiv = $("#map");
                var canvasMap = $(".mapboxgl-canvas");
    
                mapDiv.css("width", "100%");
                canvasMap.css("width", "100%");
                map.resize();
            }

        }
    })
})