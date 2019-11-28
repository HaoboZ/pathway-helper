import { MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setMajor } from '../../store/global/scheduleActions';


export default function Category( { scheduleName, schedule } ) {
	const dispatch = useDispatch();
	
	return <div>
		Major Focus: <Select
			value={schedule.major}
			onChange={( e ) => {
				dispatch( setMajor( scheduleName, e.target.value as string ) );
			}}>
			<MenuItem value='None'>None</MenuItem>
			<MenuItem value='Computer Science and Engineering'>COEN</MenuItem>
		</Select>
	</div>;
}