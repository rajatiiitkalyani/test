const express =require('express')
const app =express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');



const db = require('./config/keys').mongourl
const users = require('./routes/api/users')
var port = process.env.PORT || 5000



mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport middleware
app.use(passport.initialize());


// passport config
require('./config/passport')(passport)




//routes
app.use('/api',users);


app.get('/', (req, res) => res.send('Hello World!'))

 
// parse application/json




app.listen(port, () => console.log(` ${port}!`))