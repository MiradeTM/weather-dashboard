// var cities = []
    

function currentWeather(){
  var city = $('#city-input').val().trim()
  queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d'
$('#current-weather-view').empty()
$('#current-uv-display').empty()
  $.ajax({
    url: queryURL,
    method: 'get'
  }).then(function(response){

    console.log(response)

    
    // console.log(lon, lat)
    var currentTemp = response.main.temp
    var feelsLike = response.main.feels_like
    var weatherNow = response.weather[0].description
    var currentIcon = response.weather[0].icon
    var currentWind = response.wind.speed
    var currentHumidity = response.main.humidity


var currentWeatherCard = $('<div>').attr('class', 'card')
$('#current-weather-view').append(currentWeatherCard)
var currentWeatherBody = $('<div>').attr({
  class: 'card-body',
  id: 'current-weather'
})
currentWeatherCard.append(currentWeatherBody)
var iconEl = $('<p>').attr('class', 'icon')
var iconImg = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + currentIcon + '.png')
iconEl.append(iconImg)
var currentTempEl = $('<p>')
currentTempEl.text(`It is currently: ${currentTemp} \n It feels like: ${feelsLike}`)
var currentWindEl = $('<p>')
currentWindEl.text(`Wind Speed: ${currentWind} mph`)
var currentHumidityEl = $('<p>').text(`Humidity: ${currentHumidity}%`)
  currentWeatherBody.append(iconEl, currentTempEl, currentWindEl, currentHumidityEl) 
  var lon= response.coord.lon
    var lat=response.coord.lat
    function uvIndex(){
    var queryUrlUV= 'https://api.openweathermap.org/data/2.5/uvi/forecast?appid=4269dfac7a15a389ebd794d9f326120d&lat='+ lat + '&lon=' + lon + '&cnt=1'

     $.ajax({
       url:queryUrlUV,
       method:'get'
     }).then(function(uv){
       console.log(uv)
       var uvVal = uv[0].value
       var UVcard = $("<div>").attr({
         class: 'card border-dark',
         id:'uv-card'
        })
      var UVhead = $('<div>').attr('class', 'card-header').text('Current UV Index')
      var UVbody = $('<div>').attr('class', 'card-body')
      var UVstatus=$('<h5>').attr({
        'class': 'card-title',
        'id': 'uv-warning'
      })
      var uvValEl = $('<p>').attr('class', 'card-text uv-val').text(uvVal)
      UVbody.append(uvValEl, UVstatus)
      UVcard.append(UVhead, UVbody)
      $('#current-uv-display').append(UVcard)
      if(uvVal >= 8){
        $('#uv-warning').text('EXTREMELY HIGH')
        $('#uv-card').attr('id', 'extreme')
      }else if (uvVal <=5){
        $('#uv-warning').text('MODERATE')
        $('#uv-card').attr('id', 'moderate')
      }else{
        $('#uv-warning').text('HIGH')
        $('#uv-card').attr('id', 'high')
      }
  
    })

 
    }
  uvIndex()
 }) 
  
}


var cities=[]

function renderButtons() {


  
    
  // Looping through the array of movies
  for (var c = 0; c < cities.length; c++) {

    
    var a = $("<button>");
   
    a.addClass("city-btn");
  
    a.attr("data-name", cities[c]);
    
    a.text(cities[c]);
   
    $("#buttons-view").append(a); 
  } 
 
  }

$('#add-city').on('click', function(){
  event.preventDefault();
    currentWeather()
 
 var city = $('#city-input').val().trim()
 
 

  
 cities.push(city)
localStorage.setItem('cityName', JSON.stringify(cities))
 
 
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d`;
  $('#weather-view').empty()
   
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
    var humidity = response.list[i].main.humidity
    var date = moment(response.list[i].dt_txt).format("ddd")

    // console.log(date)
    
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
     cardText.html(weather + '<br></br>' + 'High Temp: ' + highTemp + 'F ' + '<br></br>' + 'Wind: ' + wind + ' mph' + '<br></br>' + 'Humidity: ' + humidity + '%')
     weatherCard.append(cardHead, cardBody)
     cardBody.append(cardTitle, cardText)
     cardHead.text(date) 
     
    //  dayOfTheWeek()

  }

   }) 
  
  
  renderButtons()
 })


 
 
 