import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
	ctx.body = 'Hello world'; // replace this with the call to async await with your desired location .
});

app.listen(3000);
