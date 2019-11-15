import { RouteComponentProps } from '@reach/router';
import {displayWarning, login} from "../store/local/actions";
import {Button} from "@material-ui/core";
import Transcript from '../transcriptParser/Transcript'
import {useDropzone} from 'react-dropzone'
import * as React from "react";
import { useDispatch } from 'react-redux';


function handleUploadedText(text){
	let transcript = new Transcript(text);
	console.log(transcript)
}


export default function Upload( props: RouteComponentProps ) {
	const uploadFunctionality = true;

	let transcriptTextUploadRef = React.useRef( null );
	const dispatch = useDispatch();
    const {
		getRootProps,
		// @ts-ignore
		getInputProps,
		isDragActive,
		// @ts-ignore
	} = useDropzone({multiple:false,accept: '.pdf',onDrop: (files)=>{

			if(files.length == 1 && files[0].type === "application/pdf"){
				console.log(files)
				let formData = new FormData(this);
				formData.append("transcript",files[0]);
				dispatch( displayWarning( 'Uploading...' ) );
				$.ajax({
					type: "POST",
					url: "/parsePDFText",
					data: formData,
					processData: false,
					contentType: false,
					success: function(r){
						console.log(r);
						if(r.error !== undefined){
							dispatch( displayWarning( r.error ) );
						}
						else{
							dispatch( displayWarning( "Done reading text from pdf!" ) );
							handleUploadedText(r.text)
						}
					},
					error: function (e) {
						console.log(e);

					}
				});
			}
			else{
				dispatch( displayWarning( 'Please enter one valid PDF file' ) );
			}

		}});



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
				<textarea ref={transcriptTextUploadRef} style={{width: '80%', height: "60%", resize: 'none'}}/>
				<Button variant='outlined' style={{width: "10%"}} onClick={() => {
					handleUploadedText(transcriptTextUploadRef.current.value);
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

					<div style={{
						display:'flex',
						flexDirection: 'column',
						alignItems:'center',
						width:"100%",
						height:"60%"
					}}>
						<div {...getRootProps({style:{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent:'center',
							padding: '20px',
							borderWidth: 2,
							borderRadius: 2,
							width:"80%",
							height:"60%",
							borderColor: (isDragActive?'#2196f3':'#bbbbbb'),
							borderStyle: 'dashed',
							backgroundColor: '#fafafa',
							color: '#000',
							outline: 'none',
							transition: 'border .24s ease-in-out'
						}})}>
							{/*
							// @ts-ignore */}
							<input {...getInputProps()} />

							<p>Drag the pdf here!</p>
							<p>Or click to select a file.</p>
						</div>
					</div>

					<Button variant='outlined' style={{width: "10%", opacity: 0}} onClick={() => {

					}}>a</Button>
				</div>
			) : (
				null
			)}




		</div>);


}
