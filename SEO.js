Meteor.startup(function () {
	if (Meteor.isClient) {
		return SEO.config({
			title: 'PW Simulator',
			meta: {
				'description': 'PW Simulator é uma ferramente para simular Drops de Báus e Reforja de Equipamentos em Perfect World'
			},
			og: {
				'site_name': 'PW Simulator',
				'title': 'PW Simulator',
				image: '/launcher-icon-0-75x.png'
			}
		});
	}
});