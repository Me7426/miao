var me7426 = {
	isNull,
	chunk,
	compact,
}

function isNull (val) {
	return val === null
}

function chunk (ary, size) {
	let result = [];

	for (let i = 0; i < ary.length; i += size) {
		result.push(ary.slice(i, i + size))
	}

	return result;
}

function compact(ary) {
	let result = [];

	for (let i = 0; i < ary.length; i++) {
		if (ary[i])
		result.push(ary[i])
	}
}