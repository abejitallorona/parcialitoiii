import { Actions, Screens } from '../types/store';
import { getEvents } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getEventsAction = async () => {
	const products = await getEvents();
	return {
		action: Actions.GETEVENTS,
		payload: products,
	};
};


