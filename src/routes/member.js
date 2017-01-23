/**
 * Created by Adi(adi@imeth.cn) on 2017/1/23.
 */
"use strict";

/**
 * 登记会员信息
 *
 *  请求参数:
 *   nickName
 *   avatarUrl
 *   gender   // 性别 0：未知、1：男、2：女
 *   province
 *   city
 *   country
 *
 *   encryptedData =解密=>
 *        openId
 *        nickName
 *        gender
 *        city
 *        province
 *        country
 *        avatarUrl
 *        unionId
 *        watermark: {appid, timestamp}
 *
 * @param router
 */
const member = router => router
	.get('/member', ctx => {
		console.log(ctx.query);

		ctx.body = {
			member: new Date().getTime()
		};
	})
	.get('/member/register', ctx => {

		console.log(ctx.query);

		ctx.body = {
			member: new Date().getTime()
		};

	});

module.exports = member;