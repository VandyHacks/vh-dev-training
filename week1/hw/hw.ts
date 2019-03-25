import fetch from 'node-fetch';
// import { async } from 'q';

// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
const getDataFromAPI = (url: string): Promise<JSON> =>
    new Promise((res, rej) => {
        fetch(url)
            .then((data: any) => data.json())
            .then((json: any) => {
                // the json variable here is just the stuff you see in the browser
                res(json);
            })
            .catch((err: any) => rej(err));
    });

const objectively = (): void => {
    const q1 = (): void => {
        console.log(console);
    };

    q1();
    // @response 1: Console appears to be a JSON object with more functions as the data inside of that object

    // const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
    // @response 2: This object can have values other than numbers for its keys while an array can only be indexed by numbers

    // @response 3i: This is an object that contains other objects, with each object representing a person on the hackerspotted leaderboard

    const q3 = async (n: number): Promise<void> => {
        const res = JSON.parse(
            JSON.stringify(await getDataFromAPI('https://spot.benc.me/?time=1549939921'))
        ); // Bad but can't figure out how to treat it as json object without doing this first
        res.sort((a: any, b: any) => {
            if (a.unique > b.unique) return -1;
            if (a.unique < b.unique) return 1;
            return 0;
        });
        let person = res[n - 1];
        let nTmp = n;
        while (res[nTmp].unique === person.unique) {
            if (res[nTmp].score > person.score) person = res[nTmp];
            nTmp += 1;
        }

        console.log(person);
    };

    q3(3);
};

objectively();

const awry = (): void => {
    const docTester: number[] = [];
    // fill docTester with 1000 random integers between 0 and 99
    for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);

    const q1 = (): number[] => {
        const docTesterIndex: number[] = [];

        docTester.forEach((num, i) => {
            docTesterIndex[i] = num + i;
        });

        return docTesterIndex;
    };

    const q2 = (): number[] => {
        const docTesterIndex = docTester.map((num, i) => {
            return num + i;
        });

        return docTesterIndex;
    };

    const q3 = (arr: number[]): number => {
        return arr.reduce((acc, cur) => acc + cur);
    };

    const q4 = async (n: number): Promise<void> => {
        const res = JSON.parse(
            JSON.stringify(await getDataFromAPI('https://spot.benc.me/?time=1549939921'))
        ); // Bad but can't figure out how to treat it as json object without doing this first

        res
            .filter((person: any) => {
                return person.spotted >= 3 || person.spotted === 0;
            })
            .sort((a: any, b: any) => {
                if (a.unique > b.unique) return -1;
                if (a.unique < b.unique) return 1;
                return 0;
            });

        let person = res[n - 1];
        let nTmp = n;
        while (res[nTmp].unique === person.unique) {
            if (res[nTmp].score > person.score) person = res[nTmp];
            nTmp += 1;
        }

        console.log(person);
    };

    console.log(q3(q1()));
    console.log(q3(q2()));

    q4(3);
};

awry();

// console.log(docTester); // uncomment this to see the array logged

// @response final: The typescript transforms the typescript code into vanilla javascript code that can be run in the browser. 