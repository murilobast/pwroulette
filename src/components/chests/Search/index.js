// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './Search.styl'

const Search = ({ filterChests }) => (
	<section className="search">
		<Wrapper>
			<label className="search__title">
				Selecione um baú
			</label>
			<input
				type="text"
				placeholder="Buscar..."
				className="search__input"
				onKeyUp={(e) => filterChests(e.target.value)}
			/>
		</Wrapper>
	</section>
)

export default Search
