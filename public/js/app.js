console.log('Client side JS file loaded');

const getLocation = () => {
    const location = locationInput.value;
    if (location) {
        fetch(`weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                const locationParaTag = document.getElementById('locationPara');
                const dataDisplay = `Place: ${data.placeName} 
                                     Latitude: ${data.latitude}
                                     Longitude: ${data.longitude}
                                     Forecast: ${data.forecast}`;
                locationParaTag.textContent = dataDisplay;
            });
        });
    }
}
