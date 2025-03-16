const url = "https://boolean-spec-frontend.vercel.app/freetestapi";

async function getDashboardData(query) {

    try {

        const cityResponse = await fetch(`${url}/destinations?search=${query}`);
        const city = cityResponse.json()

        const weatherResponse = await fetch(`${url}/weathers?search=${query}`);
        const weather = weatherResponse.json()

        const airportResponse = await fetch(`${url}/airports?search=${query}`);
        const airport = airportResponse.json()

        const [promise1, promise2, promise3] = await Promise.all([city, weather, airport])

        return {
            city: promise1[0].name,
            country: promise1[0].country,
            temperature: promise2[0].temperature,
            weather: promise2[0].weather_description,
            airport: promise3[0].name
        }
    } catch (error) {
        throw new Error(`Non riesco a recuperare i dati`)
    }
}

getDashboardData('london')
    .then(data => {
        console.log("Dashboard data:", data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error("Errore:", error.message));