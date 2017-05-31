function sunriseSunset() {
    errorCheck();
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
    document.getElementById("sun").className = "alert alert-success";
    document.getElementById("sun").innerHTML = "Sunrise: " + sun.results.sunrise + " Sunset: " + sun.results.sunset;
    errorCheck();
}

function errorCheck() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var date = document.getElementById("date").value;
    if (latitude < -90 || latitude > 90) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Invalid inputs. Please enter a valid latitude and longitude and be sure that the date is entered in the correct format.";
    }
    else if (longitude < -180 || latitude > 180) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Invalid inputs. Please enter a valid latitude and longitude and be sure that the date is entered in the correct format.";
    }
    else if (date.indexOf("-") != 4 || date.indexOf("-") != 7) {
        document.getElementById("sun").className = "alert alert-warning";
        document.getElementById("sun").innerHTML = "Invalid inputs. Please enter a valid latitude and longitude and be sure that the date is entered in the correct format.";
    else {}
    }
