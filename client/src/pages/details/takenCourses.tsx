import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';


export default function TakenCourses() {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	const theme = useTheme();
	
	return <div style={{
		display: 'flex',
		margin:  '1em',
		width:   '100%',
		height:  400
	}}>
		<List
			style={{
				border:    `1px solid ${theme.palette.divider}`,
				overflowY: 'scroll',
				width:     '100%'
			}}
			subheader={<ListSubheader style={{ backgroundColor: theme.palette.background.default }}>
				Courses Taken
			</ListSubheader>}>
			{store.transcript.courses.map( ( course, index ) => {
				return <ListItem key={index} dense>
					<ListItemText>{course.coursePrefix} {course.courseNum}: {course.courseTitle}</ListItemText>
				</ListItem>;
			} )}
		</List>
	</div>;
}