import { RESET } from '../../redux/reducers';
import { LOGOUT } from '../local/actions';
import { CREATESCHEDULE, DELETESCHEDULE, SETTRANSCRIPT } from './actions';


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
			term1: {
				coursePrefix: string
				courseNum: string
				courseTitle: string
			}[]
			term2: {
				coursePrefix: string
				courseNum: string
				courseTitle: string
			}[]
			term3: {
				coursePrefix: string
				courseNum: string
				courseTitle: string
			}[]
			term4: {
				coursePrefix: string
				courseNum: string
				courseTitle: string
			}[]
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
	case CREATESCHEDULE: {
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
	case DELETESCHEDULE: {
		const schedules = { ...state.schedules };
		delete schedules[ action.name ];
		return { ...state, schedules };
	}
	}
	return state;
};
