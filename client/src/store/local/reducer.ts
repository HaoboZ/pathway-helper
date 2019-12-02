import config from '../../config';
import { RESET } from '../../redux/reducers';
import { DISPLAYWARNING, LOGIN, LOGOUT, TOGGLETHEME } from './actions';


export interface LocalState {
	theme: string
	version: string
	warning: string
	username: string
	authenticated: boolean
}

const initState: LocalState = {
	theme:         'light',
	version:       config.version,
	warning:       '',
	username:      undefined,
	authenticated: false
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
		return {
			...state,
			username:      action.username,
			authenticated: action.authenticated
		};
	case LOGOUT:
		return {
			...state,
			username:      undefined,
			authenticated: false
		};
	case DISPLAYWARNING:
		return { ...state, warning: action.text };
	}
	return state;
};



