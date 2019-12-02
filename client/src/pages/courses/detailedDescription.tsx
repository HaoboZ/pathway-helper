import { Button, Paper } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { addCourse, removeCourse } from '../../store/global/scheduleActions';


export default function DetailedDescription( { scheduleName, schedule, selectedCourse } ) {
	const dispatch = useDispatch();
	
	React.useEffect( () => {
		if ( !selectedCourse ) return;
		// TODO: request details
	}, [ selectedCourse ] );
	
	if ( !selectedCourse ) return null;
	
	return <Paper style={{ marginLeft: 10 }}>
		{selectedCourse.term} {selectedCourse.number}
		<Button onClick={() => {
			for ( const term of schedule.terms ) {
				for ( const course of term.courses ) {
					if ( course.courseId === selectedCourse.number ) {
						dispatch( removeCourse( scheduleName, selectedCourse.term, selectedCourse.number ) );
						return;
					}
				}
			}
			dispatch( addCourse( scheduleName, selectedCourse.term, {
				courseId:     selectedCourse.number,
				coursePrefix: selectedCourse.subject,
				courseNum:    selectedCourse.catalog_nbr,
				courseTitle:  selectedCourse.class_descr
			} ) );
		}}>Add/Remove</Button>
	</Paper>;
}
