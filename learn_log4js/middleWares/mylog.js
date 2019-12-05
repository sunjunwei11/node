const log4js = require('log4js');
module.exports = () => {
	log4js.configure({
		appenders: {
			out: {
				type: 'stdout'
			},
			cheese: {
				type: 'dateFile',
				encoding: 'utf-8',
				filename: 'log/koaMyLog',
				layout: {
					type: "pattern",
					pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
				},
				pattern: "-yyyy-MM-dd.log",
				alwaysIncludePattern: true,
			},
		},
		categories: {default: {appenders: ['out', 'cheese'], level: 'info'}}
	});
	const logger = log4js.getLogger('cheese');
	console.log('ok');
	return async (ctx, next) => {
		ctx.log = logger;
		const start = Date.now();
		await next();
		const end = Date.now();
		const responseTime = end - start;
		logger.info(`响应时间为: ${(responseTime / 1000).toFixed(4)}s，请求 url : ${ctx.request.url}`);
	}
};