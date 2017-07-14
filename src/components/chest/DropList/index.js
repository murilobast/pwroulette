// Styles
import './DropList.styl'

const DropList = ({ items }) => (
	<section className="drops">
		<h3 className="drops__title">
			Olha o que tem dentro:
		</h3>
		<ul className="drops__list">
			{items.map(({ id, name, amount, weight }) => (
				<li className="drops__item" key={`drp${id}`}>
					<img
						className="drops__icon"
						src={`http://www.pwdatabase.com/images/icons/generalm/${id}.png`}
						alt={name}
					/>
					<div className="drops__info">
						<p>{name} {amount > 1 && `(${amount})`}</p>
						<p>{weight}% de chance</p>
					</div>
				</li>
			))}
		</ul>
	</section>
)

export default DropList
