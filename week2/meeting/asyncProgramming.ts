import fetch from 'node-fetch';

// This is a ***hack***, don't do this
import request = require('request');

const url = 'https://spot.benc.me/?time=1549939921';

/**
 * An example of grabbing data from the VandyHacks Spot API using a callback
 * Notes: 1. We must use request because fetch uses Promises
 *           and Promises are not interchangeable with callbacks.
 *        2. If we wanted to add another callback, this code would get
 *           very convoluted and grow littered with closing braces.
 *        3. It's very difficult to make this example simple return
 *           a string value - go ahead and try this yourself! You'll need
 *           another callback.
 */
const callbackExample = (): void => {
	request(url, (error, _response, body) => {
		if (error) {
			console.log(error);
		} else {
			console.log(body);
		}
	});
};

/**
 * An example of grabbing data from the VandyHacks Spot API using a Promise
 * Notes: 1. We must use node-fetch
 *        2. It's easy to chain actions with .then()
 *        3. Handling errors is a piece of cake!
 */
const promiseExample = (): Promise<string> =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				res(json);
			})
			.catch(err => rej(err));
	});

/**
 * An example of grabbing data from the VandyHacks Spot API using async/await
 * Notes: 1. We must use node-fetch
 *        2. We turned this method into a one-liner!
 *        3. We must call this from inside of an asym
 *        4. The types are confusing - wait until we get to the typing section
 *           of today's lesson to see how to make this cleaner!
 */
const asyncAwaitExample = async (): Promise<Record<string, any>[]> => {
	return (await fetch(url)).json();
};

(async () => {
	callbackExample();
	promiseExample().then(res => console.log(res));
	console.log(await asyncAwaitExample());
})();
