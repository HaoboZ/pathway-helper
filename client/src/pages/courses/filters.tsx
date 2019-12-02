import ChipInput from 'material-ui-chip-input';
import * as React from 'react';


export default function Filters( { filter, setFilter } ) {
	return <ChipInput
		fullWidth
		value={filter}
		onAdd={( chip ) => {
			setFilter( ( filter ) => filter.concat( chip ) );
		}}
		onDelete={( chip ) => {
			setFilter( ( filter ) => filter.filter( ( name ) => name !== chip ) );
		}}
		label='Course Filter'
		placeholder='Type and press enter to add a filter'/>;
}
