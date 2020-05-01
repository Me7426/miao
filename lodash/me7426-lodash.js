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
