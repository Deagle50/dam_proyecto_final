var express = require('express');
var bodyParser = require('body-parser')
var sql = require('mssql');
var app = express();

var config = {
    user: 'usuario',
    password: 'usuario',
    server: 'localhost', //DESKTOP-TLGHJ6G
    database: 'db_coctelpedia' 
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//GET API
//Get challenges for Coctelpedia
app.get('/api/challenges', function(req , res){

    // Configuration object for your database

    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from game_challenges', function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            let ch = [];
            for(let i = 0; i < recordset.recordset.length; i++){
                //Get only phrases
                ch.push(recordset.recordset[i]);
            }

            res.send(ch);
            
        });
    });
});

//GET 
//Get whowould for Coctelpedia
app.get('/api/whowould', function(req , res){

    // Configuration object for your database

    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from game_whowould', function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            let ch = [];
            for(let i = 0; i < recordset.recordset.length; i++){
                //Get only phrases
                ch.push(recordset.recordset[i]);
            }

            res.send(ch);
            
        });
    });
});

//GET
//Get temp phrases for CoctelpediaManager
app.get('/api/temp_phrases', function(req , res){

    // Configuration object for your database

    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from temp_phrases', function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            let ch = [];
            for(let i = 0; i < recordset.recordset.length; i++){
                //Get only phrases
                ch.push(recordset.recordset[i]);
            }

            res.send(ch);
            
        });
    });
});

//POST
//Post ratings from Coctelpedia
app.post('/api/ratings', function(req, res){
    console.log(req.body);
    sql.connect(config, function(err){
        if (err) console.log(err);
        var request = new sql.Request();
        console.log('Rating: '+req.body.rating);
        request.query('INSERT INTO [ratings] (rating) VALUES (' + req.body.rating + ')', function(err, recordset){
            if(err) 
                console.log(err);
            else
                res.send('Inserted');
        });
    });
    
});

//POST
//Post phrases to temp_phrases from Coctelpedia
app.post('/api/temp_phrases', function(req, res){
    console.log(req.body);
    sql.connect(config, function(err){
        if (err) console.log(err);
        var request = new sql.Request();
        console.log('Temp: '+req.body.text);
        request.query("INSERT INTO [temp_phrases] (text) VALUES ('" + req.body.text + "')", function(err, recordset){
            if(err) 
                console.log(err);
            else
                res.send('Inserted');
        });
    });
    
});

//POST
//Post phrases to final phrases from CoctelpediaManager
app.post('/api/phrases', function(req, res){
    console.log(req.body);
    sql.connect(config, function(err){
        if (err) console.log(err);
        var request = new sql.Request();
        console.log('Temp: '+req.body.text);
        request.query("INSERT INTO ["+ req.body.table +"] (text) VALUES ('" + req.body.text + "')", function(err, recordset){
            if(err) 
                console.log(err);
            else
                res.send('Inserted');
        });
    });
    
});

//DELETE
//Delete phrases at temp_phrases from CoctelpediaManager
app.delete('/api/temp_phrases', function(req, res){
    console.log(req.body);
    sql.connect(config, function(err){
        if (err) console.log(err);
        var request = new sql.Request();
        console.log('Temp: '+req.body.id);
        request.query("DELETE FROM [temp_phrases] WHERE id =" + req.body.id, function(err, recordset){
            if(err) 
                console.log(err);
            else
                res.send('Deleted');
        });
    });
})
app.listen(5000, function () {
    console.log('Server is running..');
});
