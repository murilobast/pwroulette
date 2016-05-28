import {composeWithTracker} from 'react-komposer';
import ForgeWrapper from '/client/components/forge/ForgeWrapper.jsx';

ChestsSubs = new SubsManager();

function composer(props, onData) {
	const handleItems = ChestsSubs.subscribe('items');
	const handleAddons = ChestsSubs.subscribe('addons');
	
	if (handleItems.ready() && handleAddons.ready()) {
		const items = Items.find({}, {sort: {id: 1}}).fetch();
		onData(null, {items});
	}
}

export default composeWithTracker(composer)(ForgeWrapper);