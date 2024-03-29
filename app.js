window.addEventListener('load', getLocation())

function getLocation() {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/5b4db932975259a50c78c63ba24401cb/${lat},${long}`

      fetch(api)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const {temperature, summary, icon} = data.currently;
        temperatureDegree.textContent = Math.floor(temperature);
          let celcius = (temperature - 32) * (5 / 9)
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone.replace(/_/g, ' ');
        setIcons(icon, document.querySelector('.icon'))

        temperatureSection.addEventListener('click', () => {
          if (temperatureSpan.textContent === 'F') {
            temperatureSpan.textContent = 'C'
            temperatureDegree.textContent = Math.floor(celcius);
          } else {
            temperatureSpan.textContent = 'F'
            temperatureDegree.textContent = Math.floor(temperature)
          }
        })
      })
    })
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: 'white'})
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
  }
}
