const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

const app = express();

app.use(methodOverride('_method'));

db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'))

app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            isChecked(isCompleted){
                if(isCompleted) return 'checked'
            },
            sum(a, b){
                return a+b
            }
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});