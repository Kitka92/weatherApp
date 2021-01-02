const checkWeatherBtn = document.querySelector('button');
checkWeatherBtn.addEventListener('click', function(e) {
	e.preventDefault();

	checkWeather();
});

const getLatAndLon = async () => {
	const city = document.querySelector('input').value;
	const latAndLonURL = `http://api.positionstack.com/v1/forward?access_key=c6fc2aa9f8377adab8def5820c1bea92&query=${city}`;
	try {
		const resPositionStact = await axios.get(latAndLonURL);
		return {
			latitude: resPositionStact.data.data[0].latitude,
			longitude: resPositionStact.data.data[0].longitude
		};
	} catch (err) {
		console.log('Something went wrong:', err);
	}
};

const checkWeather = async () => {
	const latAndLon = await getLatAndLon();
	const latitude = latAndLon.latitude;
	const longitude = latAndLon.longitude;

	const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=aac7661037c426e7e57a6fa2f82a3767`;
	try {
		const resOpenWeather = await axios.get(weatherURL);
		console.log(resOpenWeather.data.timezone);
	} catch (err) {
		console.log('Something went wrong:', err);
	}
};
