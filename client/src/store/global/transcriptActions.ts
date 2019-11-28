export const SETTRANSCRIPT = 'setTranscript';

export function setTranscript( transcript ) {
	return {
		type: SETTRANSCRIPT,
		transcript
	};
}

export const CREATESCHEDULE = 'createSchedule';

export function createSchedule( name: string, terms: { id: number, name: string }[] ) {
	return {
		type: CREATESCHEDULE,
		name,
		terms
	};
}

export const DELETESCHEDULE = 'deleteSchedule';

export function deleteSchedule( name: string ) {
	return {
		type: DELETESCHEDULE,
		name
	};
}
