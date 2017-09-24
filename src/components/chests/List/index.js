import GoogleAds from 'react-google-ads'

// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './List.styl'

const List = ({ chests }) => (
	<section className="chest-list">
		<Wrapper>
			<GoogleAds
				client="ca-pub-9211196233969408"
				slot="8764876118"
				format="auto"
				style={{ marginBottom: 30, display: 'block' }}
			/>
			<ul className="chest-list__chests">
				{chests.map(({ name, id, image }) => (
					<a href={`/chest/${id}`} key={id}>
						<li className="chest-list__item">
							<img
								src={image}
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
