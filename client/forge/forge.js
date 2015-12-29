Session.setDefault('attrs', Forge.fillAdds());
Template.forge.helpers({
	getAttrs: function () {
		return Session.get('attrs');
	}
});

Template.forgeForm.events({
	'submit #roulette': function (e, t) {
		e.preventDefault();
		Session.set('attrs', Forge.fillAdds());
	}
})