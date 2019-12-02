import { Tab, Tabs } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import * as React from 'react';


export default function TermSelector( { schedule, selectedTerm, setSelectedTerm } ) {
	const theme = useTheme();
	
	return <Tabs
		style={{ backgroundColor: theme.palette.secondary.main }}
		indicatorColor='primary'
		value={selectedTerm}
		onChange={( e, val ) => setSelectedTerm( val )}>
		{schedule.terms.map( ( term ) => <Tab
			key={term.id}
			value={term.id}
			style={{ width: '25%' }}
			label={<div style={{ color: '#fff' }}>
				<u>{term.name}</u>
				{term.courses.map( ( course ) => <div key={course.courseId}>
					{course.courseId}: {course.coursePrefix} {course.courseNum}
				</div> )}
			</div>}/> )}
	</Tabs>;
};
