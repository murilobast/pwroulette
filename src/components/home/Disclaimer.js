// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './Disclaimer.styl'

const Disclaimer = () => (
	<section className="disclaimer">
		<Wrapper>
			<h1 className="disclaimer__title">
				Bem vindo ao PW Simulator!
			</h1>
			<p className="disclaimer__text">
				Olá cidadões de Pan Gu!<br/>
				Estamos passando por uma reformulação, e muita coisa boa está por vir!<br/>
				Por enquanto, resolvemos desativar alguns recursos para que possamos melhora-los e seguir em frente.<br/>
				<ul>
					<li>
						<b>Geral</b>: O visual e base (código) do site está passando por uma grande mudança. Estamos focando em performance e tamanho (kbs) para que você consiga utilizar em seu smartphone sem nenhum problema.
					</li>
					<li>
						<b>Reforja</b>: Como muitos haviam percebido, o sistema de reforma não funciona como deveria, por isso desativamos e vamos corrigir e melhorar a forma como a ferramenta funciona.<br/>
					</li>
					<li>
						<b>Baús</b>: Nossa principal ferramenta, simualdor de baus, está passando por algumas melhorias tambem. Ela está funcionando, porem com recursos limitados.
					</li>
					<li>
						<b>Refino</b>: Após os itens acima, vamos implementar um simulador de refino de items robusto e simples de ser utilizado.
					</li>
				</ul>
				<br/>
				Por enquanto é isso. <br/>
				Qualquer dúvida, entrem em contato pelo email: iam@murilobastos.com<br/>
				Abraço!
			</p>
		</Wrapper>
	</section>
)

export default Disclaimer
