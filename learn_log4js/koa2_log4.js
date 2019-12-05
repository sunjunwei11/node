// 参考链接： http://shenyujie.cc/2018/05/29/log4js-koa2/
const Koa = require('koa2');

const logger = require('./middleWares/mylog');

const app = new Koa();

console.log(666);
app.use(logger());

app.use(async ctx => {
	ctx.log.warn('it is work');
	ctx.body = 'Hello World';
});

app.listen(3000);