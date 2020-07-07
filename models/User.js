const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        required : true
    },
    todos : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

UserSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, 10, (err, hashedPass) => {
        if(err) return next(err);
        this.password = hashedPass;
        next();
    })
});

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return callback(err);
        else{
            if(!isMatch)
                return callback(null, isMatch);

            // callback (no error, user object)
            return callback(null, this);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);