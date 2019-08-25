const app = require('../../app')

var cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/hello', (req, res) => {
    res.status(200).send({
        message: `What's your name?`
    })
})

app.get('/api/hello/:name', (req, res) => {
		console.log('whoa!')
    res.status(200).send({
        message: `Hello, ${req.params.name}`
    })
})

module.exports = app
