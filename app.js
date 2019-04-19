const PORT = 3000
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))

