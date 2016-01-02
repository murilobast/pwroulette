Rouletter = function (addons) {
	if (typeof addons === 'undefined') {
		return [];
	}

	this.randomAdd = function () {
		return 18 + Math.floor(Math.random() * 2);
	}

	this.roulette = function (addons) {
		var self = this;
		var random = Math.random();
		for (var i = 0; i < addons.length; i++) {
			if (random < addons[i].weight) {
				var name = addons[i].name;
				if (this.reg.test(name)) {
					name = name.replace(this.reg, self.randomAdd());
				}
				var attr = name;
				break;
			}
		}
		return attr;
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

	this.attrs = [];
	this.modif = [];
	this.reg = new RegExp('<RANDOM>');
	
	this.unique = this.prepareWeight(addons.unique);
	this.extra = this.prepareWeight(addons.extra);
	this.amount = addons.amount || 3;

	this.attrs[0] = this.roulette(this.unique);

	for (var i = 1; i < this.amount; i++) {
		this.attrs[i] = this.roulette(this.extra);
	}

	return this.attrs;
}