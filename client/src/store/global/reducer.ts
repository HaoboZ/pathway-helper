import { RESET } from '../../redux/reducers';
import { LOGOUT } from '../local/actions';
import { CREATESCHEDULE, SETTRANSCRIPT } from './actions';


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
	},
	schedules: {
		[ name: string ]: {
			major: string
			filter: string[]
			term1: string[]
			term2: string[]
			term3: string[]
			term4: string[]
		}
	}
}

const initState: GlobalState = {
	transcript: null,
	schedules:  {}
};

export const GlobalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case RESET:
	case LOGOUT:
		return initState;
	case SETTRANSCRIPT:
		return { ...state, transcript: action.transcript };
	case CREATESCHEDULE:
		if ( !action.name || action.name in state.schedules ) return state;
		
		const schedules = {
			...state.schedules,
			[ action.name ]: {
				major:  state.transcript.major,
				filter: [],
				term1:  [],
				term2:  [],
				term3:  [],
				term4:  []
			}
		};
		return { ...state, schedules };
	}
	return state;
};
