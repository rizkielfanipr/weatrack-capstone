const hamburger = document.getElementById('hamburgerButton');
const navMenu = document.getElementById('navigationDrawer');
const navLinks = document.querySelectorAll('.app-bar__navigation ul li a');
const container = document.querySelector('.container');
const search = document.querySelector('.location button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

hamburger.addEventListener('click', mobileMenu);
navLinks.forEach(n => n.addEventListener('click', closeMenu));

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open'); 
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
}

search.addEventListener('click', () => {

    const APIKey = '16373fe4912ffec0aa7b818b7b0a0457';
    const city = document.querySelector('.location input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const suhu = document.querySelector('.weather-box .suhu');
            const deskripsi = document.querySelector('.weather-box .deskripsi');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/images/clear-removebg-preview.png';
                    break;

                case 'Rain':
                    image.src = 'assets/images/rain-removebg-preview.png';
                    break;

                case 'Snow':
                    image.src = 'assets/images/snow-removebg-preview.png';
                    break;

                case 'Clouds':
                    image.src = 'assets/images/cloud-removebg-preview.png';
                    break;

                case 'Haze':
                    image.src = 'assets/images/mist-removebg-preview.png';
                    break;

                default:
                    image.src = '';
            }

            suhu.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            deskripsi.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '600px';

        });

});

const APIKey = '16373fe4912ffec0aa7b818b7b0a0457';
const cities = ['Bandung', 'Jakarta', 'Medan', 'Tangerang', 'Surabaya', 'Solo', 'Bali', 'Yogyakarta', 'Makasar'];

document.addEventListener('DOMContentLoaded', fetchWeatherData);

function fetchWeatherData() {
  const weatherContainer = document.getElementById('weatherContainer');

  cities.forEach(city => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
        displayWeather(weatherContainer, city, data);
      })
      .catch(error => {
        console.error(`Error fetching weather data for ${city}:`, error);
      });
  });
}

function displayWeather(container, city, data) {
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');

  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  const weatherHtml = `<h2>${cityName}</h2>
                       <p>Temperatur: ${temperature}°C</p>
                       <p>Weater: ${description}</p>`;

  weatherCard.innerHTML = weatherHtml;
  container.appendChild(weatherCard);
}
