import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	ListSubheader, Paper,
	TextField, Tooltip,
	Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../redux/store';
import { createSchedule, deleteSchedule } from '../store/global/actions';
import { displayWarning } from '../store/local/actions';


export default function Details( props: RouteComponentProps ) {
	const theme = useTheme();
	
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.details );
	
	const addNewScheduleNameRef = React.useRef( null );
	
	function courseSchedule( term ) {
		return <div style={{
			margin:     5,
			flex:       1,
			borderLeft: `1px solid ${theme.palette.divider}`,
			textAlign:  'center'
		}}>
			{term.map( ( course, index ) =>
				<Tooltip title={course.courseTitle}>
					<div key={index}>{course.coursePrefix} {course.courseNum}</div>
				</Tooltip> )}
		</div>;
	}
	
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
		alignItems:    'center',
		height:        '100%'
	}}>
		{/* Info */}
		<div style={{ padding: '2em', width: '80%' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em 1em .8em 1em' }}>
				<div style={{ flexGrow: 1 }}>
					<Typography variant='body1'>
						Name: <span>{store.transcript.name}</span>
					</Typography>
				</div>
				<div style={{ flexGrow: 1 }}>
					<Typography variant='body1'>
						Major: <span>{store.transcript.major}</span>
					</Typography>
				</div>
			</div>
			<Divider/>
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '2em 1em .8em 1em' }}>
				<div style={{ flexGrow: 1 }}>
					<Typography variant='body1'>
						Classes taken: <span>{store.transcript.courses.length}</span>
					</Typography>
				</div>
				<div style={{ flexGrow: 1 }}>
					<Typography variant='body1'>
						Other: <span>Information</span>
					</Typography>
				</div>
			</div>
			<Divider/>
		</div>
		
		{/* Courses taken / required */}
		<div style={{ display: 'flex', width: '75%', justifyContent: 'space-around', height: 400 }}>
			<div style={{
				border:    '1px solid rgba(0,0,0,.2)',
				padding:   '0em 1em 1em 1em',
				overflowY: 'scroll',
				width:     '100%'
			}}>
				<List subheader={<ListSubheader style={{ backgroundColor: theme.palette.background.default }}>
					Courses Taken
				</ListSubheader>}>
					{store.transcript.courses.map( ( course, index ) => {
						return <ListItem key={index} dense>
							<ListItemText>{course.coursePrefix} {course.courseNum}: {course.courseTitle}</ListItemText>
						</ListItem>;
					} )}
				</List>
			</div>
		</div>
		
		{/* Create a schedule */}
		<Paper style={{
			width:  '80%',
			margin: 30
		}}>
			<List>
				{Object.keys( store.schedules ).map( ( name, index ) => <>
					<ListItem key={index}>
						<ListItemText>
							<div style={{ display: 'flex' }}>
								<div style={{
									margin:         5,
									flex:           1,
									display:        'flex',
									alignItems:     'center',
									justifyContent: 'center'
								}}>{name}</div>
								{courseSchedule( store.schedules[ name ].term1 )}
								{courseSchedule( store.schedules[ name ].term2 )}
								{courseSchedule( store.schedules[ name ].term3 )}
								{courseSchedule( store.schedules[ name ].term4 )}
							</div>
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton edge='end' onClick={() => {
								if ( confirm( `Are you should you want to delete schedule ${name}?` ) ) {
									dispatch( deleteSchedule( name ) );
								}
							}}>
								<DeleteIcon/>
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
					<Divider/>
				</> )}
				<ListItem>
					<ListItemText>
						<TextField fullWidth label='Add New Schedule' inputRef={addNewScheduleNameRef}/>
					</ListItemText>
					<ListItemSecondaryAction>
						<IconButton edge='end' onClick={() => {
							const name = addNewScheduleNameRef.current.value;
							if ( !name || name in store.schedules ) {
								dispatch( displayWarning( 'Name is duplicate or empty' ) );
							} else {
								dispatch( createSchedule( name ) );
								props.navigate( `courses/${name}` );
							}
						}}>
							<AddIcon/>
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</Paper>
	</div>;
}
