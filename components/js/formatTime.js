const dateTime = function(time) {
	let old = new Date(time) // 目标时间
	let newTime = new Date() // 当前时间

	// 获取old具体时间
	let d = old.getTime()
	let h = old.getHours()
	let m = old.getMinutes()
	let Y = old.getFullYear()
	let M = old.getMonth() + 1
	let D = old.getDate()

	// 获取new具体时间
	let nd = newTime.getTime()
	let nh = newTime.getHours()
	let nm = newTime.getMinutes()
	let nY = newTime.getFullYear()
	let nM = newTime.getMonth() + 1
	let nD = newTime.getDate()
	
	// 当天时间
	if (D === nD && M === nM && Y === nY) {
		h < 0 ? '0' + h : h
		m < 0 ? '0' + m : m
		return h < 13? '上午' + h +  ':' + m : '下午' + h +  ':' + m
	}
	
	// 昨天时间
	if(D + 1 === nD && M === nM && Y === nY) {
		h < 0 ? '0' + h : h
		m < 0 ? '0' + m : m
		return '昨天' + h +  ':' + m
	}
	
	return Y + '/' + M + '/' + D
	

}


export const changeTime = function(time) {
	let old = new Date(time) // 目标时间
	// 获取old具体时间
	let d = old.getTime()
	let h = old.getHours()
	let m = old.getMinutes()
	let Y = old.getFullYear()
	let M = old.getMonth() + 1
	let D = old.getDate()
	
	return Y + '/' + M + '/' + D + ' ' + h+ ':' +m
}

// 时间间隔
export const spaceTime = function(nowTime,tragetTime) {
	// 当前时间
	nowTime = new Date(nowTime)
	// 目标时间
	tragetTime = new Date(tragetTime)
	// 当前时间戳
	let told = nowTime.getTime()
	// 目标时间戳
	let tnow = tragetTime.getTime()
	// console.log(told,tnow)
	// 判断是否超过间隔时间【10秒】
	if(told >= (tnow + 1000*10)){
		return tragetTime
	}else{
		return ''
	}
}

export const spaceTime1 = function(nowTime,tragetTime) {
	// 当前时间
	nowTime = new Date(nowTime)
	// 目标时间
	tragetTime = new Date(tragetTime)
	// 当前时间戳
	let told = nowTime.getTime()
	// 目标时间戳
	let tnow = tragetTime.getTime()
	// console.log(told,tnow)
	// 判断是否超过间隔时间【10秒】
	if(tnow >= (told + 1000*10)){
		return tragetTime
	}else{
		return ''
	}
}

export default {
	dateTime
}
