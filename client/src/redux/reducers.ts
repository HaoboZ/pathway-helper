import { combineReducers } from 'redux';

import { MainReducer, MainState } from '../store/reducer';


const reducers = combineReducers(
	{
		main: MainReducer
	}
);
export default reducers;

export interface state {
	main: MainState
}
