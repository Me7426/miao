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
	flattenDeep,
	flattenDepth,
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
	sample,
	sampleSize,
	shuffle,
	size,
	eq,
	gt,
	gte,
	lt,
	lte,
	add,
	ceil,
	divide,
	floor,
	max,
	mean,
	min,
	multiply,
	round,
	subtract,
	sum,
	at,
	defaults,
	get,
	set,
	has,
	hasIn,
	invert,
	keys,
	assign,
	omit,
	pick,
	values,
	camelCase,
	capitalize,
	endsWith,
	escape,
	kebabCase,
	lowerCase,
	lowerFirst,
	pad,
	padStart,
	padEnd,
	parseInt,
	repeat,
	replace,
	snakeCase,
	split,
	startCase,
	startsWith,
	trim,
	trimEnd,
	trimStart,
	countBy,
	unescape,
	upperFirst,
	upperCase,
	words,
	range,
	differenceBy,
	differenceWith,
	dropRight,
	dropRightWhile,
	dropWhile,
	findIndex,
	findLastIndex,
	fromPairs,
	toPairs,
	intersectionBy,
	intersectionWith,
	pullAllBy,
	pullAllWith,
	sortedIndexBy,
	sortedIndexOf,
	sortedLastIndex,
	sortedLastIndexBy,
	sortedLastIndexOf,
	sortedUniq,
	sortedUniqBy,
	takeRightWhile,
	takeWhile,
	unionBy,
	unionWith,
	uniqBy,
	uniqWith: unionWith,
	unzipWith,
}

function unzipWith(ary, fn) {
	let result = [];
	ary[0].forEach((e, i) => {
		result.push(fn(e, ary[1][i]))
	})

	return result
}

function uniqBy(ary, fn = e => e) {
	fn = getIte(fn);
	let map = new Map();

	ary.forEach(e => {
		let val = fn(e);
		map.has(val) || map.set(val, e)
	});

	return [...map.values()]
}

function unionWith(...ary) {
	let fn = typeof last(ary) == 'function' ? ary.pop() : () => true;
	ary = ary.flat();
	let result = [ary[0]];

	ary.reduce((p, e) => {
		if (result.every(ee => !fn(ee, e))) {
			result.push(e)
		}
	})

	return result
}

function unionBy(...ary) {
	let fn = Array.isArray(last(ary)) ? e => e : getIte(ary.pop());
	let map = new Map();
	let result = [];
	union(...ary).forEach(e => {
		let val = fn(e);
		if (!map.has(val)) {
			result.push(e);
			map.set(val, e)
		}
	})

	return result
}

function takeWhile(ary, fn = e => e) {
	fn = getIte(fn);
	let i = -1;
	let len = ary.length;

	while (i++ < len) { if (!fn(ary[i])) break }

	return take(ary, i)
}

function takeRightWhile(ary, fn = e => e) {
	fn = getIte(fn);
	let i = ary.length;

	while (i--) {
		if (!fn(ary[i])) break
	}

	return ary.slice(i + 1)
}

function sortedUniq(ary) {
	return sortedUniqBy(ary)
}

function sortedUniqBy(ary, fn) {
	let i = -1;
	let len = ary.length;
	let result = [];

	while (++i < len) {
		var current = fn ? fn(ary[i]) : ary[i];

		if (!eq(current, next)) {
			var next = current;
			result.push(ary[i]);
		}
	}

	return result
}

function sortedLastIndexOf(ary, target) {
	let start = 0;
	let end = ary.length - 1;
	let mid

	while (start <= end) {
		mid = parseInt(start + (end - start) / 2);
		if (target == ary[mid] && target < ary[mid + 1]) {
			return mid
		} else if (target < ary[mid]) {
			end = mid - 1
		} else {
			start = mid + 1
		}
	}

	return mid
}

function sortedLastIndexBy(ary, target, fn = e => e) {
	fn = getIte(fn);
	ary = ary.map(fn);
	target = fn(target);

	return sortedLastIndex(ary, target)
}

function sortedLastIndex(ary, target) {
	let start = 0;
	let end = ary.length - 1;
	let mid

	while (start <= end) {
		mid = parseInt(start + (end - start) / 2);
		if (target >= ary[mid] && target < ary[mid + 1]) {
			return mid + 1
		} else if (target < ary[mid]) {
			end = mid - 1;
		} else {
			start = mid + 1
		}
	}

	return mid
}

function sortedIndexOf(ary, target) {
	let start = 0;
	let end = ary.length - 1;
	let mid

	while (start <= end) {
		mid = parseInt(start + (end - start) / 2);
		if (target == ary[mid] && target > ary[mid - 1]) {
			return mid
		} else if (target > ary[mid]) {
			start = mid + 1
		} else {
			end = mid - 1
		}
	}

	return -1
}

function sortedIndexBy(ary, target, fn = e => e) {
	fn = getFn(fn)
	ary = ary.map(fn);
	target = fn(target);
	return sortedIndex(ary, target)
}

function pullAllWith(ary1, ary2, fn = e => e) {
	fn = getFn(fn);

	ary2.forEach(e => {
		let i = ary1.length;
		while (--i > -1) {
			fn(e, ary1[i]) && ary1.splice(i, 1)
		}
	})

	return ary1
}

function pullAllBy(ary1, ary2, fn = e => e) {
	fn = getFn(fn);

	ary2.map(fn).forEach(e => {
		let i = ary1.length;
		while (--i > -1) {
			fn(ary1[i]) == e && ary1.splice(i, 1)
		}
	})

	return ary1
}

function intersectionWith(ary, ...others) {
	let fn = getIte(others.pop());
	let result = [];

	[].concat(...others).forEach(e => {
		ary.forEach(ee => fn(ee, e) && result.push(ee))
	})

	return result
}

function intersectionBy(ary, ...others) {
	let fn = getFn(others.pop());
	let map = {};
	let result = [];

	new Set([].concat(...others))
		.forEach(e => map[fn(e)] = true);
	ary.forEach(e => fn(e) in map && result.push(e));

	return result
}

function toPairs(obj) {
	return Object.entries(obj)
}

function fromPairs(ary) {
	return Object.fromEntries(ary)
}

function findLastIndex(ary, fn = e => e, from) {
	if (Array.isArray(ary)) {
		from = from == undefined ? ary.length - 1 : from;
		fn = getIte(fn);
	} else {
		return null
	}

	while (from >= 0) {
		if (fn(ary[from])) return from
		from--
	}

	return null
}

function findIndex(ary, fn = e => e, fromIdx = 0) {
	fn = getIte(fn);

	for (let i = fromIdx; i < ary.length; i++) {
		if (fn(ary[i])) return i
	}

	return null
}

function dropWhile(ary, fn = e => false) {
	fn = getIte(fn);
	let i = 0;
	ary.some(e => ++i && !fn(e));

	return ary.slice(i - 1)
}

function dropRightWhile(ary, fn = () => false) {
	fn = getIte(fn);
	let i = ary.length;

	while (fn(ary[--i])) { }

	return ary.slice(0, i + 1)
}

function dropRight(ary, n = 1) {
	let l = ary.length;
	n = n < l ? l - n : 0;
	return ary.slice(0, n)
}

function differenceWith(ary, ...other) {
	if (Object.values(ary) == []) return []

	let fn = Array.isArray(last(other)) ? e => e : getFn(other.pop());
	// 判断传入的最后一个参数是否是函数
	let result = [];

	new Set([].concat(...other))	//去重
		.forEach(e => {
			ary.forEach(ee => {
				if (!fn(ee, e)) result.push(ee)
			})
		});

	return result
}

function differenceBy(ary, ...other) {
	if (ary == []) {
		return []
	}
	if (Array.isArray(last(other))) {
		fn = e => e
	} else {
		fn = getFn(other.pop());
	}

	let map = {};
	let result = [];
	[].concat(...other).forEach(e => map[fn(e)] = e);
	ary.forEach(e => fn(e) in map || result.push(e));

	return result
}

function flattenDepth(ary, n = 1) {
	return ary.flat(n)
}

function range(start = 0, end, step = 1) {
	if (step == 0) {
		return Array(end - start).fill(start)
	}
	let result = [];
	if (end === undefined) {
		end = start;
		start = 0;
	}
	if (end < start) {
		step = -Math.abs(step);
		juge = function (n) { return n > end };
	} else {
		juge = function (n) { return n < end };
	}
	for (let i = start; juge(i); i += step) {
		result.push(i)
	}

	return result
}

function words(str = '', reg = /\w+/g) {
	return str.match(reg)
}

function upperFirst(str = '') {
	return str.replace(/\w/, e => e.toUpperCase())
}

function unescape(str = '') {
	let map = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'"
	}
	Object.keys(map).forEach(e => {
		str = str.replace(e, map[e])
	})
	return str
}

function countBy(col, fn) {
	fn = getFn(fn);
	vals = Object.values(col);
	return vals.reduce((p, e) => {
		v = fn(e);
		p[v] = v in p ? ++p[v] : 1;
		return p
	}, {})
}

function trimStart(str, reg = '\\s') {
	str = String(str);
	reg = RegExp(`[${reg}]+`);
	return str.replace(reg, '')
}

function trimEnd(str, reg = '\\s') {
	str = String(str);
	reg = RegExp(`(?<=[^${reg}])[${reg}]+`);
	return str.replace(reg, '')
}

function trim(str, reg = '\\s') {
	str = String(str);
	reg = RegExp(`[${reg}]`, 'g');
	return str.replace(reg, '')
}

function startsWith(str, val, n = 0) {
	return str[n] == val
}

function startCase(str) {
	let list = str.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
	list.forEach((e, i) => {
		list[i] = e.replace(/\w/, e => e.toUpperCase())
	})

	return list.join(' ')
}

function split(str, reg, n) {
	str = String(str);
	reg = RegExp(reg);
	n = n == undefined ? str.length : n;
	return str.split(reg, n)
}

function snakeCase(str) {
	let list = str.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
	list = list.map(e => e.toLowerCase()).join('_');
	return list
}

function replace(str, reg, fn) {
	str = String(str);
	reg = RegExp(reg);
	return str.replace(reg, fn)
}

function repeat(str = '', n = 1) {
	return padStart('', n * str.length, str)
}

function padEnd(str, n, val) {
	if (str.length < n) {
		str = str.padEnd(n, val)
	}
	return str
}

function padStart(str, n, val) {
	if (str.length < n) {
		str = str.padStart(n, val)
	}
	return str
}

function pad(str, n, val = ' ') {
	let len = str.length;
	if (len < n) {
		str = str.padStart(Math.floor((n - len) / 2) + len, val)
		str = str.padEnd(n, val);
	}
	return str
}

function lowerFirst(str) {
	return str.replace(/\w/, e => e.toLowerCase());
}

function upperCase(str) {
	let list = str.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
	list = list.map(e => e.toUpperCase()).join(' ');
	return list
}

function lowerCase(str) {
	let list = str.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
	list = list.map(e => e.toLowerCase()).join(' ');
	return list
}

function kebabCase(str) {
	let list = str.match(/[A-Z][a-z]+|[A-Z]+|[a-z]+/g);
	list = list.map(e => e.toLowerCase()).join('-');
	return list
}

function escape(str) {
	let reg = /[&<>"']/g
	let map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}
	return str.replace(reg, e => map[e])
}

function endsWith(str, val, n = str.length) {
	return str[n - 1] == val
}

function capitalize(str) {
	return upperFirst(str.toLowerCase())
}

function camelCase(val) {
	let reg = /[^a-z]*([a-z])([a-z]*)[^a-z]*/gi
	let first = true;
	return val.replace(reg, (n0, n1, n2) => {
		if (first) {
			first = false;
			return n1.toLowerCase() + n2.toLowerCase()
		}
		return n1.toUpperCase() + n2.toLowerCase()
	})
}

function values(obj) {
	return Object.values(obj)
}

function pick(obj, path) {
	let result = {};
	path = getPath(path);
	path.forEach(e => result[e] = obj[e]);
	return result
}

function omit(obj, path) {
	path = getPath(path);
	path.forEach(e => delete obj[e])
	return obj
}

function assign(obj, ...srs) {
	return Object.assign(obj, ...srs)
}

function keys(obj) {
	return Object.keys(obj)
}

function invert(obj) {
	let ens = Object.entries(obj);
	ens = ens.map(([key, val]) => [val, key]);

	return Object.fromEntries(ens)
}

function hasIn(obj, path) {
	let l = obj;
	path = getPath(path);
	for (const e of path) {
		if (e in l) {
			l = l[e]
		} else {
			return false
		}
	}

	return true
}

function has(obj, path) {
	let l = obj;
	path = getPath(path);
	for (const e of path) {
		if (l.hasOwnProperty(e)) {
			l = l[e]
		} else {
			return false
		}
	}

	return true
}

function set(obj, path, val) {
	let l = obj;
	path = getPath(path);
	for (var i = 0; i < path.length - 1; i++) {
		const e = path[i];
		const next_e = path[i + 1]
		if (e in l) {
			l = l[e]
		} else {
			l[e] = next_e == +next_e ? [] : {};
			l = l[e];
		}
	}

	l[path[i]] = val;
	return obj;
}

function get(obj, path, def) {
	let result = obj;
	path = getPath(path);
	if (path.length == 1) {
		return obj[path[0]]
	}
	for (const i of path) {
		if (i in result) {
			result = result[i]
		} else {
			return def
		}
	}

	return result === undefined ? def : result
}

function defaults(...objs) {
	objs.reverse();
	return Object.assign({}, ...objs)
}

function at(obj, ...path) {
	let result = [];
	[].concat(...path).forEach(e => result.push(get(obj, e)))

	return result
}

function sum(ary) {
	return ary.reduce((p, e) => p + e)
}

function subtract(val, other) {
	return val - other
}

function round(val, n = 0) {
	if (n > 0) {
		return Math.round(val * 10 ** n) / 10 ** n;
	} else if (n < 0) {
		return Math.round(val / 10 ** (-n)) * 10 ** (-n);
	} else {
		return Math.round(val)
	}
}

function multiply(val, other) {
	return val * other
}

function min(ary) {
	if (!ary.length) {
		return undefined
	}
	return ary.reduce((p, e) => p > e ? e : p)
}

function mean(ary) {
	return ary.reduce((p, e) => p + e) / ary.length
}

function max(ary) {
	if (!ary.length) {
		return undefined
	}
	return ary.reduce((p, e) => p > e ? p : e)
}

function floor(val, n = 0) {
	if (n > 0) {
		return Math.floor(val * 10 ** n) / 10 ** n;
	} else if (n < 0) {
		return Math.floor(val / 10 ** (-n)) * 10 ** (-n);
	} else {
		return Math.floor(val)
	}
}

function divide(val, other) {
	return val / other
}

function ceil(val, n = 0) {
	return Math.ceil(val * 10 ** n) / 10 ** n;
}

function add(val, other) {
	return val + other
}

function lte(val, other) {
	return eq(val, other) || lt(val, other)
}

function lt(val, other) {
	return val < other
}

function gte(val, other) {
	return eq(val, other) || gt(val, other)
}

function gt(val, other) {
	return val > other
}

function eq(val, other) {
	if (Number.isNaN(val) && Number.isNaN(other)) {
		return true
	} else {
		return val === other
	}
}

function size(col) {
	return Object.keys(col).length
}

function shuffle(col) {
	let result = Object.values(col);

	for (let i = col.length - 1; i >= 0; i--) {
		let r = Math.random() * (i + 1) | 0;
		[result[r], result[i]] = [result[i], result[r]];
	}

	return result
}

function sampleSize(col, n = 1) {
	n = n > col.length ? col.length : n;
	let keys = Object.keys(col);
	let result = [];
	for (let i = 0; i < n; i++) {
		let key = keys[Math.random() * keys.length | 0]
		result.push(col[key])
	}

	return result
}

function sample(col) {
	let keys = Object.keys(col);
	return col[keys[Math.random() * keys.length | 0]]
}

function includes(col, val, from = 0) {
	from = from < 0 ? col.length + from : from;
	if (typeof col == 'string') {
		return col.includes(val, from)
	} else {
		vals = Object.values(col)
		if (vals.indexOf(val, from) > -1) {
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
		if (k == undefined) {
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
	return difference(ary, val)
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

function sortedIndex(ary, target) {
	let start = 0;
	let end = ary.length - 1;
	let mid

	while (start <= end) {
		mid = parseInt(start + (end - start) / 2);
		if (target <= ary[mid]) {
			end = mid - 1
		} else if (target > ary[mid]) {
			start = mid + 1
		}
	}

	return mid
}

function slice(ary, start = 0, end) {
	let len = ary == null ? 0 : ary.length;
	if (!len) {
		return []
	}

	if (start < 0) {
		start = -start > len ? 0 : (len + start);
	}
	if (end < 0) {
		end = -end > len ? 0 : (len + end)
	} else {
		end = end < len ? end : (len - 1)
	}

	len = start > end ? 0 : Math.floor((end - start + 1));
	let result = [];
	let i = -1;
	while (++i < len) {
		result[i] = ary[i + start]
	}

	return result
}

function reverse(ary) {
	return ary.reverse()
}

function remove(ary, fn = e => e) {
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

function flattenDeep(ary) {
	// ====循环====
	// let result = ary.flat();
	// do {
	// 	result = result.flat()
	// } while (result.some(e => Array.isArray(e)));
	// return result

	//====递归1====
	// if (Array.isArray(ary)) {
	// 	return ary.flatMap(e => {
	// 		if(Array.isArray(e)) {
	// 			return flattenDeep(e)
	// 		} else {
	// 			return e
	// 		}
	// 	})
	// } else {
	// 	return ary
	// }

	//====递归2====
	if (Array.isArray(ary)) {
		let result = [];
		for (let e of ary) {
			if (Array.isArray(e)) {
				result.push(...flattenDeep(e))
			} else {
				result.push(e)
			}
		}
		return result
	} else {
		return ary
	}
}

function flatten(ary) {
	// return [].concat(...ary)
	return Array.isArray(ary) ? ary.flat() : ary
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


/**
 * 
 * @param {Array|String} path 
 * @returns {Array} pathArray
 */
function getPath(path) {
	if (Array.isArray(path)) {
		return path
	} else {
		let reg = /\b\w+\b/g
		return path.match(reg)
	}
}

function getFn(a) {
	if (typeof a == 'function') {
		return a
	} else {
		return function (obj) { return get(obj, a) }
	}
}

function getIte(val) {
	let ite = val => e => keys(val).every(ee => val[ee] == e[ee]);
	let type = Object.prototype.toString.call(val);

	switch (type) {
		case '[object Function]':
			return val;
		case '[object Object]':
			return ite(val);
		case '[object Array]':
			return ite(Object.fromEntries([val]))
		case '[object String]':
			let obj = {};
			obj[val] = true;
			return ite(obj)
	}

}