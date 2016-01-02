OpenChest = function (chest) {
	this.names = [];
	this.weigth = [];
	this.item = '';

	this.open = function (weigth, name, amount) {
		var random = Math.random();
		for (var i = 0; i < weigth.length; i++) {
			if (random < weigth[i]) {
				var item = {
					name: name[i],
					id: i,
					amount: amount[i]
				}
				return item;
			}
		}
	}

	this.prepareWeigth = function (weigth) {
		var newWeigth = [];
		weigth.forEach(function (val, i) {
			var _val = val/100;
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


	this.item = this.open(this.weigth, this.names, this.amount);
	return this.item;
}