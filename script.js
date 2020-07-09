
    


 
 function generateWeather(){
    event.preventDefault();
  
 var city = $('#city-input').val().trim()
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d`;
  $('#weather-view').empty()
    localStorage.setItem('city', city)
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)  
        for(i=0; i<40;i+=8){
    var city = response.city.name
    var highTemp = response.list[i].main.temp_max
    var weatherIcon = response.list[i].weather[0].icon 
    var weather = response.list[i].weather[0].description
    var wind = response.list[i].wind.speed
    var day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
     var weatherCard = $('<div>').attr({
         'class': 'card text-white bg-primary mb-3',
         'style': 'max-width:18rem'
     })
     $('#weather-view').append(weatherCard)
     var cardHead= $('<div>').attr('class', 'card-header')
     var cardBody = $('<div>').attr('class', 'card-body')
     var cardTitle = $('<h5>').attr('class', 'card-title')
     var cardText = $('<p>').attr('class', 'card-text')
     var icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + weatherIcon + '.png')
      cardTitle.append(icon)
     cardText.html(weather + '<br></br>' + 'High Temp: ' + highTemp + 'F ' + '<br></br>' + 'Wind: ' + wind + ' mph')
     weatherCard.append(cardHead, cardBody)
     cardBody.append(cardTitle, cardText)
     cardHead.text(city) 
     var today= moment().day()
     
    } 
  })
 }
 $('#add-city').on('click', generateWeather) 