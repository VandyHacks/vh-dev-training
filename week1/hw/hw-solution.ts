/* eslint no-unused-vars: "off", @typescript-eslint/no-unused-vars: "off" */

import fetch from 'node-fetch';

// we didn't mention this yet but this lets us declare types for the whole file
export interface SpotPerson {
	name: string;
	score: number;
	spots: number;
	spotted: number;
	invalidated: number;
	unique: number;
	id: string;
}

// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
export const getDataFromAPI = (url: string): Promise<SpotPerson[]> =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});

const objectively = async (): Promise<void> => {
	// neither method is called
	const q1 = (): void => console.log(console);
	const getNthHighestByUniqueSpots = async (n: number): Promise<SpotPerson> =>
		(await getDataFromAPI('https://spot.benc.me/?time=1549939921')).sort(
			// this is unecessarily succinct - see if you can figure out what I'm doing
			(a, b) => b.unique - a.unique
		)[n - 1];
};

const awry = async (): Promise<void> => {
	// put this stuff in your "awry" function after you make it
	const docTester = [];
	// fill docTester with 1000 random integers between 0 and 99
	for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);

	let docTesterIndex = []; // note that this has to be let because it's reassigned later

	// docTester.forEach((el, idx) => {
	// 	docTesterIndex[idx] = el + idx;
	// });

	// map approach > foreach approach but foreach approach is commented out above
	docTesterIndex = docTester.map((el, idx) => el + idx);
	console.log(`Error is ${549000 - docTesterIndex.reduce((acc, el) => acc + el, 0)}`);

	const getNthHighestByUniqueSpotsFiltered = async (n: number): Promise<SpotPerson> =>
		(await getDataFromAPI('https://spot.benc.me/?time=1549939921'))
			.filter(el => el.spotted === 0 || el.spotted >= 3)
			.sort((a, b) => b.unique - a.unique)[n - 1];
};

(async () => {
	// objectively();
	// awry();
})();
// write your homework here

// put all this in your "objectively" function after you make it
const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

// console.log(docTester); // uncomment this to see the array logged
