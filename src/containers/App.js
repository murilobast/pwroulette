// Components
import Header from 'containers/Header'
import Footer from 'components/shared/Footer'

// Stylus
import 'styles/main.styl'

const App = ({ children }) => (
	<main>
		<Header />
		{children}
		<Footer />
	</main>
)

export default App
