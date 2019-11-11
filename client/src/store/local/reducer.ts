import { DISPLAYWARNING, LOGIN, LOGOUT, TOGGLETHEME } from './actions';


export interface LocalState {
	theme: string
	authenticated: boolean
	warning: string
}

const initState: LocalState = {
	theme:         'light',
	authenticated: false,
	warning:       ''
};

export const LocalReducer = (
	state = initState,
	action: { type: string } & any
) => {
	switch ( action.type ) {
	case TOGGLETHEME:
		return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
	case LOGIN:
		return { ...state, authenticated: true };
	case LOGOUT:
		return { ...state, authenticated: false };
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	}
	return state;
};
