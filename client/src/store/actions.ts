export const SETVALUE = 'setValue';

export function setValue( value: any ) {
	return {
		type: SETVALUE,
		value
	};
}
