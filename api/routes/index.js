const app = require('../app')


app.get('/api', (req, res, next) => {

  const {method, path} = req;
  if (method.toLowerCase() === 'get' && path.startsWith('/public'))
      console.log('static serving', path);

  next();

  // res.status(200).send({
  //   message: 'Hello world!'
  // })
})

module.exports = app
