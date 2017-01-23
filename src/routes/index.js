/**
 * Created by Adi(adi@imeth.cn) on 2017/1/8.
 */
"use strict";

const router = require('koa-router')();

router.get('/', ctx => {
	ctx.body = {
		id: new Date().getTime()
	};
});

// 注册模块
require('./member' )(router);
require('./login'  )(router);
require('./station')(router);

module.exports = router;