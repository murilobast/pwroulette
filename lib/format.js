format = function (num) {
		var n = num.toString();
		var p = n.indexOf('.');
		return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
			return p < 0 || i < p ? ($0+'.') : $0;
		});
}