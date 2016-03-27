Meteor.startup(function () {
	if (Meteor.isClient) {
		return SEO.config({
			title: 'PW Simulator',
			meta: {
				'description': 'PW Simulator é uma ferramente para simular Drops de Báus e Reforja de Equipamentos em Perfect World'
			},
			meta: {
				'google-site-verification': 'xK1TMl_QbLUOrMU0oqXYNZZrNjUBpLgF8Nl07Qh1QV4'
			},
			og: {
				'site_name': 'PW Simulator' 
			},
			og: {
				'title': 'PW Simulator' 
			},
			og: {
				'image': 'launcher-icon-0-75x.png' 
			},
			og: {
				'type': 'website' 
			},
			og: {
				'locale': 'pt_br' 
			}
		});
	}
});