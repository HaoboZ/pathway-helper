import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import {displayWarning, login} from "../store/local/actions";
import {Button} from "@material-ui/core";
import Transcript from '../transcriptParser/Transcript'

export default function Upload( props: RouteComponentProps ) {
	const uploadFunctionality = false;

	let transcriptTextUploadRef = React.useRef( null );

	return (
		<div style={{
			display: 'flex',
			width: "100%",
			height: "100%",
			flexDirection: 'row',
			justifyContent: 'space-around'
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				height: "100%",
				maxWidth: "45%",
				minWidth: "30%",
				flexGrow: 1,
				justifyContent: 'space-around',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				<h1>Copy in your transcript.</h1>
				<textarea ref={transcriptTextUploadRef} style={{width: '100%', height: "60%", resize: 'none'}}/>
				<Button variant='outlined' style={{width: "10%"}} onClick={() => {
					let transcript = new Transcript(transcriptTextUploadRef.current.value);
					console.log(transcript)
				}}>Upload</Button>
			</div>
			{uploadFunctionality ? (
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					height: "100%",
					maxWidth: "10%",
					minWidth: "5%",
					flexGrow: 1,
					justifyContent: 'space-around',
					alignItems: 'center',
					textAlign: 'center'
				}}>
					<h3>or..</h3>
				</div>
			) : (
				null
			)}
			{uploadFunctionality ? (
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					height: "100%",
					maxWidth: "45%",
					minWidth: "30%",
					flexGrow: 1,
					justifyContent: 'space-around',
					alignItems: 'center',
					textAlign: 'center'
				}}>
					<h1>Upload a PDF.</h1>
					<div style={{width: '100%', height: "60%", resize: 'none', backgroundColor: '#efefef'}}><p>Drag and
						Drop</p><p>TODO</p></div>
					<Button variant='outlined' style={{width: "10%", opacity: 0}} onClick={() => {

					}}>a</Button>
				</div>
			) : (
				null
			)}




		</div>);


}
