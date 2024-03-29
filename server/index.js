const path       = require('path'),
      express    = require('express'),
      app        = express(),
      isDevEnv   = process.env.NODE_ENV === 'development',
      bundlePath = isDevEnv ? 'http://localhost:3001' : 'dist';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.render('index', { bundlePath });
});

app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }

  console.log('server running on port 3000')
});
