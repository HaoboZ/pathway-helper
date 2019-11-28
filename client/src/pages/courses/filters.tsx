import ChipInput from 'material-ui-chip-input';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { addFilter, removeFilter } from '../../store/global/scheduleActions';


export default function Filters( { scheduleName, schedule } ) {
	const dispatch = useDispatch();
	
	return <ChipInput
		fullWidth
		value={schedule.filter}
		onAdd={( chip ) => {
			dispatch( addFilter( scheduleName, chip ) );
		}}
		onDelete={( chip ) => {
			dispatch( removeFilter( scheduleName, chip ) );
		}}
		label='Course Filter'
		placeholder='Type and press enter to add a filter'/>;
}
