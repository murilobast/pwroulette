import {composeWithTracker} from 'react-komposer';
import FullChest from '/client/components/chests/FullChest.jsx';

FullChestSub = new SubsManager();

function composer(props, onData) {
	let id = ~~props.chestId;
	const handleChest = FullChestSub.subscribe('fullChest', id);
	const handleInfos = ChestsSubs.subscribe('itemInfo');

	if (handleChest.ready() && handleInfos.ready()) {
		const chest = Chests.findOne({id: id})
		onData(null, {chest});
	}
}

export default composeWithTracker(composer)(FullChest);