  var express = require('express');
  var mysql = require('mysql');
  var DButils = require('./DButils');
  var app = express();
  var iso8601 = require('iso8601');

  var bodyParser = require('body-parser');

  app.use(bodyParser.json());       // to support JSON-encoded bodies
  var cors = require('cors');
  app.use(cors());







      var connection = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: '123qweasd',
        database: 'shop'
      });


      connection.getConnection(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }

        console.log('\nconnected to shop Database');
      });

      //GET:
      app.get('/getCategories', function (req, res) {
        DButils.select(connection, "categories", "*", function(result){
          console.log(result + "jjj");
            res.send(result);
           console.log("success to insert new token thing");   
      });
        //console.log('JSON-result:', json);
    });


      //POST:
      app.post('/register', function (req, res) {
        console.log(req.query.id); 
        var DBInsertion = {
          clientID: req.body.clientID, 
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
          cellular: req.body.cellular,
          mail: req.body.mail,
          creditCardNumber: req.body.creditCardNumber,
          isAdmin: req.body.isAdmin
        };

        var data = {
          ClientID: DBInsertion.clientID, 
          FirstName: DBInsertion.firstName,
          LastName: DBInsertion.lastName,
          Address: DBInsertion.address,
          City: DBInsertion.city,
          Country: DBInsertion.country,
          Phone: DBInsertion.phone,
          Cellular: DBInsertion.cellular,
          Mail: DBInsertion.mail,
          CreditCardNumber: DBInsertion.creditCardNumber,
          isAdmin: DBInsertion.isAdmin
        };


        DButils.insert(connection, "clients", data, function(insertStatus){
          if(insertStatus){
           res.send('success to insert new token thing')
           console.log("success to insert new token thing");   
         } else {
          console.log("Failed to insert new token thing");
        }
      });
      })


      app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
      })






