const insertZero = num => num < 10 ? '0' + num : num.toString()

const parseDate = dateString => {
	const date = new Date(dateString)
	const day = insertZero(date.getDate())
	const month = insertZero(date.getMonth() + 1)
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}


export default parseDate
