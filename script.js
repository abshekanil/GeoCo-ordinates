let timeZoneInfo = document.querySelector(".timeZoneInfoBox");
let latitude = document.getElementById('latitude');
let longitude = document.getElementById('longitude');
let inputTimeZone = document.querySelector('.inputTimeZone');
let input = document.getElementById('input');
let btn = document.getElementById('btn');
let alertshows = document.getElementById("alert");



    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          timeZoneInfo.innerHTML = "Geolocation is not supported by this browser";
        }

        
      }
      
      function showPosition(position) {
        latitude.textContent = "Latitude: " + position.coords.latitude;
        longitude.textContent = "Longitude: " +position.coords.longitude;

        

      }
      
      getLocation();

      inputTimeZone.style.backgroundColor = "black";

      let resultHeader = document.createElement("h1");
      inputTimeZone.appendChild(resultHeader);
      let lat = document.createElement('p');
      inputTimeZone.appendChild(lat);


      let long = document.createElement('p');
      inputTimeZone.appendChild(long);

      let cities = document.createElement('p');
      let states = document.createElement('p');
      let countries = document.createElement('p');
      let postCode = document.createElement('p');

      inputTimeZone.appendChild(cities); 
      inputTimeZone.appendChild(states);
      inputTimeZone.appendChild(countries); 
      inputTimeZone.appendChild(postCode);


      btn.addEventListener("click", function(){

        if(input.value === '')
        {
            alertshows.innerHTML = "Please enter an address!";
            alertshows.style.color = "red";
        }
        else{

            let inputValue = input.value;
            let encodedText = encodeURIComponent(inputValue);
    
            resultHeader.innerHTML = "Your Result";

            btn.style.marginBottom = "10px";

    
            inputTimeZone.style.border = "1px solid white"; 
            inputTimeZone.style.marginTop = "10px";
            cities.style.marginLeft = "30px";
            states.style.marginLeft = "30px";
            lat.style.marginLeft = "30px";
            long.style.marginLeft = "30px";
            countries.style.marginLeft = "30px";
            postCode.style.marginLeft = "30px";

            cities.style.color = "white";
            states.style.color = "white";
            lat.style.color = "white";
            long.style.color = "white";
            countries.style.color = "white";
            postCode.style.color = "white";
    
    
            fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodedText}&apiKey=dcc3d05cfc32474097de77d607eff065`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                console.log(geocodingResult);
                let city = geocodingResult.features[0].properties.city;
                let state = geocodingResult.features[0].properties.state;
                let country = geocodingResult.features[0].properties.country;
                let postalCode = geocodingResult.features[0].properties.postcode;
                
                let latitudes = geocodingResult.features[0].geometry.coordinates[1];
                let longitudes = geocodingResult.features[0].geometry.coordinates[0];
    
    
                cities.innerHTML = "City: " +city;
                states.innerHTML = "State: " +state;
                lat.innerHTML = "Latitude: " + latitudes;
                long.innerHTML = "Longitude: "  + longitudes;
                countries.innerHTML = "Country: "  + country;
                postCode.innerHTML = "Post Code: "  + postalCode;
            });
    
           
            input.value = "";

            btn.disabled = true;
            

        }

       

      });

     

    





