var me7426 = {
	isNull: function (val) {
		return val === null
	},

	chunk: function (ary, size) {
		let result = [];

		for (let i = 0; i < ary.length; i += size) {
			result.push(ary.slice(i, i + size))
		}

		return result;
	},
}
