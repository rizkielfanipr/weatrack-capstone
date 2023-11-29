const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const container = document.querySelector('.container');
const search = document.querySelector('.location button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');
hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));


function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
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