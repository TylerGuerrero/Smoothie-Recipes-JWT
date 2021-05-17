const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { requireAuth, checkUser } = require('./middleware/AuthMiddleWare')
const config = require('./config/Config');
const authRoutes = require('./routes/authRouter')

const app = express();

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.database, options).catch((err) => {
    console.log(err);
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser())

app.get('*', checkUser)

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies');
})

app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

// cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true')
//     res.cookie('newUser', false)
//     res.cookie('isEmployee', true, {
//         maxAge: 1000 * 60 * 60 * 24,
//         // https connection
//         secure: true,
//         // wont be able now to access the cookies on the front 
//         // end only through http protocol
//         httpOnly: true
//     })
//     res.send('you got the cookie')
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;    
//     console.log(cookies.newUser);
//     res.status(201).json(cookies)
// })