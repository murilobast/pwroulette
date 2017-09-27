import classNames from 'classnames'

// Styles
import './Window.styl'

const generateAnswers = ({ answer, answerNumber }) => {
	const answers = [
		{ name: '• Opção', highlight: false },
		{ name: '• Opção', highlight: false }
	]
	answers.splice(answerNumber - 1, 0, { name: `• ${answer}`, highlight: true })
	return answers.map((answer, i) => {
		return {
			...answer,
			name: answer.highlight ? answer.name : `${answer.name} ${i + 1}...`
		}
	})
}

const Window = ({ question, ...props }) => {
	const answers = generateAnswers(props)

	return (
		<section className="window">
			<span className="window__close" role="button" />
			<div className="window__content">
				<h3 className="window__title">
					{question}
				</h3>
			</div>
			<ul className="window__options">
				{answers.map(({ name, highlight }, i) => (
					<li
						key={i}
						className={classNames(
							'window__answer',
							{ 'is--highlight': highlight }
						)}
					>
						{name}
					</li>
				))}
			</ul>
			<h2 className="window__title">Resposta: {props.answer}</h2>
		</section>
	)
}

export default Window
