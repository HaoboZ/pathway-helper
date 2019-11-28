import { RESET } from '../../redux/reducers';
import { LOGOUT } from '../local/actions';
import { ADDCOURSE, ADDFILTER, REMOVECOURSE, REMOVEFILTER, SETMAJOR } from './scheduleActions';
import { CREATESCHEDULE, DELETESCHEDULE, SETTRANSCRIPT } from './transcriptActions';


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
			terms: {
				id: number
				name: string
				courses: {
					coursePrefix: string
					courseNum: string
					courseTitle: string
				}[]
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
				terms:  action.terms.map( ( term: any ) => {
					term.courses = [];
					return term;
				} )
			}
		};
		return { ...state, schedules };
	}
	case DELETESCHEDULE: {
		const schedules = { ...state.schedules };
		delete schedules[ action.name ];
		return { ...state, schedules };
	}
	case ADDFILTER: {
		const schedules = { ...state.schedules };
		schedules[ action.schedule ].filter = schedules[ action.schedule ].filter
			.concat( action.name );
		return { ...state, schedules };
	}
	case REMOVEFILTER: {
		const schedules = { ...state.schedules };
		schedules[ action.schedule ].filter = schedules[ action.schedule ].filter
			.filter( ( name ) => name !== action.name );
		return { ...state, schedules };
	}
	case SETMAJOR: {
		const schedules = { ...state.schedules };
		schedules[ action.schedule ].major = action.name;
		return { ...state, schedules };
	}
	case ADDCOURSE: {
		const schedules = { ...state.schedules };
		for ( const term of schedules[ action.schedule ].terms ) {
			if ( term.id === action.term ) {
				for ( const course of term.courses ) {
					if ( course.courseNum === action.course.courseNum && course.coursePrefix === action.course.coursePrefix )
						return state;
				}
				term.courses = [ ...term.courses, action.course ];
			}
		}
		return { ...state, schedules };
	}
	case REMOVECOURSE: {
		const schedules = { ...state.schedules };
		for ( const term of schedules[ action.schedule ].terms ) {
			if ( term.id === action.term ) {
				for ( let i = 0; i < term.courses.length; ++i ) {
					if ( term.courses[ i ].courseNum === action.course.courseNum && term.courses[ i ].coursePrefix === action.course.coursePrefix ) {
						term.courses = [
							...term.courses.slice( 0, i ),
							...term.courses.slice( i + 1 )
						];
						return { ...state, schedules };
					}
				}
			}
		}
		return state;
	}
	}
	return state;
};
