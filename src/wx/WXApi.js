/**
 * Created by Adi(adi@imeth.cn) on 2017/1/23.
 */
"use strict";

const request = require('sync-request');

const APP_ID = "wx911f0f494f076d47";
const SECRET = "fb6e06a03094fe3015d8384010e76daf";

let WXApi = {};

WXApi.getSessionKeyUrl = code => {
	return `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
};

WXApi.getSessionKey = (code) => {

	let url = WXApi.getSessionKeyUrl(code);
	console.log(url);
	let response = request('GET',url);

	if(response.statusCode === 200) {
		let json = JSON.parse(response.getBody('utf8'));

		if(json.errcode) {
			console.log(json.errcode, json.errmsg);
			throw new Error('code无效');
		}

		return json;
	}

	throw new Error('获取sessionKey异常');
};

module.exports = WXApi;