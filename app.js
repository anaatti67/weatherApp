//  event is fired when the whole page has loaded
window.addEventListener('load', function () {
  // starts the loading icon
  const loader = document.querySelector('.loader')
  function hideLoader () {
    loader.className = loader.hidden
  }

  // is used to get the current position of the device. Might not work well with wifi but is definitely accurate with mobile
  navigator.geolocation.getCurrentPosition(function (position) {
    weather(position.coords.latitude, position.coords.longitude)
  })

  function weather (lat, lon) {
    console.log(lat, lon)
    const apiKey = '3247d71bef42350b7631010b74b2013f'
    // fetches the weather with the latitude and longitude coordinates
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        tellWeather(data)
        hideLoader()
        // for fun i encourage you too look console for additional interesting data
        console.log(data)
      })
  }
  function tellWeather (data) {
    const celsius = Math.round((data.main.temp) - 273.15) // Changing kelvins to celsius
    // returns data as html content
    document.getElementById('description').innerHTML = data.weather[0].description
    // Looks for icon id and finds the matching image from the url
    document.getElementById('wicon').src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    document.getElementById('temp').innerHTML = celsius + '&deg'
    document.getElementById('location').innerHTML = data.name
  }
})
