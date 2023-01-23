const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'please provid name'],
            maxlength:50,
            minlength:3,
        },
        email:{
            type:String,
            required:[true, 'please provid email'],
            unique:true,
            match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please provide a valid email'
            ]

        },
        passwodr:{
            type:String,
            required:[true, 'please provid password'],
            minlength:6,

        },
    }
)
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.passwodr = await bcrypt.hash(this.passwodr, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId: this._id, name:this.name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

UserSchema.methods.comparePassword = async function(){
    const isMatch = await bcrypt.compare(conditatePassowrd, this.passwodr)
    return isMatch
}


module.exports = mongoose.model('User', UserSchema)