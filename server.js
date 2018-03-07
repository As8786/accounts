const express = require('express');
const bodyParser = require('body-parser');

// call express to return a server (object)
// app represent a server
const app = express();

// parse application/json
app.use(bodyParser.json());

// accounts represent our data base
const accountsDB = [{name:'mr x', balance:100}];

// Define a route to repond to:
// GET /accounts
app.get('/accounts', (req, res) => {
  res.send(accountsDB);
});

// // POST /accounts
// app.post('/accounts', (req, res) => {
// 	let new_account = req.body;
// 	accountsDB.push(new_account);
// 	res.send({
// 		message:'Account created',
// 		account: new_account
// 	});
// })

app.listen(3000, (err) => {
  if (err) {
  	console.log('Can not start the server at port 3000')
  } else {
  	console.log('Server started at port 3000')
  }
});

