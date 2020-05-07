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
	truncate,
	parseJson:function (){window.scrollTo(0,document.body.scrollHeight);},
}

function truncate(str, opt) {
	def = {
		len: 30,
		val: '...',
		reg: '/./'
	}
	opt = Object.assign(def, opt);
	opt.reg = String(opt.reg);
	opt.reg = RegExp(opt.reg.slice(1, -1) + '$');
	str = str.slice(0, def.len);
	// str = str.slice(0, str.search(opt.reg)) + opt.val;
	str = str.replace(opt.reg, opt.val)
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
	if(str.length < n) {
		str = str.padEnd(n, val)
	}
	return str
}

function padStart(str, n, val) {
	if(str.length < n) {
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
	return  str[n - 1] == val
}

function capitalize(str) {
	return str.replace(/(\w)(\w*)/, (n0, n1, n2) => {
		return n1.toUpperCase() + n2.toLowerCase();
	})
}

function camelCase(val) {
	let reg = /[^a-z]*([a-z])([a-z]*)[^a-z]*/gi
	let first = true;
	return val.replace(reg, (n0, n1, n2) => {
		if(first) {
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
	for (const i of path) {
		if (i in result) {
			result = result[i]
		} else {
			return def
		}
	}

	return result === undefined ? def : result
}

function defaults(obj, ...others) {
	let objs = [].concat(obj, ...others);
	let kvs = [];
	objs.forEach(e => kvs.unshift(...Object.entries(e)));
	return Object.fromEntries(kvs)
}

function at(obj, ...path) {
	let result = [];
	[].concat(...path).forEach(e => result.push(eval('obj.' + e)))

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
	if (n > 0) {
		return Math.ceil(val * 10 ** n) / 10 ** n;
	} else if (n < 0) {
		return Math.ceil(val / 10 ** (-n)) * 10 ** (-n);
	} else {
		return Math.ceil(val)
	}
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

function sortedIndex(ary, val) {
	let len = ary == null ? 0 : ary.length;
	if (len == 0 || ary[0] > val) {
		return 0
	} else if (ary[len - 1] < val) {
		return len - 1
	}

	let l = 0;
	let m = (len - 1) / 2 | 0;
	let r = len - 1;
	do {
		if (ary[m] < val) {
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
	if(typeof a == 'function') {
		return a
	} else {
		return function (n) {return n[a]}
	}
}