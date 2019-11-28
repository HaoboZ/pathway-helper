import { Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import ScheduleList from './scheduleList';
import TakenCourses from './takenCourses';
import TranscriptInfo from './transcriptInfo';


export default function Details( props: RouteComponentProps ) {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	if ( !store.transcript ) {
		return <div>You need to upload your transcript first. <Button variant='contained' onClick={() => {
			props.navigate( '/upload' );
		}}>Click me</Button> to go back to main page</div>;
	}
	
	return <div style={{
		display:       'flex',
		flexDirection: 'column',
		alignContent:  'center',
		width:         '80%'
	}}>
		<TranscriptInfo/>
		<TakenCourses/>
		<ScheduleList/>
	</div>;
}
