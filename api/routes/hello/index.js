
const express = require('express');
const app = require('../../app')
const fs = require('fs');
const cors = require('cors')

// app.use(express.static('tmp'));


// basic / simple handler
module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies
  })
}

// app.use(cors({
//   origin: 'http://localhost:4123'
// }))

// app.get('/api/hello', (req, res) => {
// 	console.log('hello???')
//   res.status(200).send({
//       message: `What's your name?`
//   })
// })

// app.get('/api/orange', (req, res) => {
// 	console.log('orange???')
//   res.status(200).send({
//       message: `ORANGE?!?!?`
//   })
// })

// app.get('/api/banana', (req, res) => {
// 	console.log('bananarama???')
//   res.status(200).send({
//       message: `i am a banana?`
//   })
// })

// app.get('/api/hello/:name', (req, res) => {
// 	console.log('whoa!!!')
//   res.status(200).send({
//       message: `Hello, ${req.params.name}`
//   })
// })

// app.get('/api/users', (req, res) => {
// 	console.log('users?!!')
//   var name = req.query.name;
//   var age = req.query.age;

//   var person = {
//     name: name,
//     age: age
//   };

//   savePersonToPublicFolder(person, function(err) {
//     if (err) {
//     	console.log('error:', err)
//       res.status(404).send('User not saved');
//       return;
//     }

//     res.send('User saved');
//   });
// });


// app.get('/api/allusers', (req, res) => {

// 	fs.readFile('/tmp/person.json', 'utf8', function(err, contents) {
// 	  console.log('contents:', contents);
// 	  if(contents) {
// 		  res.status(200).send({
// 		      message: `${contents}`
// 		  })
// 	  } else {
// 		  res.status(200).send({
// 		      message: `contents empty.`
// 		  })
// 	  }
// 	});
// })


// function savePersonToPublicFolder(person, callback) {
//   // fs.writeFile('../../tmp/person.json', JSON.stringify(person), callback);
//   fs.writeFile('/tmp/person.json', JSON.stringify(person), callback);
//   // fs.appendFile('person.json', JSON.stringify(person), callback);
// }




// module.exports = app

// module.exports = (request, response) => {
// 	console.log(request.query);
// };