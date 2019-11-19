import { combineReducers } from 'redux';

import { GlobalReducer, GlobalState } from '../store/global/reducer';
import { LocalReducer, LocalState } from '../store/local/reducer';


const reducers = combineReducers(
	{
		main:    LocalReducer,
		details: GlobalReducer
	}
);
export default reducers;

export const RESET = 'resetState';

export interface state {
	main: LocalState,
	details: GlobalState
}
