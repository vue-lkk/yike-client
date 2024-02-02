// 模拟好友列表数据
const friends = function() {
	let friends = [{
			id: 1,
			imgurl: 'a.png',
			tip: 3,
			name: "小里",
			time: new Date(),
			news: '收到',
			email: '2324@qq.com'
		},
		{
			id: 2,
			imgurl: 'b.png',
			tip: 2,
			name: "小熊大",
			time: new Date(),
			news: 'Top 对方防守对方律师代理费是批发配送诶日拍拍日文',
			email: '4trt44@qq.com'
		},
		{
			id: 3,
			imgurl: 'c.png',
			tip: 99,
			name: "李小武",
			time: new Date(),
			news: '666',
			email: '222324@qq.com'
		},
		{
			id: 4,
			imgurl: 'd.png',
			tip: 12,
			name: "小明",
			time: new Date(),
			news: '都非常熟悉地方',
			email: '888@qq.com'
		},
		{
			id: 5,
			imgurl: 'e.png',
			tip: 6,
			name: "小卡里",
			time: new Date(),
			news: '在干吗？',
			email: '666@qq.com'
		},
		{
			id: 6,
			imgurl: 'a.png',
			tip: 0,
			name: "韩小丽",
			time: new Date(),
			news: '自拍日常',
			email: '333@qq.com'
		},
		{
			id: 7,
			imgurl: 'd.png',
			tip: 12,
			name: "小付",
			time: new Date(),
			news: '都非常熟悉地方',
			email: '2333@qq.com'
		},
		{
			id: 8,
			imgurl: 'e.png',
			tip: 6,
			name: "小浣熊",
			time: new Date(),
			news: '在干吗？',
			email: '888@qq.com'
		},
		{
			id: 9,
			imgurl: 'a.png',
			tip: 1,
			name: "小楷",
			time: new Date(),
			news: '自拍日常',
			email: '888@qq.com'
		},
		{
			id: 10,
			imgurl: 'd.png',
			tip: 12,
			name: "小风",
			time: new Date(),
			news: '都非常熟悉地方',
			email: '888@qq.com'
		},
		{
			id: 11,
			imgurl: 'e.png',
			tip: 6,
			name: "卡卡西",
			time: new Date(),
			news: '在干吗？',
			email: '888@qq.com'
		},
		{
			id: 12,
			imgurl: 'a.png',
			tip: 0,
			name: "明锐",
			time: new Date(),
			news: '自拍日常',
			email: '888@qq.com'
		}
	]
	return friends
}

// 好友关系
const isFriend = function() {
	const isFriend = [{
			userid: 1,
			friend: 2
		},
		{
			userid: 1,
			friend: 4
		},
		{
			userid: 1,
			friend: 6
		},
		{
			userid: 1,
			friend: 8
		}
	]
	return isFriend
}

// 聊天消息
const message = function() {
	const msgs = [{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: 'f.png',
			types: 1, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: Date.now(), // 发送时间
			tip: 0 //消息id
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: '收到方',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 3,
			tip: 1
		},
		{
			id: 'b', // 用户id
			imgurl: 'm.png',
			message: '微热方',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 8,
			tip: 2
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: '3253',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 9,
			tip: 3
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: 'soefgdp',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 13,
			tip: 4
		},
		{
			id: 'b', // 用户id
			imgurl: 'm.png',
			message: '收到扣分三六九等粉碎机粉碎配方',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 20,
			tip: 5
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: '色忒发生的 额外fdfd我婆婆我颇为图片方',
			types: 0, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 30,
			tip: 6
		},
		{
			id: 'b', // 用户id
			imgurl: 'm.png',
			message: 'c.png',
			types: 1, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 40,
			tip: 7
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: 'd.png',
			types: 1, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 60 * 100,
			tip: 8
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: '1.jpg',
			types: 1, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 86400,
			tip: 9
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: '2.png',
			types: 1, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date() - 1000 * 86400 * 2,
			tip: 10
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: {
				voice:'a',
				time:60,
			},
			types:2, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date(),
			tip: 11
		},
		{
			id: 'b', // 用户id
			imgurl: 'm.png',
			message: {
				voice:'a', // 音频地址
				time:20,   // 音频时间
			},
			types: 2, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date(),
			tip: 12
		},
		{
			id: 'b', // 用户id
			imgurl: 'm.png',
			message: {
				name: "德川家私人粉丝u额哦iu若i无肉铺色弱为u肉片我i二批",
				address: "北京市东城区",
				latitude: 39.915932,
				longitude: 116.411561
			},
			types: 3, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date(),
			tip: 13
		},
		{
			id: 'a', // 用户id
			imgurl: 'a.png',
			message: {
				name: "德川家",
				address: "北京市东城区",
				latitude: 39.915932,
				longitude: 116.411561
			},
			types: 3, // 内容类型（0文字、1图片链接、2音频链接、3地图）
			time: new Date(),
			tip: 14
		}

	]
	return msgs
}

export default {
	friends,
	isFriend,
	message
}