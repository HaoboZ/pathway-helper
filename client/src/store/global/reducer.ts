import { RESET } from '../../redux/reducers';
import { LOGIN, LOGOUT } from '../local/actions';
import { ADDCOURSE, REMOVECOURSE, SETMAJOR } from './scheduleActions';
import { CREATESCHEDULE, DELETESCHEDULE, SETALL, SETTRANSCRIPT } from './transcriptActions';


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
			terms: {
				id: number
				name: string
				courses: {
					courseId: string
					coursePrefix: string
					courseNum: string
					courseTitle: string
				}[]
			}[]
		}
	}
	authenticated: boolean
}

const initState: GlobalState = {
	transcript:    null,
	schedules:     {},
	authenticated: false
};

function saveData( state ) {
	if ( state.authenticated ) {
		$.ajax( {
			type:        'POST',
			url:         '/storeUserData',
			dataType:    'json',
			contentType: 'application/json',
			data:        JSON.stringify( state ),
			success( r ) {
				if ( r.error ) {
					console.log( r );
				}
			}
		} );
	}
	return state;
}

export const GlobalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case RESET:
	case LOGIN:
		return { ...state, authenticated: action.authenticated };
	case LOGOUT:
		return initState;
	case SETALL:
		let { transcript, schedules } = state;
		if ( 'transcript' in action.data ) transcript = action.data.transcript;
		if ( 'schedules' in action.data ) schedules = action.data.schedules;
		return { transcript, schedules };
	case SETTRANSCRIPT:
		return saveData( { ...state, transcript: action.transcript } );
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
		return saveData( { ...state, schedules } );
	}
	case DELETESCHEDULE: {
		const schedules = { ...state.schedules };
		delete schedules[ action.name ];
		return saveData( { ...state, schedules } );
	}
	case SETMAJOR: {
		const schedules = { ...state.schedules };
		schedules[ action.schedule ].major = action.name;
		return saveData( { ...state, schedules } );
	}
	case ADDCOURSE: {
		const schedules = { ...state.schedules };
		for ( const term of schedules[ action.schedule ].terms ) {
			if ( term.id === action.term ) {
				for ( const course of term.courses ) {
					if ( course.courseId === action.course.courseId )
						return state;
				}
				term.courses = [ ...term.courses, action.course ];
			}
		}
		return saveData( { ...state, schedules } );
	}
	case REMOVECOURSE: {
		const schedules = { ...state.schedules };
		for ( const term of schedules[ action.schedule ].terms ) {
			if ( term.id === action.term ) {
				for ( let i = 0; i < term.courses.length; ++i ) {
					if ( term.courses[ i ].courseId === action.course ) {
						term.courses = [
							...term.courses.slice( 0, i ),
							...term.courses.slice( i + 1 )
						];
						return saveData( { ...state, schedules } );
					}
				}
			}
		}
		return state;
	}
	}
	return state;
};
