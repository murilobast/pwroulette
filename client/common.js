getInterval = 0;

Template.registerHelper('currURL', function () {
	let location = window.location;
	return location.protocol + '//' + location.hostname + ':8181';
});

Template.body.events({
	'mouseover .floating': function (e, t) {
		getItemFullInfo(this.id);
		let $target = $(e.currentTarget);
		$target.find('.floating__text').addClass('show');
	},

	'mouseout .floating': function (e, t) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}
});

function getItemFullInfo(id) {
	if (getInterval)
		clearInterval(getInterval);
	if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {
		let url = 'http://www.pwdatabase.com/br/items/' + id;
		getInterval = setInterval(function () {
			$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", function (data) {
				let $content = $(data.contents);
				let $infos = $content.find('.iteminfo span');
				let textArray = [];

				$infos.splice(10, $infos.length - 10);
				$infos.each(function (i, info) {
					let color = $(info).css('color');
					if (color === 'rgb(255, 203, 74)' || color === 'rgb(0, 255, 255)' || color === 'rgb(255, 0, 238)') {
						if (color === 'rgb(0, 255, 255)') {
							if (textArray.length > 1) {
								$(info).text('<br>' + $(info).text() + '<br>');
							} else {
								$(info).text($(info).text() + '<br>');
							}
						}
						textArray.push({
							color: color,
							text: $(info).text()
						});
					}
				});

				if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {
					let itemInfo = {
						regular: true,
						id: id,
						infos: textArray
					}

					ItemInfo.insert(itemInfo, function (err, data) {
						console.log(textArray, err);
						clearInterval(getInterval);
					});
				}
			});
		}, 1000);
	}

}