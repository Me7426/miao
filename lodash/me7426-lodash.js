var me7426 = {
	isNull,
	chunk,
	compact,
	difference,
	concat,
	drop,
	fill,
}

function fill (ary, val, start = 0, end = ary.length) {
	return ary.map((e, i) => i >= start && i < end ? val : e)
}

function drop (ary, n = 1) {
	return ary.slice(n)
}

function concat (ary1, ...ary2) {
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

function chunk (ary, size) {
	let result = [];

	for (let i = 0; i < ary.length; i += size) {
		result.push(ary.slice(i, i + size))
	}

	return result;
}

function isNull (val) {
	return val === null
}
