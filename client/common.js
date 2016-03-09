Template.registerHelper('currURL', function () {
	let location = window.location;
	return location.protocol + '//' + location.hostname + ':8181';
});

Template.body.events({
	'mouseover .floating': function (e, t) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').addClass('show');
	},

	'mouseout .floating': function (e, t) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}
});