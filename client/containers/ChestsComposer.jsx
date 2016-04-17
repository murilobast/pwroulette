import {composeWithTracker} from 'react-komposer';
import ChestsWrapper from '/client/components/chests/ChestsWrapper.jsx';

ChestsSubs = new SubsManager();

function composer(props, onData) {
	const handleChests = ChestsSubs.subscribe('chests');
	const handleInfos = ChestsSubs.subscribe('itemInfo');
	
	if (handleChests.ready() && handleInfos.ready()) {
		const chests = Chests.find({}, {sort: {name: 1}}).fetch();
		const featured = Chests.find({}, {sort: {count: -1}, limit: 8}).fetch();
		onData(null, {chests, featured});
	}
}

export default composeWithTracker(composer)(ChestsWrapper);