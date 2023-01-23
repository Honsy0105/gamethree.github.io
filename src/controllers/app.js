const User = require('../models/User')

const register = async(req, res)=>{
    const user = await User.create(...req.body)
    const token = user.createJwt
    res.status(201).json({user:{name: user.name}}, token)
}

const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(404).json('Please provided email and password') 
    }
    const user = await User.findOne(email)
    if(!user){
        res.status(401).json('invalid Credentials', 401)
    }
    const isPasswordCorrect = await user.createPassword(password)
    if(!isPasswordCorrect){
        res.status(401).json('Invalid Credentials')
    }
    // compare password 
    const token = user.createJwt()
    res.status(200).json({user:{name:user.name}}, token)
}

module.exports = {
    register,
    login
}