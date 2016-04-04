import {composeWithTracker} from 'react-komposer';
import Chests from '/client/components/Chests.jsx';

function composer(props, onData) {
	const handle = Meteor.subscribe('chests');
	
	if (handle.ready()) {
		const chests = Chests.find({}).fetch();
		onData(null, {chests});
	}
}

export default composeWithTracker(composer)(Chests);