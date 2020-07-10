// var cities = []
    

function currentWeather(){
  var city = $('#city-input').val().trim()
  queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d'
$('#current-weather-here').empty()
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

var currentWeatherView = $('<div>').attr('class', 'row')
$('#current-weather-here').append(currentWeatherView)

var currentWeatherCard = $('<div>').attr('class', 'card col-md-8')
currentWeatherView.append(currentWeatherCard)
var currentWeatherBody = $('<div>').attr({
  class: 'card-body',
  id: 'current-weather'
})
currentWeatherCard.append(currentWeatherBody)
var iconEl = $('<p>').attr('class', 'icon')
var iconImg = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + currentIcon + '.png')
iconEl.append(iconImg)
var currentTempEl = $('<p>').text(`It is currently: ${currentTemp} \n It feels like: ${feelsLike}`)
var currentWindEl = $('<p>').text(`Wind Speed: ${currentWind} mph`)
  currentWeatherBody.append(iconEl, currentTemp, currentWind) 
  var lon= response.coord.lon
    var lat=response.coord.lat
    function uvIndex(){
    var queryUrlUV= 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=4269dfac7a15a389ebd794d9f326120d&lat='+ lat + '&lon=' + lon + '&cnt=1&units=imperial'

     $.ajax({
       url:queryUrlUV,
       method:'get'
     }).then(function(uv){
       console.log(uv)
       var UVcard = $("<div>").attr({
         class: 'card border-dark mb3 col-md-4',
         id:'uv-card'
        })
      var UVhead = $('<div>').attr('class', 'card-header').text('Current UV Index')
      var UVbody = $('<div>').attr('class', 'card-body')
      var UVstatus=$('<h5>').attr({
        class: 'card-title',
        id: 'uv-warning'
      })
      if(uv[0].value >= 8){
        $('#uv-warning').text('EXTREMELY HIGH')
        $('#uv-card').attr('style', 'background:red')
      }else if (uv[0].value <=5){
        $('#uv-warning').text('MODERATE')
        $('#uv-card').attr('style', 'background:yellow')
      }else{
        $('#uv-warning').text('HIGH')
        $('#uv-card').attr('style', 'background:orange')
      }
      var uvVal = $('<p>').attr('class', 'card-text').text(`Current UV Index: ${uv[0].value}`)
      UVbody.append(UVstatus, uvVal)
      UVcard.append(UVhead, UVbody)
      $('#current-weather-view').append(UVcard)
     })

 
  }
  uvIndex()
 }) 
  
}

$('#add-city').on('click', function(){
  event.preventDefault();
    currentWeather()
  
 var city = $('#city-input').val().trim()
 
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=4269dfac7a15a389ebd794d9f326120d`;
  $('#weather-view').empty()
    localStorage.setItem('city', city)
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response)  
        for(i=0; i<40;i+=8){
    var city = response.city.name
    var highTemp = response.list[i].main.temp_max
    var weatherIcon = response.list[i].weather[0].icon 
    var weather = response.list[i].weather[0].description
    var wind = response.list[i].wind.speed
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
     cardText.html(weather + '<br></br>' + 'High Temp: ' + highTemp + 'F ' + '<br></br>' + 'Wind: ' + wind + ' mph')
     weatherCard.append(cardHead, cardBody)
     cardBody.append(cardTitle, cardText)
     cardHead.text(date) 
     
    //  dayOfTheWeek()

    } 
  })
 })


 
 
//  function renderButtons() {


//   $("#buttons-view").empty();

//   // Looping through the array of movies
//   for (var i = 0; i < cities.length; i++) {

    
//     var a = $("<button>");
   
//     a.addClass("city-btn");
  
//     a.attr("data-name", cities[i]);
    
//     a.text(cities[i]);
   
//     $("#buttons-view").append(a);
//   }
// }