Rouletter = function (addons) {
	if (typeof addons === 'undefined') {
		return [];
	}

	this.attrs = [];
	this.modif = [];
	this.reg = new RegExp('<RANDOM>');

	this.mainName = addons.mainName;
	this.mainWeigth = addons.mainWeigth;
	
	this.extraName = addons.extraName;
	this.extraWeigth = addons.extraWeigth;

	this.randomAdd = function () {
		return 18 + Math.floor(Math.random() * 2);
	}

	this.roulette = function (weigth, name) {
		var self = this;
		var random = Math.random();
		for (var i = 0; i < weigth.length; i++) {
			if (random < weigth[i]) {
				var attr = name[i];
				if (this.reg.test(attr)) {
					attr = attr.replace(this.reg, self.randomAdd());
				}
				break;
			}
		}
		return attr;
	}

	this.attrs[0] = this.roulette(this.mainWeigth, this.mainName);

	for (var i = 1; i < 3; i++) {
		this.attrs[i] = this.roulette(this.extraWeigth, this.extraName);
	}

	return this.attrs;
}