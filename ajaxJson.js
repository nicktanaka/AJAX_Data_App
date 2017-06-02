/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findMake(make) {
    // First get the zip code from the HTML textbox
    var make = document.getElementById(make).value;
    var model = document.getElementById(model).value;
    var year = document.getElementById(year).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayCar(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayCar('{ "make" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "https://api.edmunds.com/api/vehicle/v2/grade/" + make + "/" + model + "/" + year + "?submodel" + submodel + "&fmt=json&api_key=" + "um6rcmcsyjx3yyyxwfhp6grb";
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function searchString(data) {
    var wordLocation = data.search("price");
    var startIndex = wordLocation + 7
     for (i= startIndex; i < 10; i++) {
         if (data.charAt(i) == ","){
             var endIndex = i;
             return data.slice(startIndex, endIndex);
         }
     }
}
/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayCar(data){
    var car = JSON.parse(data);
    if(place.country === "none") {
        document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "No place matches that zip code."
    } else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = place.places[0]["place name"] +
        ", " +
        place.places[0].state +
        ", " +
        place.country;
    }
}
