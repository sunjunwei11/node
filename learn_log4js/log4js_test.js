// 参考文章链接：http://shenyujie.cc/2018/05/25/log4js-basic/
// appender 决定了日志将会被以指定的方式，写入到指定的目标（流，文件，网络）中去
// category 可以自由地选择, 组合各个 appenders 来完成我们想要的日志记录功能
// 同时 category 也定义了当前日志分类的等级 level，来最终决定是否要输出该日志
// catrgory 是 appenders 的组合体 ( 对于 log4js 2.0 之后的版本，之前版本有另外的配置方式 )

let log4js = require('log4js');

log4js.configure({
	appenders: {
		out: { type: 'stdout' }, // 标准输出，输出到控制台
		app: { type: 'file', filename: 'log/output.log' }, // 输出到对应文件中
		appDate: { // 输出到日期文件中
			type: "dateFile",
			filename: 'log/myLog.log',
			pattern: 'yyyy-MM-dd', // 用于制定日志切分的时间间隔
			daysToKeep: 2,  // 日志保留的天数
			layout: { // 用于配置输出的内容格式
				type: 'pattern',
				// 用于配置输出的内容信息
				pattern: '%d %p %c %x{user} %m%n',
				// 可省略，用于新增自定义特性
				tokens: {
					user: function () {
						return 'jack';
					}
				}
			}
		}
	},
	// 分类，可以定义多个分类，每个分类可以有多个appenders，会调用该分类下的每一个appenders来输出日志
	// 分类的level属性，表示 >= level 才输出日志
	categories: {
		default: {
			appenders: ['out', 'app'],
			level: 'warn'
		},
		test: {
			appenders: ['out', 'appDate'],
			level: 'error'
		},
	}
});

let defaultLogger = log4js.getLogger();
defaultLogger.trace('default - this is trace');
defaultLogger.debug('default - this is debug');
defaultLogger.info('default - this is info');
defaultLogger.warn('default - this is warn');
defaultLogger.error('default - this is error');
defaultLogger.fatal('default - this is fatal');

let testLogger = log4js.getLogger('test');
testLogger.trace('test - this is trace');
testLogger.debug('test - this is debug');
testLogger.info('test - this is info');
testLogger.warn('test - this is warn');
testLogger.error('test - this is error');
testLogger.fatal('test - this is fatal');
