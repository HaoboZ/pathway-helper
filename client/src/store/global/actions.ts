export const SETTRANSCRIPT = 'setTranscript';

export function setTranscript( transcript ) {
	return {
		type: SETTRANSCRIPT,
		transcript
	};
}

export const CREATESCHEDULE = 'createSchedule';

export function createSchedule( name: string ) {
	return {
		type: CREATESCHEDULE,
		name
	};
}

export const DELETESCHEDULE = 'deleteSchedule';

export function deleteSchedule( name: string ) {
	return {
		type: DELETESCHEDULE,
		name
	};
}

export const ADDFILTER = 'addFilter';

export function addFilter( schedule, name ) {
	return {
		type: ADDFILTER,
		schedule,
		name
	};
}

export const REMOVEFILTER = 'removeFilter';

export function removeFilter( schedule, name ) {
	return {
		type: REMOVEFILTER,
		schedule,
		name
	};
}
