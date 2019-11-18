import { DISPLAYWARNING, LOGIN, LOGOUT, SETUSERDATA, TOGGLETHEME, SETTRANSCRIPT } from './actions';


export interface LocalState {
	theme: string
	warning: string
	username: string
	authenticated: boolean
	obtainedUserData: boolean
	transcript: any
}

const initState: LocalState = {
	theme:            'light',
	warning:          '',
	username:         undefined,
	authenticated:    false,
	obtainedUserData: false,
	transcript: undefined
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, username: action.username, authenticated: action.authenticated, obtainedUserData: true };
	case LOGOUT:
		return initState;
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	case SETTRANSCRIPT:
		return {...state, transcript: action.transcript};
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



