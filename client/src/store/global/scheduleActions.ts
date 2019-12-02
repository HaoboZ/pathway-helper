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
	courseId: string
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

export function removeCourse( schedule: string, term: number, course: string ) {
	return {
		type: REMOVECOURSE,
		schedule,
		term,
		course
	};
}