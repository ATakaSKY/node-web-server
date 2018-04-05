const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getDateHelper', () => { 
    return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase(); 
});



app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('serverlog', log + '\n', (err) => {
        console.log(err);
    });
    next();
})

app.use((req,res,next) => {
    res.render('maintenance.hbs');
})


app.use(express.static(__dirname +  '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello there</h1>');
    res.render('home.hbs');
})

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        data:'very important date'
    })
})

app.get('/bad', (req,res) => {
    res.send({
        errorMessage:'unable to handle request'
    });
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");``
});