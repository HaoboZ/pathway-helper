import { RESET } from '../../redux/reducers';
import { SETTRANSCRIPT } from './actions';


export interface GlobalState {
	transcript: {
		name: string
		major: string
		courses: {
			coursePrefix: string
			courseNum: string
			courseTitle: string
			completed: boolean
		}[]
	}
}

const initState: GlobalState = {
	transcript: null
};

export const GlobalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case RESET:
		return initState;
	case SETTRANSCRIPT:
		return { ...state, transcript: action.transcript };
	}
	return state;
};
