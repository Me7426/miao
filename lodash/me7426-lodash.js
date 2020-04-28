var me7426 = {
	isNull: function (val) {
		return val === null
	},

	chunk: function (ary, size) {
		let result = [];
		times = Math.floor(ary.length / size);

		for (let i = 0; i < ary.length; i+=3) {
			result.push(ary.slice(i, i + 3))
		}

		return result;
	},
}
