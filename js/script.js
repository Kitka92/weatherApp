let checkWeatherBtn = document.querySelector('button');

checkWeatherBtn.addEventListener('click', function(e) {
	e.preventDefault();
	let city = document.querySelector('input').value;
	let getLatAndLonURL = `http://api.positionstack.com/v1/forward?access_key=c6fc2aa9f8377adab8def5820c1bea92&query=${city}`;
	const getLatAndLon = async () => {
		try {
			const resPositionStact = await axios.get(getLatAndLonURL);
			console.log(
				`Latitude: ${resPositionStact.data.data[0].latitude}, Longitude: ${resPositionStact.data.data[0]
					.longitude}`
			);
		} catch (err) {
			console.log('Something went wrong:', err);
		}
	};
	getLatAndLon();
});
