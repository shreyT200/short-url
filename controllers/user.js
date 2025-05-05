const User = require('../models/user')
const{ v4:uuidv4} = require('uuid')
const { setUser } = require('../services/auth');
async function handleUserSignup(req, res) {
  
  
    const {name, email, password}= req.body;
    await User.create({
        name,
        email,
        password,
        signUpIP: ip,

    });
    return res.redirect('/');

}
async function handleUserLogin(req, res) {
    const { email, password }= req.body;
    const user = await User.findOne({
        
        email,
        password,

    });
    if(!user) return res.status(401).render('login',{
        error: 'invalid username or password',
    })
    const token = setUser(user);
    setUser ( user);
    res.cookie('uid', token);

    return res.redirect('/');
}

module.exports= {
    handleUserSignup,
    handleUserLogin,
}