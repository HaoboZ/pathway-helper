import { DISPLAYWARNING, LOGIN, LOGOUT, SETUSERDATA, TOGGLETHEME } from './actions';


export interface LocalState {
	theme: string
	authenticated: boolean
	warning: string
	username: string
	obtainedUserData: boolean
}

const initState: LocalState = {
	theme:            'light',
	authenticated:    false,
	warning:          '',
	username:         undefined,
	obtainedUserData: false
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, authenticated: action.authenticated, username: action.username, obtainedUserData: false };
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



