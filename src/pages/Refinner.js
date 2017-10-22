// Components
import Wrapper from 'components/shared/Wrapper'
import RefinningWindow from 'components/refinner/RefinningWindow'

const Refinner = ({ stones }) => (
	<Wrapper>
		<RefinningWindow stone={stones[0]} />
	</Wrapper>
)

export default Refinner
