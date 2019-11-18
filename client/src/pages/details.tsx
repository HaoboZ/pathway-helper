import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
    Divider,
    ListItem,
    List, ListItemText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../redux/store';
import {displayWarning, login} from '../store/local/actions';


export default function Details( props: RouteComponentProps ) {
	const dispatch = useDispatch(),
	      store    = useSelector( ( store: StoreState ) => store.main );

	React.useEffect( () => {
		console.log("test", store.transcript)
		if ( store.transcript === undefined ) {
			props.navigate( '/upload' ).then( () => {
				dispatch( displayWarning( 'Transcript needs to be uploaded first' ) );
			} );
		}
	}, [ props.path ] );

	return <div style={{
		display:       'flex',
		flexDirection: 'column',
		alignItems:    'center',
		height:'100%'
	}}>
		{/* Info */}
		<div style={{padding:'2em', width: '80%'}}>
			<div style={{display:'flex', justifyContent:'space-between', padding:'1em 1em .8em 1em'}}>
				<div style={{flexGrow:1}}>
					<Typography variant="body1" >
					Name: <span>{store.transcript.name}</span>
					</Typography>
				</div>
				<div style={{flexGrow:1}}>
					<Typography variant="body1" >
					Major: <span>{store.transcript.major}</span>
					</Typography>
				</div>
			</div>
			<Divider  />
			<div style={{display:'flex', justifyContent:'space-between', padding:'2em 1em .8em 1em'}}>
				<div style={{flexGrow:1}}>
					<Typography variant="body1" >
					Classes taken: <span>{store.transcript.courses.length}</span>
					</Typography>
				</div>
				<div style={{flexGrow:1}}>
					<Typography variant="body1" >
					Other: <span>Information</span>
					</Typography>
				</div>
			</div>
			<Divider  />



		</div>

		{/* Courses taken / required */}
		<div style={{display:'flex',width:'90%',justifyContent:'space-around',height:'40%'}}>
			<div style={{border:'1px solid rgba(0,0,0,.2)',padding:'1em', overflowY:'scroll',width:'40%',maxHeight:'40%'}}>
				<List>
					{store.transcript.courses.map((course,i) => {
						const labelId = `course-${i}`;

						return (
							<ListItem key={i} role={undefined} dense button onClick={()=>{console.log()}} onClick={(e)=>{
								console.log(e)
							}}>
								<ListItemText id={labelId} primary={course.courseTitle} />
							</ListItem>
						);
					})}
				</List>
			</div>
			<div style={{border:'1px solid rgba(0,0,0,.2)',padding:'1em',overflowY:'scroll',width:'40%',maxHeight:'40%'}}>
				<List>
					{store.transcript.courses.map((course,i) => {
						const labelId = `course-${i}`;

						return (
							<ListItem key={i} role={undefined} dense button onClick={()=>{console.log()}} onClick={(e)=>{
								console.log(e)
							}}>
								<ListItemText id={labelId} primary={course.courseTitle} />
							</ListItem>
						);
					})}
				</List>
			</div>
		</div>

		{/* Create a schedule */}
		<div>
		</div>

		<Typography variant="h3">

		</Typography>
		<Typography variant="body1" >

		</Typography>
		<Divider  />
		<Typography variant="body2" >

		</Typography>
	</div>;
}
