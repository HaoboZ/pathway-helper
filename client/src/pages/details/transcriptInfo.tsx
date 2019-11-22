import { Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../../redux/store';


export default function TranscriptInfo() {
	const store = useSelector( ( store: StoreState ) => store.details );
	
	return <div style={{ padding: '1em', width: '100%' }}>
		<div style={{
			display:        'flex',
			justifyContent: 'space-between',
			padding:        '1em'
		}}>
			<div style={{ flexGrow: 1 }}>
				<Typography variant='body1'>
					Name: {store.transcript.name}
				</Typography>
			</div>
			<div style={{ flexGrow: 1 }}>
				<Typography variant='body1'>
					Major: {store.transcript.major}
				</Typography>
			</div>
		</div>
		<Divider/>
		<div style={{
			display:        'flex',
			justifyContent: 'space-between',
			padding:        '1em'
		}}>
			<div style={{ flexGrow: 1 }}>
				<Typography variant='body1'>
					Classes taken: {store.transcript.courses.length}
				</Typography>
			</div>
			<div style={{ flexGrow: 1 }}>
				<Typography variant='body1'>
					Other: Information
				</Typography>
			</div>
		</div>
		<Divider/>
	</div>;
}
