const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const routesRabbit = require('./routes/api2');
const routesFox = require('./routes/api3');
const routesFish = require('./routes/api4');





app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Method");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);
app.use('/api2', routesRabbit);
app.use('/api3', routesFox);
app.use('/api4', routesFish);




app.use((err, req, res, next) => {
  console.log(err);
  next();
});

        
   
 
app.listen(8007,function(){
    console.log("server is running")
    })
