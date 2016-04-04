import {composeWithTracker} from 'react-komposer';
import Home from '/client/containers/Home.jsx';

function composer(props, onData) {
	const handle = Meteor.subscribe('changelogs');
	if (handle.ready()) {
		console.log(handle);
		const changelogs = Changelogs.find({}, {sort: {timestamp: 'desc'}}).fetch();
		onData(null, {changelogs});
	}
}

export default composeWithTracker(composer)(Home);