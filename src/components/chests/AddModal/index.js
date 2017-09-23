import classNames from 'classnames'

// Components
import Wrapper from  'components/shared/Wrapper'
import Button from 'components/shared/Button'

// Styles
import './AddModal.styl'

const AddModal = ({ setModalOpen, modalOpen, addChest }) => (
	<div
		className={classNames(
			'add-modal',
			{ 'is--open': modalOpen }
		)}
	>
		<Wrapper>
			<button
				className="add-modal__button"
				onClick={e => setModalOpen(true)}
			>+</button>
			<div className="add-modal__mask" />
			<div className="add-modal__modal">
				<div className="add-modal__content">
					<div className="add-modal__header">
						<h4 className="add-modal__title">
							Adicionar baú
						</h4>
						<button
							className="add-modal__close"
							onClick={e => setModalOpen(false)}
						>Fechar</button>
					</div>
					<form
						onSubmit={addChest}
						className="add-modal__form"
					>
						<label className="add-modal__label">
							URL do PWDB:
						</label>
						<input
							type="text"
							className="add-modal__input"
							name="url"
						/>
						<span className="add-modal__info">
							A URL deve ser da página de drops ex: http://www.pwdatabase.com/br/quest/35697
						</span>
						<Button
							text="Adicionar"
							action={() => {}}
						/>
					</form>
				</div>
			</div>
		</Wrapper>
	</div>
)


export default AddModal
