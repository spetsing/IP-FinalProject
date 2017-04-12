var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    teacher: Boolean,
    class: {
        id: String,
        name: String
    }
})
var user = mongoose.model("User", userSchema);








model.exports = {
    user: user
}
