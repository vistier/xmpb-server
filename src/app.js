/**
 * Created by Adi(adi@imeth.cn) on 2017/1/8.
 */
"use strict";

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

// session
var session = require('koa-session');
app.keys = ['iMeth', 'xmpb', 'adi'];
app.use(convert(session({
	key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
	maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
},app)));

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/assets')));

app.use((ctx, next) => {
	// 校验openid
	let path = ctx.path;

	if(path.match('member|station')) {
		let {openid=''} = ctx.query;

		let sOpenid = ctx.session.openid;

		// console.log(path, sOpenid, openid);

		if(openid === '') {
			ctx.body = {
				state: 401,
				msg: '非法请求'
			}
		} else if(sOpenid === openid) {
			next();
		} else {
			ctx.body = {
				state: 401,
				msg: '授权超时'
			}
		}
	} else {
		next();
	}
});

// Route
const index = require('./routes/index');
router.use('/api', index.routes(), index.allowedMethods());

app.use(router.routes(), router.allowedMethods());

// 监听异常
app.on('error', (err, ctx) => {
	console.log('error', ctx.url, err);
});

module.exports = app;