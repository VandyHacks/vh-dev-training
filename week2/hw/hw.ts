import request, { Response } from 'request'; // I hate myself everytime I type this
import fetch from 'node-fetch';
import { lstat } from 'fs';
require('dotenv').config();
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
interface DarkSkyCurrently {
	summary: string;
	temperature: number;
}

interface DarkSky {
	currently: DarkSkyCurrently;
}

interface SlackResponse {
	status: number;
	sha1: string;
}

const callbacks = (
	location: string,
	slackUsername: string,
	callback: (body: SlackResponse) => void
): void => {
	let weatherInfo: WeatherUpdate = {
		location: location,
		weather: '',
		lat: 0,
		lon: 0,
		name: '',
	};

	if (process.env.NAME) weatherInfo.name = process.env.NAME;
	const latLongUrl = `https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`;
	request(
		// this is just the first call to request. You'll need multiple
		latLongUrl,
		(error: Error, response: Response, geocodeBody: string): void => {
			if (error) {
				console.log(error);
			} else {
				let latlon: OpenStreetMap[] = JSON.parse(geocodeBody);
				weatherInfo.lat = parseFloat(latlon[0].lat);
				weatherInfo.lon = parseFloat(latlon[0].lon);
				const darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${weatherInfo.lat},${weatherInfo.lon}`;

				request(
					darkSkyUrl,
					(error: Error, response: Response, darkSkyBody: string): void => {
						if (error) {
							console.log(error);
						} else {
							let weatherData: DarkSky = JSON.parse(darkSkyBody);
							weatherInfo.weather = `It's ${weatherData.currently.summary} and it's ${weatherData.currently.temperature} degrees.`
							const slackUrl = `https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${JSON.stringify(weatherInfo)}`;

							request(
								slackUrl,
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
	let weatherInfo: WeatherUpdate = {
		location: location,
		weather: '',
		lat: 0,
		lon: 0,
		name: '',
	};
	if (process.env.NAME) weatherInfo.name = process.env.NAME;
	const latLonUrl = `https://nominatim.openstreetmap.org/?format=json&q=${weatherInfo.location}&format=json&limit=3&email=${process.env.EMAIL}`;

	let result = fetch(latLonUrl)
		.then(data => {
			return data.json();
		}).then((latlon: OpenStreetMap[]) => {
			weatherInfo.lat = parseFloat(latlon[0].lat);
			weatherInfo.lon = parseFloat(latlon[0].lon);
			const darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${weatherInfo.lat},${weatherInfo.lon}`;
			return fetch(darkSkyUrl);
		}).then(data => {
			return data.json();
		}).then((weatherData: DarkSky) => {
			weatherInfo.weather = `It's ${weatherData.currently.summary} and it's ${weatherData.currently.temperature} degrees.`
			const slackUrl = `https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${JSON.stringify(weatherInfo)}`;
			return fetch(slackUrl);
		}).then(data => {
			return data.json();
		})
		.catch(err => console.log(err))

	return result;
}

export const asyncAwait = async (location: string, slackUsername: string): Promise<SlackResponse> => {
	let weatherInfo: WeatherUpdate = {
		location: location,// i.e. "Vanderbilt University"
		weather: '', // the format specified in the README
		lat: 0,
		lon: 0,
		name: '',
	};

	if (process.env.NAME) weatherInfo.name = process.env.NAME;
	const latLonUrl = `https://nominatim.openstreetmap.org/?format=json&q=${weatherInfo.location}&format=json&limit=3&email=${process.env.EMAIL}`;
	let latlon: OpenStreetMap[];
	latlon = await (await fetch(latLonUrl)).json();

	weatherInfo.lat = parseFloat(latlon[0].lat);
	weatherInfo.lon = parseFloat(latlon[0].lon);

	const darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${weatherInfo.lat},${weatherInfo.lon}`;
	let currWeather: DarkSky;
	currWeather = await (await fetch(darkSkyUrl)).json();
	weatherInfo.weather = `It's ${currWeather.currently.summary} and it's ${currWeather.currently.temperature} degrees.`

	const slackUrl = `https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${JSON.stringify(weatherInfo)}`;
	return (await fetch(slackUrl)).json();
};

// all the console.logs should log what the send-to-slack API returns
// callbacks('Vanderbilt University', 'YOUR_SLACK_USER_ID', body => {
// 	console.log(body);
// }); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
// promises('Vanderbilt University', 'D44FTVCHJ').then(data => console.log(data));

// (async () => {
// 	console.log(await asyncAwait('Vanderbilt University', 'D44FTVCHJ'));
// })();
