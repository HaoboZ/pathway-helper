import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import { displayWarning } from '../../store/local/actions';
import ScheduleList from './scheduleList';
import TakenCourses from './takenCourses';
import TranscriptInfo from './transcriptInfo';


export default function Details( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.details );
	
	React.useEffect( () => {
		if ( !store.transcript ) {
			props.navigate( '/upload' ).then( () => {
				dispatch( displayWarning( 'Transcript needs to be uploaded first' ) );
			} );
		}
	}, [ props.path ] );
	
	if ( !store.transcript ) return null;
	
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
