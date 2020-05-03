var me7426 = {
	isNull,
	chunk,
	compact,
	difference,
	concat,
	drop,
	fill,
	head,
	flatten,
	indexOf,
	initial,
	intersection,
	join,
	last,
	lastIndexOf,
	nth,
	pull,
	pullAll,
	pullAt,
	remove,
	reverse,
	slice,
	sortedIndex,
	tail,
	take,
	takeRight,
	union,
	uniq,
	unzip,
	without,
	xor,
	zip,
	zipObject,
	includes,
}

function includes(col, val, from = 0) {
	from = from < 0 ? col.length + from : from;
	if(typeof col == 'string') {
		return col.includes(val, from)
	} else {
		vals = Object.values(col)
		if(vals.indexOf(val, from) > -1) {
			return true
		}
	}

	return false
	
}

function zipObject(keys, vals) {
	let result = {};
	keys.forEach((e, i) => {
		result[e] = vals[i]
	})
	return result
}

function zip(...arys) {
	let result = []
	arys.forEach((e, i) => {
		e.forEach((ee, ii) => {
			result[ii] = result[ii] || Array(arys.length);
			result[ii][i] = ee
		})
	})

	return result
}

function xor(ary, ...arys) {
	let map = new Map();
	[].concat(ary, ...arys).forEach((e) => {
		let k = map.get(e);
		if(k == undefined) {
			map.set(e, 0)
		} else {
			map.set(e, k + 1)
		}
	})

	let result = [];
	map.forEach((val, key) => {
		val || result.push(key)
	})

	return result
}

function without(ary, ...val) {
	return difference(ary,val)
}

function unzip(ary) {
// let result = Array.apply(null, Array(ary[0].length)).map(() => []);
	let result = [...Array(ary[0].length)].map(() => [])

	ary.forEach((e) => {
		e.forEach((ee, i) => {
			result[i].push(ee)
		})
	})

	return result
}

function uniq(ary) {
	return union(ary)
}

function union(...ary) {
	return [...new Set([].concat(...ary))]
}

function takeRight(ary, n = 1) {
	let i = ary.length - n > -1 ? ary.length - n : 0;
	return ary.slice(i)
}

function take(ary, n = 1) {
	return ary.slice(0, n)
}

function tail(ary) {
	return ary.slice(1)
}

function sortedIndex(ary, val) {
	let len = ary == null ? 0 : ary.length;
	if(len == 0 || ary[0] > val) {
		return 0
	} else if(ary[len - 1] < val) {
		return len - 1
	}

	let l = 0;
	let m = (len - 1) / 2 | 0;
	let r = len - 1;
	do {
		if(ary[m] < val) {
			l = m;
		} else {
			r = m;
		}
		m = (r - l) / 2 + l | 0
	} while (r - l > 1);

	return m + 1
}

function slice(ary, start = 0, end) {
	let len = ary == null ? 0 : ary.length;
	if(!len) {
		return []
	}

	if(start < 0) {
		start = -start > len ? 0 : (len + start);
	}
	if(end < 0) {
		end = -end > len ? 0 : (len + end)
	} else {
		end = end < len ? end : (len - 1)
	}

	len = start > end ? 0 : Math.floor((end - start + 1));
	let result = [];
	let i = -1;
	while(++i < len) {
		result[i] = ary[i + start]
	}

	return result
}

function reverse(ary) {
	return ary.reverse()
}

function remove(ary, fn=e=>e) {
	if (Array.isArray(ary)) {
		let result = ary.filter(fn);
		pull(ary, ...result);
		return result
	} else {
		return undefined
	}
}

function pullAt(ary, idx) {
	if (Array.isArray(ary)) {
		let result = [];
		let offset = 0;
		idx.forEach((e) => {
			result.push(...ary.splice(e - offset++, 1))
		})
		return result
	} else { 
		return undefined
	}
}

function pullAll(ary, vals) {
	return pull(ary, ...vals)
}

function pull(ary, ...val) {
	if (Array.isArray(ary)) {
		for (let i = 0; i < ary.length; i++) {
			let j = val.indexOf(ary[i])
			if (j > -1)
				ary.splice(i--, 1)
		}
		return ary
	} else {
		return undefined
	}
}

function nth(ary, n = 0) {
	return Array.isArray(ary) ? ary[n > 0 ? n : ary.length + n] : undefined;
}

function lastIndexOf(ary, val, from) {
	if (!Array.isArray(ary)) {
		return -1
	} else {
		from || (from = ary.length);
		if (Number.isNaN(val)) {
			let i = from
			do {
				if (Number.isNaN(ary[i]))
					return i
			} while (i--);
		} else {
			return ary.lastIndexOf(val, from)
		}
	}
}

function last(ary) {
	return Array.isArray(ary) ? ary[ary.length - 1] : undefined;
}

function join(ary, val) {
	return Array.isArray(ary) ? ary.join(val) : ''
}

function intersection(...ary) {
	let result = [];
	let map = new Map();
	ary[0].forEach(e => map.set(e, false))

	for (let i = 1; i < ary.length; i++) {
		ary[i].forEach(e => map.has(e) && map.set(e, true))
	}

	map.forEach((v, k) => v && result.push(k))
	return result
}

function initial(ary) {
	return ary.slice(0, -1)
}

function indexOf(ary, val, from = 0) {
	if (!Array.isArray(ary)) {
		return -1
	} else if (Number.isNaN(val)) {
		return ary.findIndex(Number.isNaN)
	} else {
		return ary.indexOf(val, from)
	}
}

function flatten(ary) {
	return [].concat(...ary)
}

function head(ary) {
	return ary[0]
}

function fill(ary, val, start = 0, end = ary.length) {
	return ary.map((e, i) => i >= start && i < end ? val : e)
}

function drop(ary, n = 1) {
	return ary.slice(n)
}

function concat(ary1, ...ary2) {
	ary1 = [...ary1];
	ary2 = [].concat(...ary2);
	return ary1.concat(ary2)
}

function difference(ary1, ...ary2) {
	let map = new Map();
	ary2 = [].concat(...ary2);
	ary2.forEach(e => map[e] = true);
	return ary1.filter(e => !(e in map));
}

function compact(ary) {
	let result = [];

	for (let i = 0; i < ary.length; i++) {
		ary[i] && result.push(ary[i])
	}

	return result
}

function chunk(ary, size) {
	let result = [];

	for (let i = 0; i < ary.length; i += size) {
		result.push(ary.slice(i, i + size))
	}

	return result;
}

function isNull(val) {
	return val === null
}
