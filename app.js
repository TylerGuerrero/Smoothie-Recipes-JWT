const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/smoothies', (req, res) => {
    res.render('smoothies');
})

app.use('/', authRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})