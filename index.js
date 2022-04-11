const express = require('express');

const app = express();

const pokemonRoute = require('./routes/pokemon');


const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
}));

app.use('/pokemon', pokemonRoute);

app.get('/', function(request, response) {
    
    response.status(202);

    response.send("Now we're cooking with Express")

})

app.get('/', function(request, response) {
    
    response.status(202);

    response.send("This is the second get base route")

})

app.post('/', function(request, response) {

    response.status(203);

    response.send("This came from the post route")

})



app.listen(8000, () => console.log("App is live"));