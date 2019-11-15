import * as pdf from 'pdf-parse';
//PDF Handlers
import * as fileUpload from 'express-fileupload'


function render_page(pageData) {
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20).
        normalizeWhitespace: true,
        //do not attempt to combine same line TextItem's.
        disableCombineTextItems: true
    };

    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            console.log(item.str)
            if (lastY == item.transform[5] || !lastY){
                text += ' ' + item.str;
            }
            else{
                text += '\n' + item.str;
            }
            lastY = item.transform[5];
        }
        text = text.replace(/ +(?= )/g,'');
        return text;
    });
}

let options = {
    pagerender: render_page
};



export default function generatePDFHandlers(app){

    app.use(fileUpload({
        useTempFiles : false,
        debug:true,

    }));

    app.post('/parsePDFText', ( req, res ) => {
        //console.log(req.files);
        if(req.files.transcript === undefined){
            res.send({error:"No file uploaded"});
        }
        if(req.files.transcript != undefined && req.files.transcript.size < 405503 ){

            if(req.files.transcript.mimetype == 'application/pdf'){
                console.log(req.files.transcript.tempFilePath)

                pdf(req.files.transcript.data,options).then(function(data) {
                    res.send({success:"parsed successfully",text:data.text});
                }).catch((e)=>console.log(e))
            }
            else{
               res.send({error:"File is not a pdf"})
            }
        }
        else{
            res.send({error:"File is too large"})
        }

    } );

}
