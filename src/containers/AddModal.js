import axios from 'axios'
import { compose, withState, withHandlers } from 'recompose'

// Components
import AddModal from 'components/chests/AddModal'

// Helpers
import getApiUrl from 'helpers/getApiUrl'

const currentUrl = getApiUrl()

export default compose(
	withState('modalOpen', 'setModalOpen', false),
	withState('message', 'setMessage', ''),
	withHandlers({
		addChest: () => e => {
			e.preventDefault()
			const url = e.target.url.value
			const rgxp = /pwdatabase.com\/br\/quest\/[0-9]{5}$/
			if (rgxp.test(url)) {
				const id = url.match(/([0-9]{5})$/)[0]
				axios(`${currentUrl}/add-chest/${id}`)
					.then(res => {
						alert('Adicionado com sucesso!')
						window.location.reload()
					})
			}
		}
	})
)(AddModal)
