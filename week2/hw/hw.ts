import request, { Response } from 'request'; // I hate myself everytime I type this
require('dotenv').config();
interface WeatherUpdate {
	location: string; // i.e. "Vanderbilt University"
	weather: string; // the format specified in the README
	lat: number;
	lon: number;
	name: string; // your name - use this from process.env
}

const callbacks = (
	location: string,
	slackUsername: string,
	callback: (body: any) => void
): void => {
	request(
		// this is just the first call to request. You'll need multiple
		'YOUR_URL',
		(error: Error, response: Response, body: object): void => {
			if (error) {
				console.log(error);
			} else {
				console.log(body);
			}
		}
	);
};

// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
const promises = (location: string, slackUsername: string): Promise<object> => {
	// use fetch
};
export const asyncAwait = async (location: string, slackUsername: string): Promise<object> => {
	// use fetch
};

// all the console.logs should log what the send-to-slack API returns
callbacks('Vanderbilt University', 'YOUR_SLACK_USER_ID', body => {
	console.log(body);
}); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
promises('Vanderbilt University', 'D44FTVCHJ').then(data => console.log(data));

(async () => {
	console.log(await asyncAwait('Vanderbilt University', 'D44FTVCHJ'));
})();
