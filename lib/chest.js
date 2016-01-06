OpenChest = function (items) {
	this.items = items;
	this.random = 0;

	this.open = function () {
		this.random = Math.random();
		for (var i = 0; i < this.items.length; i++) {
			if (random < this.items[i].weight) {
				return this.items[i];
			}
		}
	}

	this.prepareWeight = function () {
		var temp = [];
		this.items.forEach(function (item, i) {
			item.weight = item.weight / 100;
			if (i > 0) {
				item.weight = item.weight + temp[i-1].weight;
			}
				temp.push(item);
		});
	}

	this.shuffleWeight = function () {
		for (var i = this.items.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = this.items[i];
			this.items[i] = this.items[j];
			this.items[j] = temp;
		}
	}

	this.shuffleWeight();
	this.prepareWeight();

	return this.open();
}