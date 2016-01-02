Template.body.events({
	'mouseover .floating': function (e, t) {
		console.log('obj');
		var $target = $(e.currentTarget);
		$target.find('.floating__text').addClass('show');
	},

	'mouseout .floating': function (e, t) {
		var $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}
})