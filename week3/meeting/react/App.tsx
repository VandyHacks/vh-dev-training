import * as React from 'react';

// let's define some data
const data: number[] = [];
for (let i = 0; i < 100; i++) data[i] = 1000 * Math.random();

const App = () => {
	return data.map(el => <div style={{ backgroundColor: 'magenta', marginBottom: 0 }}> 
{' '}
{el}
{' '}
 </div>);

	// return <div>hello irfaan</div>;
};
export default App;
