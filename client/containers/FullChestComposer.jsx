import {composeWithTracker} from 'react-komposer';
import FullChest from '/client/components/chests/FullChest.jsx';

FullChestSub = new SubsManager();

function composer(props, onData) {
	let id = ~~props.chestId;
	const handle = FullChestSub.subscribe('fullChest', id);

	if (handle.ready()) {
		const chest = Chests.findOne({id: id})
		onData(null, {chest});
	}
}

export default composeWithTracker(composer)(FullChest);