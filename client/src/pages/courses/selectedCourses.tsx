import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { removeCourse } from '../../store/global/scheduleActions';


export default function SelectedCourses( { scheduleName, schedule, selectedTerm, setSelectedCourse } ) {
	const dispatch = useDispatch();

	const theme = useTheme();

	for ( const term of schedule.terms ) {
		if ( term.id === selectedTerm ) {
			if ( term.courses.length )
				return <>
					<List
						subheader={<ListSubheader style={{ backgroundColor: theme.palette.background.paper }}>
							Selected Courses
						</ListSubheader>}
						style={{
							maxHeight:       600,
							backgroundColor: theme.palette.background.paper,
							marginRight:     10,
							marginBottom:    10
						}}>
						{term.courses.map( ( course ) => <ListItem key={course.courseId} button onClick={() => {
							setSelectedCourse( ( selectedCourse ) => selectedCourse === course ? undefined : course );
						}}>
							<ListItemText
								primary={`${course.coursePrefix} ${course.courseNum} - ${course.courseTitle}`}
								secondary={course.courseId}/>
							<ListItemSecondaryAction>
								<IconButton edge='end' onClick={() => {
									console.log( scheduleName );
									dispatch( removeCourse( scheduleName, selectedTerm, course.courseId ) );
								}}><DeleteIcon/></IconButton>
							</ListItemSecondaryAction>
						</ListItem> )}
					</List>
				</>;
			else
				return null;
		}
	}

	return null;
}
