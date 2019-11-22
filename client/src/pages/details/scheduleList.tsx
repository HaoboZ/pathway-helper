import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	TextField,
	Tooltip
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { navigate } from '@reach/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import { createSchedule, deleteSchedule } from '../../store/global/actions';
import { displayWarning } from '../../store/local/actions';


export default function ScheduleList() {
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
	
	return <Paper style={{
		width:  '100%',
		margin: 30
	}}>
		<List>
			{Object.keys( store.schedules ).map( ( name, index ) => <div key={index}>
				<ListItem button onClick={() => {
					navigate( `courses/${name}` );
				}}>
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
			</div> )}
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
							navigate( `courses/${name}` );
						}
					}}>
						<AddIcon/>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	</Paper>;
	
}