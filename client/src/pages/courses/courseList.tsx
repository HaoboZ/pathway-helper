import {
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Snackbar,
	SnackbarContent,
	Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Check as CheckIcon, Close as CloseIcon, Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';
import { category } from './category';


export default function CourseList( { schedule, selectedTerm, filter, setSelectedCourse } ) {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	const theme = useTheme();
	
	const [ courses, setCourses ] = React.useState( [] );
	const [ removed, setRemoved ] = React.useState( {} );
	const [ undoRemove, setUndoRemove ] = React.useState( undefined );
	
	React.useEffect( () => {
		$.ajax( {
			type: 'GET',
			url:  '/classes',
			data: {
				term:    selectedTerm,
				subject: category[ schedule.major ] === 'None' ? undefined : category[ schedule.major ]
			},
			success( res ) {
				if ( res.error ) {
					console.log( res );
				} else {
					setCourses( res.results );
				}
			}
		} );
	}, [ selectedTerm, schedule.major ] );
	
	if ( !courses ) return null;
	
	return <>
		Course List
		<List style={{
			overflow:        'auto',
			maxHeight:       600,
			backgroundColor: theme.palette.background.paper,
			marginRight:     10
		}}>
			{courses.filter( ( course ) => {
				if ( removed[ course.number ] ) return false;
				for ( let taken of store.transcript.courses ) {
					if ( taken.coursePrefix === course.subject && taken.courseNum === course.catalog_nbr ) return false;
				}
				if ( filter.length ) {
					for ( const match of filter ) {
						if ( !course.class_descr.toLowerCase().includes( match.toLowerCase() ) ) return false;
					}
				}
				return true;
			} ).map( ( course ) => <ListItem key={course.number} button onClick={() => {
				setSelectedCourse( ( selectedCourse ) => selectedCourse === course ? undefined : course );
			}}>
				<ListItemText
					primary={course.number}
					secondary={`${course.subject} ${course.catalog_nbr} - ${course.class_descr}`}/>
				<ListItemSecondaryAction>
					<IconButton edge='end' onClick={() => {
						setRemoved( ( removed ) => ( { ...removed, [ course.number ]: true } ) );
						setUndoRemove( course.number );
					}}><DeleteIcon/></IconButton>
				</ListItemSecondaryAction>
			</ListItem> )}
		</List>
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			open={!!undoRemove}
			onClose={() => {
				setUndoRemove( undefined );
			}}>
			<SnackbarContent
				style={{
					backgroundColor: theme.palette.secondary.dark,
					color:           theme.palette.common.white
				}}
				message={<Typography color='textPrimary' style={{
					display:    'flex',
					alignItems: 'center'
				}}>Undo Remove Course?</Typography>}
				action={<>
					<IconButton color='default' onClick={() => {
						setRemoved( ( removed ) => ( { ...removed, [ undoRemove ]: false } ) );
						setUndoRemove( undefined );
					}}>
						<CheckIcon style={{ fontSize: 20 }}/>
					</IconButton>
					<IconButton color='default' onClick={() => {
						setUndoRemove( undefined );
					}}>
						<CloseIcon style={{ fontSize: 20 }}/>
					</IconButton>
				</>}/>
		</Snackbar>
	</>;
}
