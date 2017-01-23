/**
 * Created by Adi(adi@imeth.cn) on 2017/1/23.
 */
"use strict";

const request = require('sync-request');
const config = require('../config/station.json');

const url = "http://www.xmsggzxc.com/sysaspx/getmap.aspx";
const headers = {'Content-Type':'application/x-www-form-urlencoded'};

const station = router => router
	// 获取所有站点信息
	.get('/station', ctx => {
		ctx.body = {
			status: 200,
			result: config
		};

	})
	// 获取站点详情信息
	.get('/station/:id', ctx => {
		let {id} = ctx.params;

		// 先读取缓存数据

		// 再更新数据

		let response = request('POST', url, {headers, body: `keyword=${id}`});

		if(response.statusCode === 200) {

			let json = JSON.parse(response.getBody('utf8'));

			// 缓存数据

			ctx.body = {
				status: 200,
				result: {
					...json.data
				}
			}


		} else {
			ctx.body = {
				status: 501,
				msg: '获取站点详情信息异常'
			}
		}

	});

module.exports = station;