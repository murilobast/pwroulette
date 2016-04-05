import {composeWithTracker} from 'react-komposer';
import ChestsWrapper from '/client/components/chests/ChestsWrapper.jsx';

ChestsSubs = new SubsManager();

function composer(props, onData) {
	const handle = ChestsSubs.subscribe('chests');
	
	if (handle.ready()) {
		const chests = Chests.find({}).fetch();
		onData(null, {chests});
	}
}

export default composeWithTracker(composer)(ChestsWrapper);