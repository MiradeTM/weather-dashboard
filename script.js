
//  var cities = [];


//  $("#add-city").on("click", function(event) {
//     event.preventDefault();
//     // This line grabs the input from the textbox
//     var city = $("#city-input").val().trim();

//     // Adding movie from the textbox to our array
//     cities.push(city);

  
//   });


//  function displayWeatherInfo() {

//  }
 
 $('#add-city').on('click', function(){
    event.preventDefault();
    var city = $('#city-input').val().trim()
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d`;
  
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
        for(i=0; i<33;i+=8)
    var highTemp = response.list[i].main.temp_max
    var weatherIcon = response.list[i].weather[0].icon
    var weather = response.list[i].weather[0].description
     console.log(highTemp)
     console.log(weather)
     console.log(weatherIcon)
  })
 })