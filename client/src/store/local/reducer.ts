import config from '../../config';
import { RESET } from '../../redux/reducers';
import { DISPLAYWARNING, LOGIN, LOGOUT, SETUSERDATA, TOGGLETHEME } from './actions';


export interface LocalState {
	theme: string
	version: string
	warning: string
	username: string
	authenticated: boolean
	obtainedUserData: boolean
}

const initState: LocalState = {
	theme:            'light',
	version:          config.version,
	warning:          '',
	username:         undefined,
	authenticated:    false,
	obtainedUserData: false
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case RESET:
		return initState;
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, username: action.username, authenticated: action.authenticated, obtainedUserData: true };
	case LOGOUT:
		return initState;
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	case SETUSERDATA:
		return {
			...state,
			username:         action.username,
			authenticated:    action.username !== undefined,
			obtainedUserData: true
		};
	}
	return state;
};



