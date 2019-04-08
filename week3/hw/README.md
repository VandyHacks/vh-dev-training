# Week 3 Homework

This week will be short and sweet because we know it's a rough week for everyone. That said, next week will be a bigger project style thing.

We wanted to highlight one of the more irritating things about JS and how to navigate around it (or rather have you figure that out).

## The task

1. Grab the list of cities from https://gist.github.com/norcal82/42440bd06a67eb7d9616 and paste into your a file called `hw.ts`.
2. Select a random subarray of cities from this list (feel free to grab code from the internet for this)
3. Send to the slack API from last week an array of strings that looks like this: "Chicago: 41.881832, -87.623177".
   - Here's the catch: you must use `Array.map` to map city names to latlng. Note that it will _not_ be as simple as:

```ts
// the following returns [Promise, Promise, Promise], not the results that we actually want
citiesArray.map(async el => {
	const blah = await fetch('some url');
	return blah.json();
});
```

As always the internet is your friend :).
