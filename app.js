const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const colors = require('colors');
var MyInfoConnector = require('myinfo-connector-nodejs');

const app = express();
const port = 3001;
const config = require('./config/config.js');


app.use(express.json());
app.use(cors());


app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// get the environment variables (app info) from the config
app.get('/getVehiclesEnv', function (req, res) {

  try {
    var environment = process.argv[2].toUpperCase(); // get from package.json process argument
    // console.log("Environment:".yellow, environment);
    if (environment == "SANDBOX") {
      // overwrite the Environment, Token URL and Person URL if Environemnt is 'Sandbox'. 
      // 'Sandbox' environment doesn't have Payload Encryption & PKI Digital Signature
      config.VEHICLES_MYINFO_CONNECTOR_CONFIG.ENVIRONMENT = environment;
      config.VEHICLES_MYINFO_CONNECTOR_CONFIG.TOKEN_URL = config.VEHICLES_APP_CONFIG.MYINFO_API_TOKEN[environment];
      config.VEHICLES_MYINFO_CONNECTOR_CONFIG.PERSON_URL = config.VEHICLES_APP_CONFIG.MYINFO_API_PERSON[environment];
      console.log("Payload Encryption & PKI Digital Signature:".yellow, "Disabled".grey,"(Sandbox Env)");
    } else {
      console.log("Payload Encryption & PKI Digital Signature:".yellow, "Enabled".green,"(Test Env)");
    }

    if (config.VEHICLES_APP_CONFIG.CLIENT_ID == undefined || config.VEHICLES_APP_CONFIG.CLIENT_ID == null) {
      res.status(500).send({
        "error": "Missing Client ID"
      });
    } else {
      res.status(200).send({
        "clientId": config.VEHICLES_APP_CONFIG.CLIENT_ID,
        "attributes": config.VEHICLES_APP_CONFIG.SCOPES,
        "purpose": config.VEHICLES_APP_CONFIG.PURPOSE,
        "environment": environment,
        "redirectUrl": config.CONFIG.CALLBACK_URL,
        "authApiUrl": config.CONFIG.MYINFO_API_AUTHORISE[environment],
      });
    }
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      "error": error
    });
  }
});

// get the environment variables (app info) from the config
app.get('/getPersonEnv', function (req, res) {

  try {
    var environment = process.argv[2].toUpperCase(); // get from package.json process argument
    // console.log("Environment:".yellow, environment);
    if (environment == "SANDBOX") {
      // overwrite the Environment, Token URL and Person URL if Environemnt is 'Sandbox'. 
      // 'Sandbox' environment doesn't have Payload Encryption & PKI Digital Signature
      config.PERSON_MYINFO_CONNECTOR_CONFIG.ENVIRONMENT = environment;
      config.PERSON_MYINFO_CONNECTOR_CONFIG.TOKEN_URL = config.PERSON_APP_CONFIG.MYINFO_API_TOKEN[environment];
      config.PERSON_MYINFO_CONNECTOR_CONFIG.PERSON_URL = config.PERSON_APP_CONFIG.MYINFO_API_PERSON[environment];
      console.log("Payload Encryption & PKI Digital Signature:".yellow, "Disabled".grey,"(Sandbox Env)");
    } else {
      console.log("Payload Encryption & PKI Digital Signature:".yellow, "Enabled".green,"(Test Env)");
    }

    if (config.PERSON_APP_CONFIG.CLIENT_ID == undefined || config.PERSON_APP_CONFIG.CLIENT_ID == null) {
      res.status(500).send({
        "error": "Missing Client ID"
      });
    } else {
      res.status(200).send({
        "clientId": config.PERSON_APP_CONFIG.CLIENT_ID,
        "attributes": config.PERSON_APP_CONFIG.SCOPES,
        "purpose": config.PERSON_APP_CONFIG.PURPOSE,
        "environment": environment,
        "redirectUrl": config.CONFIG.CALLBACK_URL,
        "authApiUrl": config.CONFIG.MYINFO_API_AUTHORISE[environment],
      });
    }
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      "error": error
    });
  }
});


// callback function - directs back to home page
app.get('/callback', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// getVehicles function - call MyInfo Token + Person API
app.post('/getVehicles', function (req, res, next) {

  try {
    // get variables from frontend
    var authCode = req.body.authCode;
    var state = req.body.state;
    var txnNo = crypto.randomBytes(10).toString("hex");

    // console.log("> AuthCode   : ", authCode);
    // console.log("> State      : ", state);
    // console.log("> txnNo      : ", txnNo);

    let connector = new MyInfoConnector(config.VEHICLES_MYINFO_CONNECTOR_CONFIG);
    console.log("Calling MyInfo NodeJs Library...".green);

    connector.getMyInfoPersonData(authCode, state, txnNo)
      .then(vehicles => {
        
        /* 
        P/s: Your logic to handle the person data ...
        */

        console.log('--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:'.green);
        console.log(JSON.stringify(vehicles)); // log the data for demonstration purpose only
        res.status(200).send(vehicles); //return vehicles
      })
      .catch(error => {
        console.log("---MyInfo NodeJs Library Error---".red);
        console.log(error);
        res.status(500).send({
          "error": error
        });
      });
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      "error": error
    });
  }
});

// getVehicles function - call MyInfo Token + Person API
app.post('/getPerson', function (req, res, next) {

  try {
    // get variables from frontend
    var authCode = req.body.authCode;
    var state = req.body.state;
    var txnNo = crypto.randomBytes(10).toString("hex");

    // console.log("> AuthCode   : ", authCode);
    // console.log("> State      : ", state);
    // console.log("> txnNo      : ", txnNo);

    let connector = new MyInfoConnector(config.PERSON_MYINFO_CONNECTOR_CONFIG);
    console.log("Calling MyInfo NodeJs Library...".green);

    connector.getMyInfoPersonData(authCode, state, txnNo)
      .then(vehicles => {
        
        /* 
        P/s: Your logic to handle the person data ...
        */

        console.log('--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:'.green);
        console.log(JSON.stringify(vehicles)); // log the data for demonstration purpose only
        res.status(200).send(vehicles); //return vehicles
      })
      .catch(error => {
        console.log("---MyInfo NodeJs Library Error---".red);
        console.log(error);
        res.status(500).send({
          "error": error
        });
      });
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      "error": error
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// print stacktrace on error
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});



app.listen(port, () => console.log(`Demo App Client listening on port ${port}!`));