import request, { Response } from 'request'; // I hate myself everytime I type this
import fetch from 'node-fetch';
import { lstat } from 'fs';
import sha1 from 'sha1';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

interface WeatherUpdate {
	location: string; // i.e. "Vanderbilt University"
	weather: string; // the format specified in the README
	lat: number;
	lon: number;
	name: string; // your name - use this from process.env
}

interface OpenStreetMap {
	lat: string;
	lon: string;
}

interface DarkSky {
	currently: {
		summary: string;
		temperature: number;
	};
}

interface SlackResponse {
	status: number;
	sha1: string;
}

const makeOpenStreetMapUrl = (location: string, email: string | undefined): string => `https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${email}`;
const makeDarkSkyUrl = (token: string | undefined, lat: number, lon: number): string => `https://api.darksky.net/forecast/${token}/${lat},${lon}`;
const makeSlackUrl = (data: WeatherUpdate, slackUsername: string): string => `https://send-to-slack-nfp4cc31q.now.sh/?user=${slackUsername}&data=${JSON.stringify(data)}`;

const initWeatherInfo = (location: string, name: string | undefined): WeatherUpdate => {
	let weatherInfo: WeatherUpdate = {
		location,
		weather: '',
		lat: 0,
		lon: 0,
		name: '',
	};
	if (process.env.NAME) weatherInfo.name = process.env.NAME;
	return weatherInfo;
}

const callbacks = (
	location: string,
	slackUsername: string,
	callback: (body: SlackResponse) => void
): void => {
	let weatherInfo = initWeatherInfo(location, process.env.NAME);
	request(
		// this is just the first call to request. You'll need multiple
		makeOpenStreetMapUrl(weatherInfo.location, process.env.EMAIL),
		(error: Error, response: Response, geocodeBody: string): void => {
			if (error) {
				console.log(error);
			} else {
				let latlon: OpenStreetMap[] = JSON.parse(geocodeBody);
				weatherInfo.lat = parseFloat(latlon[0].lat);
				weatherInfo.lon = parseFloat(latlon[0].lon);

				request(
					makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon),
					(error: Error, response: Response, darkSkyBody: string): void => {
						if (error) {
							console.log(error);
						} else {
							let weatherData: DarkSky = JSON.parse(darkSkyBody);
							weatherInfo.weather = `It's ${weatherData.currently.summary} and it's ${weatherData.currently.temperature} degrees.`

							request(
								makeSlackUrl(weatherInfo, slackUsername),
								(error: Error, response: Response, slackBody: string): void => {
									if (error) {
										console.log(error);
									} else {
										callback(JSON.parse(slackBody));
									}
								}
							)
						}
					}
				)
			}
		}
	);
};

// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
const promises = (location: string, slackUsername: string): Promise<SlackResponse> => {
	let weatherInfo = initWeatherInfo(location, process.env.NAME);

	let result = fetch(makeOpenStreetMapUrl(location, process.env.EMAIL))
		.then(data => {
			return data.json();
		}).then((latlon: OpenStreetMap[]) => {
			weatherInfo.lat = parseFloat(latlon[0].lat);
			weatherInfo.lon = parseFloat(latlon[0].lon);
			return fetch(makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon));
		}).then(data => {
			return data.json();
		}).then((weatherData: DarkSky) => {
			weatherInfo.weather = `It's ${weatherData.currently.summary} and it's ${weatherData.currently.temperature} degrees.`
			return fetch(makeSlackUrl(weatherInfo, slackUsername));
		}).then(data => {
			return data.json();
		})
		.catch(err => console.log(err))

	return result;
}

export const asyncAwait = async (location: string, slackUsername: string): Promise<SlackResponse> => {
	let weatherInfo = initWeatherInfo(location, process.env.NAME);
	let latlon: OpenStreetMap[] = await (await fetch(makeOpenStreetMapUrl(location, process.env.EMAIL))).json();

	weatherInfo.lat = parseFloat(latlon[0].lat);
	weatherInfo.lon = parseFloat(latlon[0].lon);

	let currWeather: DarkSky = await (await fetch(makeDarkSkyUrl(process.env.DARK_SKY_TOKEN, weatherInfo.lat, weatherInfo.lon))).json();
	weatherInfo.weather = `It's ${currWeather.currently.summary} and it's ${currWeather.currently.temperature} degrees.`

	// console.log(`Data sha1: ${sha1(JSON.stringify(weatherInfo))}`)
	return (await fetch(makeSlackUrl(weatherInfo, slackUsername))).json();
};

// all the console.logs should log what the send-to-slack API returns
callbacks('Vanderbilt University', 'C9S0DF3BR', body => {
	console.log(body);
}); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
promises('Vanderbilt University', 'C9S0DF3BR').then(data => console.log(data));

(async () => {
	console.log(`Slack sha1: ${(await asyncAwait('Vanderbilt University', 'C9S0DF3BR')).sha1}`);
})();
