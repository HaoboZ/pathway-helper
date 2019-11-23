export let terms = [{term:4040,desc:'Spring 2019'},{term:4060,desc:'Summer 2019'},{term:4100,desc:'Fall 2019'},{term:4120,desc:'Winter 2020'},]
// export let terms = [{term:4120,desc:'Winter 2020'}]

export default function courseRequestHandlers( app ) {
	app.get('/classes', (req,res) => {//must specify term
	    res.send({})
    })
    app.get('/getCurrentTerm', (req, res) =>{
        //should check date
        res.send({term: 4100, desc: 'Fall 2019'})
    })
    app.get('/availableTerms', (req,res) => {
	    res.send(terms);
    })

}
