import { Tab, Tabs } from '@material-ui/core';
import * as React from 'react';


export default function TermSelector() {
	const [ value, setValue ] = React.useState( 0 );
	
	return <Tabs value={value} onChange={( e, val ) => setValue( val )}>
		<Tab
			value={56}
			label={<div>
				Item One
				<br/>
				Item Two
			</div>}/>
		<Tab label='Item Two'/>
		<Tab label='Item Three'/>
	</Tabs>;
};
