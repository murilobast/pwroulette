import {composeWithTracker} from 'react-komposer';
import ChestsWrapper from '/client/components/chests/ChestsWrapper.jsx';

ChestsSubs = new SubsManager();

function composer(props, onData) {
	const handleChests = ChestsSubs.subscribe('chests');
	const handleInfos = ChestsSubs.subscribe('itemInfo');
	
	if (handleChests.ready() && handleInfos.ready()) {
		const chests = Chests.find().fetch();
		onData(null, {chests});
	}
}

export default composeWithTracker(composer)(ChestsWrapper);