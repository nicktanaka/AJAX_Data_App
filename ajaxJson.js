function sunriseSunset() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var date = document.getElementById("date").value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                displaySun(this.responseText);
            }
            else if (this.status === 404) {
                displaySun('{ "sunrise" : "none" }');
            }
            else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        }
        else {
            // Waiting for a response...
        }
    };
    var url = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&" + "lng=" + longitude + "&" + "date=" + date;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displaySun(data) {
    var sun = JSON.parse(data);
    var sunriseString = sun.results.sunrise;
    var sunsetString = sun.results.sunset;
    if (sunriseString.length >= 10 && sunsetString.length >= 10) {
        document.getElementById("sun").className = "alert alert-success";
        document.getElementById("sun").innerHTML = "Sunrise: " + sunriseString + "     " + "Sunset: " + sunsetString;
    }
    else if (sun.results.sunrise == "undefined" || sun.results.sunset == "undefined") {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "No data could be found. Please enter numerical values."
    }
}

function errorCheck() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var date = document.getElementById("date").value;
    if (!(latitude > -90 && latitude < 90)) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Latitude input error. Please enter a latitude value in between -90 and 90.";
    }
    else if (!(longitude > -180 && longitude < 180)) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Longitude input error. Please enter a longitude value in between -180 and 180.";
    }
    else if (date.indexOf("-") != 4 && date.indexOf("-") != 7) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Date input error. Please enter a date in the format YYYY-MM-DD.";
    }
    else {
        sunriseSunset();
    }
}
