/**
 * Created by Adi(adi@imeth.cn) on 2017/1/23.
 */
"use strict";

const WXApi = require('../wx/WXApi');

/**
 * 微信登录授权
 *
 * 请求参数 code
 *
 * 用户允许登录后，回调内容会带上 code（有效期五分钟），
 * 开发者需要将 code 发送到开发者服务器后台，使用code 换取 session_key api，将 code 换成 openid 和 session_key
 *
 *
 * @param router
 */
const login = router => router.get('/login/wx', ctx => {

	// 获取code
	let param  = ctx.query;
	let code = param.code;

	// 请求微信获取 session_key
	let session = "";

	try {
		let {openid, session_key} = WXApi.getSessionKey(code);

		ctx.session.openid = openid;

		ctx.body = {
			state: 200
		};
	} catch (e) {
		console.log(e);
		ctx.body = {
			state: 501,
			message: '无效Code'
		};
	}

});

module.exports = login;