const signup_get = (req, res) => {
    res.render('signup')
}

const signup_post = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('signup post')
}

const login_get = (req, res) => {
    res.render('login');
}

const login_post = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    res.send('user login')
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}   