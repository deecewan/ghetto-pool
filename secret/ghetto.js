
function get_data(postcodes) {
    var host = "https://secret.ghettopool.party"
    if (location.hostname !== "") {
        host = ""
    }
    console.log("query started")
    console.log("Host:"+ host + " Postcodes: " + postcodes)
    $.get( host + "/?postcodes=" + postcodes, function( data ) {
        render(data)
        console.log(data)
        console.log("query ended")
    });
}

function render(data) {

    $root = $("#list-root")
    $root.html("")
    data.map(function(location) {
        $root.append(gen_html(location))
    })
}

function gen_html(loc) {
    return "<div class='card material-card property-card'>" +
            "<img class='card-img-top' src='"+loc.image +"' alt='Card image cap'>" +
            "<div class='card-block'>" +
            "<h4 class='card-title'>"+loc.streetAddress+"</h4>" +
            "<p class='card-text'>"+loc.suburb + " " + loc.state +"<p>Status: <span class='avaliability'>Free!</span></p></p>" +
            "<a href='https://ghettopool.party' class='btn btn-primary'>Start a ghetto pool to this pool</a>" +
            "</div>" +
            "</div>"
}

$(function() { //shorthand document.ready function
    $('#get-form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        var data = $("#postcodes").val()
        get_data(data) //use the console for debugging, F12 in Chrome, not alerts
        
    });
});
