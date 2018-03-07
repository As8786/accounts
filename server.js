const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./utils/utils.js');

// call express to return a server (object)
// app represent a server
const app = express();

// parse application/json
app.use(bodyParser.json());

// accounts represent our data base
const accountsDB = [{name:'test-user', balance:100}];

// Define a route to repond to:
// GET /accounts
app.get('/accounts', (req, res) => {
  res.send(accountsDB);
});

app.get('/accounts/:name', (req, res) => {
	console.log('params', req.params)
	let account = accountsDB.find((account) => account.name === req.params.name);

	if (!account) {
		res.send(account);
	} else {
		res.status(404).send('Not Found');
	}
})

// POST /accounts
app.post('/accounts', (req, res) => {
	let new_account = req.body;
	// Check that request body is not empty
	if (utils.isEmpty(new_account)) {
      res.status(400).send('Bad Request');
	} else {
	  let account = accountsDB.find((account) => account.name === new_account.name);
	  // Check if the account already in the data base
	  if (account) {
	  	res.status(400).send('Bad Request');
	  } else {
	  	accountsDB.push(new_account);
	  	res.send('accout created')
	  }
	}
})

// DELETE /accounts/:name
app.delete('/accounts/:name', (req, res) => {
	let name = req.params.name;
	let accounts = accountsDB.filter((account) => account.name !== name);
	if (accounts.length != accountsDB.length) {
		res.send('Account deleted');
	} else {
		res.status(400).status({
			error:'Bad Request',
			message: 'Account not found'
		});
	}
})

app.listen(3000, (err) => {
  if (err) {
  	console.log('Can not start the server at port 3000')
  } else {
  	console.log('Server started at port 3000')
  }
});

