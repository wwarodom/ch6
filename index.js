let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [
    { 'id': 0, 'name': 'pooh', 'weight': 211 },
    { 'id': 1, 'name': 'vinnie', 'weight': 111 }
];

router.route('/bears')
        .get((req, res) => res.json(bears))

        .post( (req,res) => {
            let bear = {}
            bear.id = bears[bears.length-1].id+1
            bear.name = req.body.name
            bear.weight = req.body.weight
            bears.push(bear)            
            res.json( {message: 'Bear created!'} )
        })

router.route('/bears/:bear_id')
        .get((req,res) => {
            let id = req.params.bear_id
            let index = bears.findIndex( bear => (bear.id === +id) )
            res.json(bears[index])
        })

        .put ( (req,res) => {                               // Update a bear
            let id = req.params.bear_id
            let index = bears.findIndex( bear => (bear.id === +id) )
            bears[index].name = req.body.name;   
            bears[index].weight = req.body.weight;   
            res.json({ message: 'Bear updated!' + req.params.bear_id});
        })
     
        .delete ( (req,res) => {                   // Delete a bear
            // delete     bears[req.params.bear_id]
            let id = req.params.bear_id
            let index = bears.findIndex( bear => bear.id === +id  )
            bears.splice(index,1) 
            res.json({ message: 'Bear deleted: ' + req.params.bear_id});
        })
     

app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(80, () => { console.log('server is running') })