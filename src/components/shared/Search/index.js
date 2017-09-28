import classNames from 'classnames'

// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './Search.styl'

const Search = ({ fixed, filter, label }) => (
	<section className={classNames(
		'search',
		{ 'is--fixed': fixed }
	)}>
		<Wrapper>
			<label className="search__title">
				{label}
			</label>
			<input
				type="text"
				placeholder="Buscar..."
				className="search__input"
				onKeyUp={(e) => filter(e.target.value)}
			/>
		</Wrapper>
	</section>
)

export default Search
