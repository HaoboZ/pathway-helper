import { Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { setTranscript } from '../store/global/actions';
import { displayWarning } from '../store/local/actions';
import Transcript from '../transcriptParser/Transcript';


export default function Upload( props: RouteComponentProps ) {
	let transcriptTextUploadRef = React.useRef( null );
	
	const dispatch = useDispatch();
	
	const {
		      getRootProps,
		      getInputProps,
		      isDragActive
	      } = useDropzone( {
		multiple: false,
		accept:   '.pdf',
		onDrop( files ) {
			if ( files.length == 1 && files[ 0 ].type === 'application/pdf' ) {
				console.log( files );
				let formData = new FormData( this );
				formData.append( 'transcript', files[ 0 ] );
				dispatch( displayWarning( 'Uploading...' ) );
				$.ajax( {
					type:        'POST',
					url:         '/parsePDFText',
					data:        formData,
					processData: false,
					contentType: false,
					success( r ) {
						console.log( r );
						if ( r.error !== undefined ) {
							dispatch( displayWarning( r.error ) );
						} else {
							dispatch( displayWarning( 'Done reading text from pdf!' ) );
							let transcript = new Transcript( r.text );
							dispatch( setTranscript( transcript ) );
							props.navigate( '/' );
						}
					},
					error( e ) {
						console.log( e );
					}
				} );
			} else {
				dispatch( displayWarning( 'Please enter one valid PDF file' ) );
			}
		}
	} );
	
	return <div style={{
		display:        'flex',
		width:          '100%',
		height:         '100%',
		flexDirection:  'row',
		justifyContent: 'space-around'
	}}>
		<div style={{
			display:        'flex',
			flexDirection:  'column',
			height:         '100%',
			maxWidth:       '45%',
			minWidth:       '30%',
			flexGrow:       1,
			justifyContent: 'space-around',
			alignItems:     'center',
			textAlign:      'center'
		}}>
			<h1>Copy in your transcript.</h1>
			<textarea ref={transcriptTextUploadRef} style={{ width: '80%', height: '60%', resize: 'none' }}/>
			<Button variant='outlined' style={{ width: '10%' }} onClick={() => {
				let transcript = new Transcript( transcriptTextUploadRef.current.value );
				dispatch( setTranscript( transcript ) );
				props.navigate( '/' );
			}}>Upload</Button>
		</div>
		<div style={{
			display:        'flex',
			flexDirection:  'column',
			height:         '100%',
			maxWidth:       '10%',
			minWidth:       '5%',
			flexGrow:       1,
			justifyContent: 'space-around',
			alignItems:     'center',
			textAlign:      'center'
		}}>
			<h3>or..</h3>
		</div>
		<div style={{
			display:        'flex',
			flexDirection:  'column',
			height:         '100%',
			maxWidth:       '45%',
			minWidth:       '30%',
			flexGrow:       1,
			justifyContent: 'space-around',
			alignItems:     'center',
			textAlign:      'center'
		}}>
			<h1>Upload a PDF.</h1>
			<div style={{
				display:       'flex',
				flexDirection: 'column',
				alignItems:    'center',
				width:         '100%',
				height:        '60%'
			}}>
				<div {...getRootProps( {
					style: {
						flex:            1,
						display:         'flex',
						flexDirection:   'column',
						alignItems:      'center',
						justifyContent:  'center',
						padding:         '20px',
						borderWidth:     2,
						borderRadius:    2,
						width:           '80%',
						height:          '60%',
						borderColor:     ( isDragActive ? '#2196f3' : '#bbbbbb' ),
						borderStyle:     'dashed',
						backgroundColor: '#fafafa',
						color:           '#000',
						outline:         'none',
						transition:      'border .24s ease-in-out'
					}
				} )}>
					<input {...getInputProps()} />
					<p>Drag the pdf here!</p>
					<p>Or click to select a file.</p>
				</div>
			</div>
			<Button variant='outlined' style={{ width: '10%', opacity: 0 }} onClick={() => {
			}}>a</Button>
		</div>
	</div>;
}
