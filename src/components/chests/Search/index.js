// Styles
import './Search.styl'

const Search = ({ filterChests }) => (
	<section className="search">
		<label className="search__title">
			Selecione um baú
		</label>
		<input
			type="text"
			className="search__input"
			onKeyUp={(e) => filterChests(e.target.value)}
		/>
	</section>
)

export default Search