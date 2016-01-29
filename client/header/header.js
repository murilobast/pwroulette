Template.header.events({
	'click #menu': function (e, t) {
		var $sideBar = $('#side');
		$sideBar.toggleClass('isOpen');
	},

	'click .header__menu': function (e, t) {
		var target = e.target;
		if (target.id === 'mask' || target.tagName === 'A') {
			$('#side').removeClass('isOpen');
		}
	}
});

Template.header.helpers({
	isActive: function (name) {
		if (Router.current()) {
			var curLocation = Router.current().route.getName();
			if (curLocation === name) {
				return 'active';
			}
		}
	}
});