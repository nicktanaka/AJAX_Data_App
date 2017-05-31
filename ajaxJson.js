function sunriseSunset() {
var latitude = document.getElementById("latitude").value;
var longitude = document.getElementById("longitude").value;
var date = document.getElementById("date").value;
// Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displaySun(this.responseText);
            } else if (this.status === 404){

                displaySun('{ "make" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

 var url = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&" + "lng=" + longitude + "&" + "date=" + date;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}


function displaySun(data){
    var sun = JSON.parse(data);
    if(sun.results.sunrise === "none" || sun.results.sunset === "none") {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "No place matches that zip code."
    } else {
        document.getElementById("sun").className = "alert alert-success";
        document.getElementById("sun").innerHTML = "Sunrise: " + sun.results.sunrise + " Sunset: " + sun.results.sunset;
}
}
