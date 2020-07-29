const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

const app = express();

let conn;
oracledb.getConnection({
    user : 'gobella',
    password : '1234',
    connectString : "gobella.kr/XE"
}, (err, con) => {
    if(err) {
        console.log('접속에 실패했습니다.', err);
    }
    console.log('오라클 db에 접속성공 하였습니다.');
    conn = con;
})

// init middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', ( req,res ) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// homepage route
app.get('/', (req,res) => {
    res.render('index', {
        title : 'Member App',
        members : members
    });
})

// set static folder
app.use(express.static(path.join(__dirname, "public")));


// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 7040;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));