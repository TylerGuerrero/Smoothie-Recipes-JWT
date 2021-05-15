const { Schema, model } = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {    
        type: String,
        required: [true, 'Please enter a email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
}, {timestamps: {createdAt: true}})

// fires a function after doc is saved to the db
userSchema.post('save', function (doc, next) {
    console.log('New user was created & saved', doc);
    next();
})

// fire a function before doc is saved to the db
// we use function becasue we want access to the User instance
// with this keyword
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log(err);
    }
})

const User = model('User', userSchema)

module.exports = User;