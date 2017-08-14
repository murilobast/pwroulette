import { Link } from 'react-router'

// Components
import Button from 'components/shared/Button'

// Styles
import './Bag.styl'

const Bag = ({
	id,
	name,
	items,
	amount,
	opened,
	openChest,
	stopOpening,
	updateAmount,
	resetChests
}) => (
	<section className="bag">
		<div className="bag__header">
			<img
				src={`http://www.pwdatabase.com/images/icons/generalm/${id}.png`}
				alt={name}
				className="bag__image"
			/>
			<h1 className="bag__title">
				{name}({opened})
			</h1>
			<Link
				className="bag__back"
				to="/chests/"
			>
				<Button
					text="Voltar"
					action={() => {}}
				/>
			</Link>
		</div>
		<ul className="bag__items">
			{items.map(({ id, name, total }) => (
				<li
					title={name}
					className="bag__item"
					key={id}
				>
					<img
						alt={name}
						title={name}
						className="bag__icon"
						src={`http://www.pwdatabase.com/images/icons/generalm/${id}.png`}
					/>
					<span className="bag__total">
						{total}
					</span>
				</li>
			))}
		</ul>
		<div className="bag__tools">
			<Button
				text="Abrir"
				action={openChest}
			/>
			<input
				className="bag__amount"
				value={amount}
				title="0 = infinito"
				type="number"
				min="0"
				max="1000"
				step="1"
				pattern="\d*"
				onChange={updateAmount}
			/>
			<Button
				text="Parar"
				action={stopOpening}
			/>
			<Button
				text="Limpar"
				action={resetChests}
			/>
		</div>
	</section>
)

export default Bag
