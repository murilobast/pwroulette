getInterval = 0;

Template.registerHelper('currURL', function () {
	let location = window.location;
	return location.protocol + '//' + location.hostname + ':8181';
});

Template.body.events({
	'click .modal-mask': function () {
		$('.modal-window, .modal-mask').removeClass('show');
	},

	'mouseover .floating': function (e, t) {
		getItemFullInfo(this.id, this.avatar);
		let $target = $(e.currentTarget);
		let $curTarget = $target.find('.floating__text').addClass('show');
		let $window = $(window);
		let windowWidth = $window.width() - $curTarget.width();
		let windowHeight = $window.height() - $curTarget.height();
		let $img = $curTarget.find('img');

		if ($img.length > 0) {
			let src = $img.data('avatar');

			$img.attr('src', src);

			$img[0].onload = function () {
				$img[0].removeAttribute('data-avatar');
			}
		}

		$(document).mousemove(function (e) {
			let _left = e.pageX + 20;
			let left = (_left > windowWidth) ? windowWidth : _left;
			let _top = $target.offset().top - $window.scrollTop() + 50;
			let top = (_top > windowHeight) ? windowHeight - 20 : _top;

			$curTarget.css({
				position: 'fixed',
				left: left,
				top: top
			});
		});
	},

	'mouseout .floating': function (e, t) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}
});

function getItemFullInfo(id, avatar = false) {
	let itemInfo = {
		id: id,
		avatar: avatar
	};

	if (getInterval)
		clearInterval(getInterval);
	if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {
		let url = 'http://www.pwdatabase.com/br/items/' + id;
		getInterval = setInterval(function () {
			$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", function (data) {
				let $content = $(data.contents);
				let $infos = $content.find('.iteminfo > span');
				let textArray = [];
				$infos.each(function (i, info) {
					let color = $(info).css('color');
					if (color === 'rgb(255, 203, 74)' || color === 'rgb(0, 255, 255)' || color === 'rgb(255, 0, 238)' || color === 'rgb(128, 128, 128)') {
						if (color === 'rgb(0, 255, 255)' || color === 'rgb(128, 128, 128)') {
							if (textArray.length > 0) {
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
					itemInfo['infos'] = textArray;
					if (avatar) {
						itemInfo['type'] =  $($content.find('.iteminfo a')[1]).text();
						$addons = $content.find('#i_right p');
						$addons.each(function (i, addon) {

						});
					}
				});

				if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {

					clearInterval(getInterval);
					ItemInfo.insert(itemInfo, function (err, data) {
					});
				}
			});
		}, 1000);
	}

}