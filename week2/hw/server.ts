// import Koa from 'koa';
const Koa = require('koa');
import { asyncAwait } from './hw';

const app = new Koa();

app.use(async ctx => {
	ctx.body = await asyncAwait('Vanderbilt University', 'C9S0DF3BR'); // replace this with the call to async await with your desired location .
});

app.listen(3000);