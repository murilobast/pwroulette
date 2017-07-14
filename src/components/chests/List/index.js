// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './List.styl'

const List = ({ chests }) => (
	<section className="chest-list">
		<Wrapper>
			<ul className="chest-list__chests">
				{chests.map(({ name, id }) => (
					<a href={`/chest/${id}`} key={id}>
						<li className="chest-list__item">
							<img
								src={`http://www.pwdatabase.com/images/icons/generalm/${id}.png`}
								className="chest-list__image"
								alt={name}
							/>
							<h3 className="chest-list__name">
								{name}
							</h3>
						</li>
					</a>
				))}
			</ul>
		</Wrapper>
	</section>
)

export default List
