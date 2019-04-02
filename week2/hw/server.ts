import Koa from 'koa';
import { asyncAwait } from './hw';

const app = new Koa();

app.use(async ctx => {
	ctx.body = await asyncAwait('Vanderbilt University', 'D44FTVCHJ'); // replace this with the call to async await with your desired location .
});

app.listen(3000);