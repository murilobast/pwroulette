import {composeWithTracker} from 'react-komposer';
import ForgeWrapper from '/client/components/forge/ForgeWrapper.jsx';
import items from './items.js';

ChestsSubs = new SubsManager();

function composer(props, onData) {
	const handleAddons = ChestsSubs.subscribe('addons');
	
	if (handleAddons.ready()) {
		onData(null, {items});
	}
}

export default composeWithTracker(composer)(ForgeWrapper);