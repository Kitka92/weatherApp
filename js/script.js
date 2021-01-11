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
		// get data
		const resOpenWeather = await axios.get(weatherURL);
		// display 'displayWeather' section
		const displayWeatherSection = document.querySelector('.displayWeather');
		displayWeatherSection.classList.add('visible');

		// scroll to this section
		displayWeatherSection.scrollIntoView(true);

		setWeather(resOpenWeather);
	} catch (err) {
		catchError(err);
	}
};

const catchError = (err) => {
	console.log(err);
	const errorSpan = document.querySelector('.errorSpan');
	errorSpan.classList.add('visible');
	errorSpan.innerText = `Something went wrong: ${err}`;
};

const getWeatherHtmlElements = () => {
	return {
		icon: document.querySelector('#weatherDesc img'),
		temperature: document.querySelector('#weatherParams p:nth-child(1)'),
		description: document.querySelector('#weatherDesc div:nth-child(2)'),
		clouds: document.querySelector('#weatherParams p:nth-child(2)'),
		pressure: document.querySelector('#weatherParams p:nth-child(3)')
	};
};

const setWeather = (response) => {
	const weather = getWeatherHtmlElements();
	const iconURL = `http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`;
	weather.icon.src = iconURL;
	weather.temperature.innerText = `Pressure: ${response.data.current.pressure} hPa`;
	weather.description.innerText = response.data.current.weather[0].description;
	weather.clouds.innerText = `Clouds: ${response.data.current.clouds}%`;
	weather.pressure.innerText = `Pressure: ${response.data.current.pressure} hPa`;
};
