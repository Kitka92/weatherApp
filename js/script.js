const checkWeatherBtn = document.querySelector('button');

checkWeatherBtn.addEventListener('click', function(e) {
	e.preventDefault();
	checkWeather();
});

const getLatAndLon = async (city) => {
	city = document.querySelector('input').value;
	const latAndLonURL = `http://api.positionstack.com/v1/forward?access_key=c6fc2aa9f8377adab8def5820c1bea92&query=${city}`;

	try {
		const resPositionStact = await axios.get(latAndLonURL);
		return {
			latitude: resPositionStact.data.data[0].latitude,
			longitude: resPositionStact.data.data[0].longitude
		};
	} catch (err) {
		catchError(err);
	}
};

const checkWeather = async (latitude, longitude) => {
	const latAndLon = await getLatAndLon();
	latitude = latAndLon.latitude;
	longitude = latAndLon.longitude;

	const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=aac7661037c426e7e57a6fa2f82a3767`;
	try {
		// display 'displayWeather' section

		// get data
		const resOpenWeather = await axios.get(weatherURL);
		console.log(resOpenWeather.data.current.weather[0].icon);

		// icon
		const iconURL = `http://openweathermap.org/img/wn/${resOpenWeather.data.current.weather[0].icon}@2x.png`;
		const icon = document.querySelector('#weatherDesc img');
		icon.src = iconURL;

		// weather desc
		const weatherDescription = document.querySelector('#weatherDesc div:nth-child(2)');
		weatherDescription.innerText = resOpenWeather.data.current.weather[0].description;

		// temperature
		const weatherTemperature = document.querySelector('#weatherParams p:nth-child(1)');
		weatherTemperature.innerText = `Temperature: ${resOpenWeather.data.current.temp}`;

		// clouds
		const weatherClouds = document.querySelector('#weatherParams p:nth-child(2)');
		weatherClouds.innerText = `Clouds: ${resOpenWeather.data.current.clouds}%`;

		// pressure
		const weatherPressure = document.querySelector('#weatherParams p:nth-child(3)');
		weatherPressure.innerText = `Pressure: ${resOpenWeather.data.current.pressure} hPa`;

		const displayWeatherSection = document.querySelector('.displayWeather');
		displayWeatherSection.classList.add('visible');
		// scroll to this section
		window.scrollTo(0, document.body.scrollHeight);
	} catch (err) {
		catchError(err);
	}
};

const catchError = (err) => {
	const errorSpan = document.querySelector('#errorSpan');
	errorSpan.classList.add('visible');
	errorSpan.innerText = `Something went wrong: ${err}`;
};
