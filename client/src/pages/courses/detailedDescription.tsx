import { Button, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { addCourse, removeCourse } from '../../store/global/scheduleActions';


export default function DetailedDescription( { scheduleName, schedule, selectedCourse } ) {
	const theme = useTheme();
	const dispatch = useDispatch();
	
	const [ description, setDescription ] = React.useState( undefined );
	
	React.useEffect( () => {
		if ( !selectedCourse ) {
			setDescription( undefined );
			return;
		}
		$.ajax( {
			type: 'GET',
			url:  '/courseDescription',
			data: {
				term:   selectedCourse.term,
				number: selectedCourse.number
			},
			success( res ) {
				if ( res.error ) {
					console.log( res );
				} else {
					setDescription( res.description );
				}
			}
		} );
	}, [ selectedCourse ] );
	
	if ( !description ) return null;
	
	return <Paper style={{ marginLeft: 10, padding: theme.spacing( 3, 2 ) }}>
		<Typography variant='h4'>
			{description.class_nbr} - {description.subject} {description.catalog_nbr}: {description.class_descr}
		</Typography>
		<br/>
		<Typography>{description.acad_group_descr} - {description.acad_career_descr}</Typography>
		<br/>
		<Typography variant='h6'>Description</Typography>
		<Typography>{description.course_descr}</Typography>
		<br/>
		<Typography variant='h6'>Info</Typography>
		<Typography>Instructor: {description.instr_1}</Typography>
		<Typography>Status: {description.seats_text}</Typography>
		<Typography>Units: {description.units_minimum}</Typography>
		<br/>
		<Button variant='contained' onClick={() => {
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
