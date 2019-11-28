export const ADDFILTER = 'addFilter';

export function addFilter( schedule, name ) {
	return {
		type: ADDFILTER,
		schedule,
		name
	};
}

export const REMOVEFILTER = 'removeFilter';

export function removeFilter( schedule: string, name ) {
	return {
		type: REMOVEFILTER,
		schedule,
		name
	};
}


export const SETMAJOR = 'setMajor';

export function setMajor( schedule: string, name ) {
	return {
		type: SETMAJOR,
		schedule,
		name
	};
}


export const ADDCOURSE = 'addCourse';

export function addCourse( schedule: string, term: number, course: {
	coursePrefix: string
	courseNum: string
	courseTitle: string
} ) {
	return {
		type: ADDCOURSE,
		schedule,
		term,
		course
	};
}

export const REMOVECOURSE = 'removeCourse';

export function removeCourse( schedule: string, term: number, course: {
	coursePrefix: string
	courseNum: string
} ) {
	return {
		type: REMOVECOURSE,
		schedule,
		term,
		course
	};
}