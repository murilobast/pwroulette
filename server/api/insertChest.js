const fetch = require('node-fetch')
const cheerio = require('cheerio')
const pmongo = require('promised-mongo')

const URL_BASE = 'http://www.pwdatabase.com'
const CHEST_URL = `${URL_BASE}/br/items/`
const DROPS_URL = `${URL_BASE}/br/quest/`
const DB_URL = 'mongodb://pwsimulator.com:27017/pws'

const { chests } = pmongo(DB_URL, ['chests'])
const chestStructure = {
	name: '',
	count: 0,
	url: '',
	description: '',
	items: [],
	avatar: false
}

const itemRegexp  = /(?:\s-\s([0-9]+)\s)?\(([0-9]+\.?[0-9]*)%\)/;

const getItems = $items => $items
	.toArray()
	.map(item => {
		const $ = cheerio.load(item)
		const name = $('a').last().text()
		const href = $('a').attr('href')
		const image = `${URL_BASE}${$('a').find('img').attr('src')}`
		const id = Number(href.replace('items/', ''))
		$('a').remove()
		const matches = $.text().match(itemRegexp)
		const amount = Number(matches[1]) || 1
		const weight = Number(matches[2])
		return { id, name, weight, amount, image }
	})

const getNameAndDrops = body => {
	const $ = cheerio.load(body)
	const $content = $('#content table').first().find('tbody tr')
	const name = $content.find('span').first().text()
	const $columns = $content.last().find('td')
	const $elements = $columns.first().find('p')
	const $filtered = $elements
		.filter((i, elment) => !!$(elment).find('a').length)
	const items = getItems($filtered)
	const itemId = Number(
		$columns.last()
			.find('p a')
			.attr('href')
			.replace('items/', '')
	)
	return { itemId, name, items }
}

const getAditionalInformation = async id => {
	const url = `${CHEST_URL}${id}`
	const response = await fetch(url)
	if (response.status === 200) {
		const body = await response.text()
		const $ = cheerio.load(body)
		const $content = $('#content table tbody tr')
			.last()
		const image = `${URL_BASE}${$content.find('img').attr('src')}`
		const $descriptionBlock = $content
			.find('.iteminfo span')
		$descriptionBlock.find('br').replaceWith(' ')
		const description = $descriptionBlock.text()
		return { image, description }
	}
	return {}
}

const insertChest = async (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	const { id: _id } = req.params
	const id = Number(_id)
	const exists = await chests.find({ id })
	if (exists) {
		res.send({
			error: false,
			message: 'Chest exists!',
			chest: exists
		})
		return
	}
	const url = `${DROPS_URL}${id}`
	const response = await fetch(url)
	if (response.status === 200) {
		const body = await response.text()
		const nameAndDrops = getNameAndDrops(body)
		const adtionalInformation = await getAditionalInformation(nameAndDrops.itemId)
		const chest = Object.assign(
			chestStructure,
			nameAndDrops,
			adtionalInformation,
			{ url, id: Number(id) }
		)
		await chests.insert(chest)
		res.send({
			error: false,
			message: 'Chest inserted!',
			chest
		})

		return
	}
	res.send({
		error: true,
		message: 'Unexpected error'
	})
}

module.exports = insertChest
