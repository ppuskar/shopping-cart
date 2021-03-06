var mangoose = require('mongoose');
var Schema = mangoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
});


userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password)
};
module.exports = mangoose.model('User', userSchema);