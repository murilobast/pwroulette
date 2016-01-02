OpenChest = function (chest) {
	this.names = [];
	this.weigth = [];
	this.amount = [];
	this.item = {};
	this.random = .0;

	this.open = function () {
		this.random = Math.random();
		for (var i = 0; i < this.weigth.length; i++) {
			if (random < this.weigth[i]) {
				this.item = {
					name: this.names[i],
					id: i,
					amount: this.amount[i]
				}
				break;
			}
		}
	}

	this.prepareWeigth = function (weigth) {
		var newWeigth = [];
		weigth.forEach(function (val, i) {
			var _val = val / 100;
			if (i === 0) {
				newWeigth.push(_val);
			} else {
				newWeigth.push(_val + newWeigth[i-1]);
			}
		});
		return newWeigth;
	}

	this.names = chest.names;
	this.amount = chest.amount;
	this.weigth = this.prepareWeigth(chest.chance);

	this.open();
	return this.item;
}