/**
 * Created by Adi(adi@imeth.cn) on 2017/1/23.
 */
"use strict";

const station = router => router
	.get('/station', ctx => {

		console.log(ctx.query);

		ctx.body = {
			station: new Date().getTime()
		};

	});

module.exports = station;