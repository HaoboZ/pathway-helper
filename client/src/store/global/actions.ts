export const SETTRANSCRIPT = 'setTranscript';

export function setTranscript( transcript ) {
	return {
		type: SETTRANSCRIPT,
		transcript
	};
}
