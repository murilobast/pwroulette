Rouletter = function (addons, type) {
	if (typeof addons === 'undefined') {
		return [];
	}

	this.randomAdd = function (val) {
		var min = parseInt(val[1]);
		var max = parseInt(val[2]);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.roulette = function (addons) {
		var self = this;
		var random = Math.random();
		for (var i = 0; i < addons.length; i++) {
			if (random < addons[i].weight) {
				var name = addons[i].name;
				if (this.reg.test(name)) {
					var match = name.match(this.reg);
					name = name.replace(this.reg, self.randomAdd(match));
				}
				return name;
			}
		}
	}

	this.prepareWeight = function (addons) {
		var newAddons = [];
		addons.forEach(function (val, i) {
			val.weight = val.weight / 100;
			if (i !== 0) {
				val.weight = val.weight + newAddons[i-1].weight;
			}
			newAddons.push(val);
		});
		return newAddons;
	}

	this.shuffleWeight = function (array) {
			for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
			}
			return array;
	}

	this.attrs = [];
	this.reg = new RegExp('([0-9]+)?~([0-9]+)');
	this.unique = this.prepareWeight(this.shuffleWeight(addons.unique));
	this.extra = this.prepareWeight(this.shuffleWeight(addons.extra));
	this.amount = addons.amount || 3;

	if (type) {
		this.attrs[0] = this.roulette(this.unique);
		for (var i = 1; i < this.amount; i++) {
			this.attrs[i] = this.roulette(this.extra);
		}
	} else {
		for (var i = 0; i < this.amount; i++) {
			this.attrs[i] = this.roulette(this.extra);
		}
	}

	return this.attrs;
}