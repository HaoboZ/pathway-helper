export let terms = [{term:4040,desc:'Spring 2019'},{term:4060,desc:'Summer 2019'},{term:4100,desc:'Fall 2019'},{term:4120,desc:'Winter 2020'},]
// export let terms = [{term:4120,desc:'Winter 2020'}]
import {Course} from './courses'

export default function generateCourseRequestHandlers( app ) {
	app.get('/classes', (req,res) => {//must specify term
	    if(req.query.term !== undefined){
	        Course.findAll({where:{term:req.query.term},raw: true}).then((results)=>{
	            console.log(results)
	            res.send({results})
            })
        }
        else{
            res.send({})
        }
    });
    app.get('/getCurrentTerm', (req, res) =>{
        //this is a temporary hardcoded solution
        res.send({term: 4100, desc: 'Fall 2019'})
    });
    app.get('/availableTerms', (req,res) => {
	    res.send(terms);
    });

}
