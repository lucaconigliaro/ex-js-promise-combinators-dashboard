const url = "https://boolean-spec-frontend.vercel.app/freetestapi";

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json()
    return obj;
}

async function getDashboardData(query) {

    try {

        const destinationPromise = fetchJson(`${url}/destinations?search=${query}`);
        const weatherPromise = fetchJson(`${url}/weathers?search=${query}`);
        const airportPromise = fetchJson(`${url}/airports?search=${query}`);

        const promises = [destinationPromise, weatherPromise, airportPromise] 
        const [destination, weather, airport] = await Promise.all(promises)

        return {
            city: destination[0]?.name || null,
            country: destination[0]?.country || null,
            temperature: weather[0]?.temperature || null,
            weather: weather[0]?.weather_description || null,
            airport: airport[0]?.name || null
        }
    } catch (error) {
        throw new Error(`Non riesco a recuperare i dati: ${error.message}`)
    }
}

getDashboardData('vienna')
    .then(data => {
        console.log("Dashboard data:", data);
        let message = "";

        if (data.city && data.country) {
            message += `${data.city} is in ${data.country}.\n`
        }

        if (data.temperature !== null && data.weather) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }

        if (data.airport) {
            message += `The main airport is ${data.airport}.\n`
        }
        console.log(message);
    })
    .catch(error => console.error("Errore:", error.message));